var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../DB_config.js").connect;
var express = require('express');
var osModule = require('os');
var session = require("../../../function/session.js");
var androidPush = require("../../../function/android_push.js");
var iosPush = require("../../../function/ios_push.js");
var smsSend = require("../../../function/sms_send.js");

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
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
	var filesArray = [];
	var mainFilesArray = [];
	
	var connectorNo = session.connectorNo(request);
	var connectorName = session.connectorName(request);
	var connectorPhone = session.connectorPhone(request);
	var connectorImage = session.connectorImage(request);
	
	var brd_id =  "hongbo";
	var brd_title =  request.param("brdTitle")  == undefined ? "" : request.param("brdTitle");
	var brd_content =  request.param("brdContent") == undefined ? "" : request.param("brdContent");
	var brdPushYn =  request.param("brdPushYn") == undefined ? "" : request.param("brdPushYn");
	var brdPushYn_result =  request.param("brdPushYn_result") == undefined ? "" : request.param("brdPushYn_result");
	var smsYn =  request.param("smsYn") == undefined ? "" : request.param("smsYn");
	var smsYn_result =  request.param("smsYn_result") == undefined ? "" : request.param("smsYn_result");
	var orgmem_seqNo =  request.param("orgmem_seqNo") == undefined ? "" : request.param("orgmem_seqNo");
	var sms_sender =  request.param("sms_sender") == undefined ? "" : request.param("sms_sender");
	var sort = request.param("sort");
	var brd_create_id = request.session.ad_id;
	var board_no = "";
	var brd_create_date = "";
	var brd_create_host = request.connection.remoteAddress;
	var sql= "";
	var file_sql="";
	var select_sql = "";
	var ios_push_url = "";
	var brdlink1 =  request.param("brdlink1") == undefined ? "" : request.param("brdlink1");
	var brdlink2 =  request.param("brdlink2") == undefined ? "" : request.param("brdlink2");
	var brdlink3 =  request.param("brdlink3") == undefined ? "" : request.param("brdlink3");

	var category = request.param('category') == null ? 'sub_directors' : request.param('category');
	console.log("category"+category);
	var board_table = "hongbo_board";
	var file_table = "hongbo_files";

	
	if(request.files.brdFileImg != undefined){
		for(var i = 0; i < request.files.brdFileImg.length; i++){ 
			if(request.files.brdFileImg[i].name != ""){
				var tempObj = {};
				tempObj.originalFilename = request.files.brdFileImg[i].name;
				tempObj.path = request.files.brdFileImg[i].path;
				filesArray.push(tempObj);
			}
		}
	}
	
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
		sql = "insert into "+board_table+"(" +
				"board_id, board_title, board_content, sort, orgmem_no," +
				"create_id, create_date, create_host, link1, link2, link3) " +
				"values('" + brd_id + 
				"', '" + brd_title + 
				"', '" + brd_content + 
				"', '" + sort +
				"', '" + connectorNo + 
				"', '" + connectorNo + 
				"', now(), '" + brd_create_host + "', '" + brdlink1 + "', '" + brdlink2 + "', '" + brdlink3 + "')";
		query();
		
	}else {
		board_no = request.param("number");
		sql = "update "+board_table+" set board_id ='" + brd_id +
			"', board_title ='" + brd_title + 
			"', board_content = '" + brd_content + 
			"', sort = '" + sort + 
			"', update_id ='" + connectorNo + 
			"', update_date = now(), update_host = '" + brd_create_host + "', link1 = '"+brdlink1+"', link2 = '"+brdlink2+"', link3 = '"+ brdlink3 +"' where board_no = " + board_no;
		
		query();
	}
	
	function query() {
		
		async.series({
			 first : function(callback){
				db.query(sql, function(error, results){
					console.log("SQL :::::");
					console.log(sql);
					if(error){
						response.send("fail");
						console.log("admin/web/board_save/error=====", sql);
					}else{
						if(mode == "write"){
							select_sql = "select max(board_no) as brd_no from "+board_table;
							
							db.query(select_sql, function(error, brd_no){
								if(error){
									response.send("fail");
								}else{
									//push알림 체크일 경우
									if(brdPushYn_result == "Y"){
										var push_sql = "select key_num, type, popup_yn, phone_num from push where phone_num != ? and popup_yn = 'y' ";
										
										db.query(push_sql, connectorPhone, function(error, results2){
											
											if(error){
												console.log(push_sql);
											}
											
											if(results2.length > 0){
												
												for(var i = 0; i < results2.length; i++){
													
													if(results2[i].type == "android"){
														console.log("results2[i].type == " + results2[i].type + " >> 안드로이드 >> " + results2[i].phone_num);
														androidPush.push("hongbo", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
													} else if(results2[i].type == "ios"){
														console.log("results2[i].type == " + results2[i].type + " >> IOS");
														ios_push_url = "/board_view?brd_no=" + brd_no[0].brd_no;
														iosPush.push("hongbo", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
													} else {
														if(smsYn_result == "Y") { // 문자알림이 설정되어 있으면
															//console.log("results2[i].type == " + results2[i].type + " >> SMS >> " + results2[i].orgmem_phone);
															//smsSend.send(results2[i].orgmem_phone, sms_sender, brd_title);
														}
													}
												}
											}
										});
									}
									
									board_no = brd_no[0].brd_no;
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
			/*response.writeHead({
				'Content-type': 'text/html; charset=utf-8'
			});*/
			
			response.writeHead(200, {									// 실서버용
				'Content-type': 'text/html; charset=utf-8'
			});
			
			response.end('<script>location.href = "hongbo_board_list?category='+category+'"</script>');
		 });			
	}	
	
	function file() {
		console.log(filesArray);
		
		if(filesArray.length > 0) {
			console.log("일반파일들");
			var filename = [];
			var extensionIndex = [];
			var extension = [];
			var file_name = [];
			var file_dtname = [];
			var file_path = [];
			
			var count = 0;
			for(var i = 0; i < filesArray.length; i++) {
				file_name.push(filesArray[i].originalFilename);									//기존 파일이름
				extensionIndex[i] = file_name[i].lastIndexOf('.');
				extension[i] = file_name[i].substring(extensionIndex[i], file_name[i].length);	//파일확장자
				file_dtname[i] = day+ "(" + i + ")" + extension[i];
				//file_path.push(path + "\\file\\board\\" + file_dtname[i]);
				file_path.push(path + "\/file\/"+ board_table +"\/" + file_dtname[i]);	//실서버용
			
				var orgpath = ""; 

				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(filesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}

				file_sql = "insert into " + file_table + "(" +
				"board_no, board_id, file_name, file_dtname, file_type, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', 'content" + 
				"', '" + file_path[i] + "')";
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("/hongbo_board_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}  
		
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
				file_dtname[i] = day+ "(" + i + ")m" + extension[i];
				//file_path.push(path + "\\file\\"+table+"\\" + file_dtname[i]);
				file_path.push(path + "\/file\/"+board_table+"\/" + file_dtname[i]);		//실서버용
				
				var orgpath = ""; 
				
				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(mainFilesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}
				
				file_sql = "insert into "+ file_table + "(" +
				"board_no, board_id, file_name, file_dtname, file_type, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', 'main" + 
				"', '" + file_path[i] + "')";
				
				db.query(file_sql, function(error, results){
					if(error){
						console.log("/hongbo_board_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}  
	}
	
};

