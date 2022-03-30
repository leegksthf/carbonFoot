var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	
	var table = "gallery_board";
	var file_table = "gallery_files";	
	var brd_no = request.param("brd_no");
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var connectorDivision = session.connectorDivision(request);
	console.log("connectorNo ::: " + connectorNo);
	var sql2 = 'select orgmem_no from gallery_board where board_no = '+ brd_no;
	//카운트증가
	var sql_cnt = "update "+table+" set board_cnt = board_cnt+1 where board_no = " + brd_no;
	var century = request.param("century")==undefined ? "" : request.param("century");
	var org_sql = 'select * from orgmember where orgmem_no = ?'  
	db.query(sql_cnt, function(error, result_cnt){});	 
	 
	 
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
	 
	fs.readFile("./views/user/gallery/board_view.html", "utf-8", function(error, data){
				async.series({
					first : function(callback){
						db.query(sql, function(error, results){
							if(error){
								response.send(error);
							}else{
								callback(null, results);	
							}
						});				 
					},
					second : function(callback){
						db.query(sql_files, function(error, results_files){
							if(error){
								response.send(error);
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
					},
					four : function(callback){
						db.query(sql2, function(error, org_result){
							if(error){
								response.send(error);
							}else{
								db.query(org_sql,[org_result[0].orgmem_no], function(error, org_mem){
									if(error){
										response.send(error);
									}else{
										console.log("!!!!!!!!!!!!");
										console.log(org_sql);
										callback(null, org_mem);	
									}
								});
									
							}
						});				 
					}
				}, function(error, result){
					if(result.first.length == 0){
						response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
						response.end('<script type="text/javascript">alert("게시된 글이 삭제되었습니다.");location.href="/gallery_board_list";</script>');
					}else{
						response.send(ejs.render(layout.include("app_user", data), {
							connectorNo : connectorNo,
							db_data : result.first,
							db_data_file : result.second,
							db_data_main_file : result.third,
							db_data_mem : result.four,
							nowPage : nowPage,
							menuNum: 3,
							connectorDivision:connectorDivision,
							century:century
						}));
					}
				});	
	});	
};
