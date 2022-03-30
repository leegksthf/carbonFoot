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
	
	var connectorNo = session.connectorNo(request);
	var connectorName = session.connectorName(request);
	var connectorPhone = session.connectorPhone(request);
	
	var brd_id =  "biz";
	var brd_title =  request.param("brdTitle")  == undefined ? "" : request.param("brdTitle");
	var brd_content =  request.param("brdContent") == undefined ? "" : request.param("brdContent");
	var brdPushYn_result =  request.param("brdPushYn_result") == undefined ? "" : request.param("brdPushYn_result");
	var smsYn_result =  request.param("smsYn_result") == undefined ? "" : request.param("smsYn_result");
	var sort = request.param("sort");
	var board_no = "";
	var brd_create_host = request.connection.remoteAddress;
	var sql= "";
	var file_sql="";
	var select_sql = "";


	if(request.files.brdFileImg != undefined){
		if(request.files.brdFileImg.name != ""){
            var tempObj = {};
            tempObj.originalFilename = request.files.brdFileImg.name;
            tempObj.path = request.files.brdFileImg.path;
            filesArray.push(tempObj);
		}
	}


	if(mode=="write"){
		sql = "insert into bizroom_board(" +
				"board_id, board_title, board_content," +
				"create_id, create_date, create_host) " +
				"values('" + brd_id + 
				"', '" + brd_title + 
				"', '" + brd_content + 
				"', '" + connectorNo + 
				"', now(), '" + brd_create_host + "')";
		query();
		
	}else {
		board_no = request.param("number");
		sql = "update bizroom_board set board_id ='" + brd_id +
			"', board_title ='" + brd_title + 
			"', board_content = '" + brd_content + 
			"', update_id ='" + connectorNo + 
			"', update_date = now(), update_host = '" + brd_create_host + "' where board_no = " + board_no;
		
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
						console.log("user/board_save/error=====", sql);
					}else{
						if(mode == "write"){
							select_sql = "select max(board_no) as brd_no from bizroom_board";
							
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
														androidPush.push("notice", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
													} else if(results2[i].type == "ios"){
														console.log("results2[i].type == " + results2[i].type + " >> IOS");
														ios_push_url = "/board_view?brd_no=" + brd_no[0].brd_no;
														iosPush.push("notice", results2[i].key_num, connectorName, brd_title, connectorNo, brd_no[0].brd_no, "", results2[i].popup_yn);
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
			
			response.end('<script>location.href = "bizroom?"</script>');
		 });			
	}	
	
	function file() {
        console.log("여기 들어오나~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(filesArray.length);
		if(filesArray.length > 0) {
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
				file_path.push(path + "\/file\/bizroom\/" + file_dtname[i]);	//실서버용
			
				var orgpath = ""; 

				orgpath = file_path[i];		//파일업로드 경로
				
				if(orgpath) {
					//파일을 동기적으로 사용(기본으로 비동기적)
					var data = fs.readFileSync(filesArray[i].path);
					fs.writeFileSync(file_path[i], data); 
				} else {
					response.send("fail");
				}

				file_sql = "insert into bizroom_files(" +
				"board_no, board_id, file_name, file_dtname, file_path)" +
				"values('" + board_no +  
				"', '" + brd_id + 
				"', '" + file_name[i] + 
				"', '" + file_dtname[i] + 
				"', '" + file_path[i] + "')";
				

                console.log(file_sql);
				db.query(file_sql, function(error, results){
					if(error){
						console.log("board_save/file/error===", file_sql);
						response.send("fail");
					} 
				});
			} 
		}  
	}
	
};

