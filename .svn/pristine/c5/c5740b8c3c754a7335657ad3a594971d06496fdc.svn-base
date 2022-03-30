var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	 var table = "gallery_board";
	 var file_table = "gallery_files";	
	 var brd_no = request.param("number");
	 
	 //카운트증가
	 //var sql_cnt = "update "+table+" set board_cnt = board_cnt+1 where board_no = " + brd_no;
	 //db.query(sql_cnt, function(error, result_cnt){});	 
	 
	 
	 var sql = "select " +
			   " a.board_no, a.board_id, a.board_cnt, a.board_title, a.board_content, a.create_id, date_format(a.create_date, '%Y-%m-%d') as c_date, a.create_host, \n" +
			   " (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, a.sort, ifnull(b.orgmem_name, '') as orgmem_name \n" +
		 	   " from "+table+" a left outer join orgmember b on a.orgmem_no = b.orgmem_no where a.board_no = " + brd_no;
	 
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
	 
	 fs.readFile("./views/admin/web/gallery/board_view.html", "utf-8", function(error, data){
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
    			 db_data : result.first,
    			 db_data_file : result.second,
    			 db_data_main_file : result.third,
    			 menuNum: 4
    		 }));
		 });			 
		 
	 });
};
