var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "gallery_board";
	var file_table = "gallery_files";	
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("number");

	fs.readFile("./views/admin/web/gallery/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				data : []
			}));
		}else if(mode ='modify'){
			
			var sql = "select a.*, ifnull(b.orgmem_name, '') as orgmem_name ";
				sql += " from "+table+" a ";
				sql += " left outer join orgmember b ";
				sql += " on a.orgmem_no = b.orgmem_no ";
				sql += " where a.board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from "+file_table+" ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " and   file_type = 'content'";
				sql_files += " order by file_no";
				
			var sql_main_files = "select * ";
				sql_main_files += " from "+file_table+" ";
				sql_main_files += " where board_no = " + brd_no;
				sql_main_files += " and   file_type = 'main'";
				sql_main_files += " order by file_no";			
			
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
				 },
				 third : function(callback){
					 db.query(sql_main_files, function(error, results_main_files){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results_main_files);	
						 }
					 });				 
				 } 
			 }, function(error, result){
	     		 response.send(ejs.render(layout.include("web_admin_popup", data), {
					data : result.first,
					data_file : result.second,
					data_main_file : result.third,
					mode :mode,
					admin : admin,
	        		menuNum:4
	    		 }));
			 });			
		}
	});
};
