var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var express = require('express');
var osModule = require('os');
var session = require("../../../../function/session.js");

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var table = "banner";
	var date = new Date();
	var day = date.toFormat('YYYYMMDDHHMISS');
	var pathlast = __dirname;
	var pathIndex = "";
	if(use_os_falg) {
		pathIndex = pathlast.lastIndexOf('\/custom_module');
	} else {
		pathIndex = pathlast.lastIndexOf('\\custom_module');
	}
	var path = pathlast.substring(pathIndex, 0);						//파일이름
	var mode = request.param("mode");
	var mainFilesArray = [];
	
	var connectorNo = session.connectorNo(request);
	var connectorName = session.connectorName(request);
	var connectorPhone = session.connectorPhone(request);
	var connectorImage = session.connectorImage(request);
	
	var title =  request.param("title")  == undefined ? "" : request.param("title");
	var homepage =  request.param("homepage")  == undefined ? "" : request.param("homepage");
	var strt_dt =  request.param("strt_dt")  == undefined ? "" : request.param("strt_dt");
	var end_dt =  request.param("end_dt")  == undefined ? "" : request.param("end_dt");
	var orgmem_no = request.param("orgmem_no");
	var create_id = request.session.ad_id;
	var idx = "";
	var create_date = "";
	var create_host = request.connection.remoteAddress;
	var sql= "";
	var file_sql="";
	var select_sql = "";
	
	if(request.files.brdFileMainImg != undefined){
		for(var i = 0; i < request.files.brdFileMainImg.length; i++){ 
			if(request.files.brdFileMainImg[i].name != ""){
				var tempObj = {};
				tempObj.originalFilename = request.files.brdFileMainImg[i].name;
				tempObj.path = request.files.brdFileMainImg[i].path;
				mainFilesArray.push(tempObj);
			}
		}
	}
	
	if(mode=="write"){
		sql = "insert into "+table+"(" +
				"title, homepage, strt_dt, end_dt, " +
				"create_id, create_date, create_host) " +
				"values('" + title + 
				"', '" + homepage + 
				"', '" + strt_dt + 
				"', '" + end_dt + 
				"', '" + create_id + 
				"', now(), '" + create_host + "')";
		
		query();
		
	}else {
		idx = request.param("idx");
		sql = "update "+table+" set title='" + title +
			"', homepage = '" + homepage + 
			"', strt_dt = '" + strt_dt + 
			"', end_dt = '" + end_dt + 
			"', update_id ='" + create_id + 
			"', update_date = now(), update_host = '" + create_host + "' where idx =" + idx;
		
		query();
	}
	
	function query() {
		
		async.series({
			 first : function(callback){
				db.query(sql, function(error, results){
					if(error){
						response.send("fail");
						console.log("admin/web/banner_save/error=====", sql);
					}else{
						if(mode == "write"){
							select_sql = "select max(idx) as idx from "+table+"";
							
							db.query(select_sql, function(error, banner){
								if(error){
									response.send("fail");
								}else{
									
									idx = banner[0].idx;
									callback(null, null);
								}
							});
						}else{
							callback(null, null);
						}
					}
				});				 
			 },
			 second : function(callback){
				 file(); 
				 callback(null, null);
			 }
		 }, function(error, result){
			 
			response.writeHead(200, {
				'Content-type': 'text/html; charset=utf-8'
			});
			
			response.end('<script>opener.document.bannerForm.submit(); window.close();</script>');
		 });			
	}
	
	function file() {
		
		if(mainFilesArray.length > 0) {
			var filename = [];
			var extensionIndex = [];
			var extension = [];
			var file_name = [];
			var file_dtname = [];
			var file_path = [];
			
			var count = 0;
			for(var i = 0; i < mainFilesArray.length; i++) {
				file_name.push(mainFilesArray[i].originalFilename);									//기존 파일이름
				extensionIndex[i] = file_name[i].lastIndexOf('.');
				extension[i] = file_name[i].substring(extensionIndex[i], file_name[i].length);	//파일확장자
				file_dtname[i] = day+ "(" + i + ")" + extension[i];
				
				if(use_os_falg) {
					file_path.push(path + "\/file\/"+table+"\/" + file_dtname[i]);
				} else {
					file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				}
				
				var orgpath = ""; 
				
				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(mainFilesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}
				
				file_sql = "update "+table+" set file_name='" + file_name[i] +
				"', file_dtname = '" + file_dtname[i] + 
				"', file_path = '" + file_path[i] + 
				"' where idx =" + idx;				
				
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("admin/web/banner_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}  
	}
	
};

