var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("number");

	fs.readFile("./views/admin/web/event_board/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				mode :mode,
				data : []
			}));
		}else if(mode ='modify'){
			
			var sql = "select * ";
				sql += " from event_board ";
				sql += " where board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from event_files ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " order by file_no";			
			
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
	     		 response.send(ejs.render(layout.include("web_admin_popup", data), {
					data : result.first,
					data_file : result.second,
					mode :mode,
					admin : admin,
	        		menuNum:2
	    		 }));
			 });			
		}
	});
};
