var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");
exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request)
	
	var category = request.param('category') == null ? 'notice' : request.param('category');
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("board_no");
	console.log("category :::::::::::: ");
	console.log(category);
	fs.readFile("./views/user/board/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("app_user", data), {
				data : [],
				connectorNo : connectorNo,
				category : category, 
				menuNum : 2,
				mode : 'insert'
			}));
		}else if(mode ='modify'){
			if(category == "notice"){
				table = "board";
			}else if(category == "sub_notice"){
				table = "sub_notice_board"; 
			}else if(category == "sub_media"){
				table = "sub_media_board";
			}
			
			var sql = "select * ";
				sql += " from " + table;
				sql += " where board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from files ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " order by file_dtname";			
			
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
					category : category,
					mode : mode,
					admin : admin,
	        		menuNum : 3
	    		 }));
			 });			
		}
	});
};
