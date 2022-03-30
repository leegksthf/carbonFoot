var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request)
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("board_no");

	fs.readFile("./views/user/event_board/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("app_user", data), {
				mode :mode,
				data : [],
				connectorNo : connectorNo,
				menuNum : 3
			}));
		}else if(mode ='modify'){
			
			var sql = "select * ";
				sql += " from event_board ";
				sql += " where board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from event_files ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " order by file_no";			
			
				console.log(sql);
				console.log(sql_files);
			 async.series({
				 first : function(callback){
					 db.query(sql, function(error, results){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results);	
						 }
					 });				 
				 },
				 second : function(callback){
					 db.query(sql_files, function(error, results_files){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results_files);	
						 }
					 });				 
				 }
			 }, function(error, result){
	     		 response.send(ejs.render(layout.include("app_user", data), {
					data : result.first,
					data_file : result.second,
					connectorNo : connectorNo,
					mode :mode,
					admin : admin,
	        		menuNum:3
	    		 }));
			 });			
		}
	});
};
