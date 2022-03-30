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
	var category = request.param('category') == null ? 'notice' : request.param('category');



	fs.readFile("./views/admin/web/board/board_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				data : [],
				category:category
			}));
		}else if(mode ='modify'){

			if(category == 'congrats'){
				 category = "free";
			}
				
				
			var sql_files = "select * ";
				sql_files += " from files ";
				sql_files += " where board_no = " + brd_no +" AND board_id='"+category+"'";
				sql_files += " order by file_no";	
				
				if(category == 'free'){
					category = "congrats";
			   }	
			var sql = "";
			switch (category) {
				case 'notice':
					sql = "select * ";
					sql += " from board ";
					sql += " where board_no = " + brd_no;
					break;
				case 'congrats':
					sql = "select * ";
					sql += " from board ";
					sql += " where board_no = " + brd_no;
					break;
				case 'event':
					sql = "select * ";
					sql += " from event_board ";
					sql += " where board_no = " + brd_no;
					break;
			}
			
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
					category : category,
	        		menuNum:1
	    		 }));
			 });			
		}
	});
};
