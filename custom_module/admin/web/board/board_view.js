var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	 var brd_no = request.param("number");
	 var category = request.param('category') == null ? 'notice' : request.param('category');
	 
	 console.log(category);
	 //카운트증가
	 //var sql_cnt = "update board set board_cnt = board_cnt+1 where board_no = " + brd_no;
	 //db.query(sql_cnt, function(error, result_cnt){});	 
	 

	var sql ="";
	switch (category) {
		case 'notice':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort \n" +
				" from board a where board_no = " + brd_no;
			break;
		case 'congrats':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort \n" +
				" from board a where board_no = " + brd_no;
			break;
		case 'event':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort \n" +
				" from event_board a where board_no = " + brd_no;
			break;
	}
	if(category == 'congrats'){
		category = 'free';
	}

	 var sql_files = "select " +
				     " * \n" +
					 " from files where board_no = " + brd_no + 
					 " AND board_id = '" + category+"'";	 
	 
	 fs.readFile("./views/admin/web/board/board_view.html", "utf-8", function(error, data){
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
    			 db_data : result.first,
				 db_data_file : result.second,
				 category : category,
    			 menuNum: 1
    		 }));
		 });			 
	 });
};
