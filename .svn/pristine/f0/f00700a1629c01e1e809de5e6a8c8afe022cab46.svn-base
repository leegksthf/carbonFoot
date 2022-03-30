var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");
exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request)
	
	var category = request.param('category') == null ? 'sub_directors' : request.param('category');
	var table = request.param('category') == null ? 'sub_directors_board' : request.param('category')+'_board';
	var file_table = request.param('category') == null ? 'sub_directors_board_files' : request.param('category')+'_board_files';
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var brd_no = request.param("board_no");
	var active = (request.param("category")==null) ? 'sub_directors' : request.param("category");
	var table="";
	var file_table = "";
	var century = request.param("century")==undefined ? "" : request.param("century");
	table = "gallery_board";
	file_table =  "gallery_files";
	if(active == "gallery"){
		table = "gallery_board";
		file_table =  "gallery_files";
	}else if(active == "sub_meeting"){
		table = "sub_meeting_board";
		file_table =  "sub_meeting_files"; 
	}
	
	console.log("category :::::::::::: " + category);
	fs.readFile("./views/user/gallery/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("app_user", data), {
				data : [],
				connectorNo : connectorNo,
				category : category, 
				menuNum : 3
			}));
		}else if(mode ='modify'){
			
			var sql = "select * ";
				sql += " from " + table;
				sql += " where board_no = " + brd_no;
				
			var sql_files = "select " +
			    " * \n" +
				" from "+file_table +
				" where board_no = " + brd_no +
				" and file_type='content'";
 
			var sql_main_files = "select " +
				" * \n" +
				" from "+file_table +
				" where board_no = " + brd_no +
				" and file_type='main'";
			
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
								response.send(error);
							}else{
								callback(null, results_main_files);	
							}
						});				 
					}
			 }, function(error, result){
	     		 response.send(ejs.render(layout.include("app_user", data), {
					data : result.first,
					data_file : result.second,
					data_main_file : result.third,
					connectorNo : connectorNo,
					category : category,
					mode : mode,
					admin : admin,
	        		menuNum : 3,
					century:century
	    		 }));
			 });			
		}
	});
};
