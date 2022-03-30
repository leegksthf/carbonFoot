var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	
	var ad_id = request.session.ad_id;
	var connectorNo = session.connectorNo(request);
	
	var brd_no = request.param("brd_no");
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	 
	//카운트증가
	var sql_cnt = "update free_board set board_cnt = board_cnt+1 where board_no = " + brd_no;
	db.query(sql_cnt, function(error, result_cnt){});	 
	 
	 
	var sql = "select " +
			  " board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
			  " a.create_id as create_name, a.sort, \n" +
			  " (select orgmem_no from orgmember where orgmem_name=a.create_id) as member_num \n"+
		 	  " from free_board a where board_no = " + brd_no;
	 
	var sql_files = "select " +
				    " * \n" +
					" from free_files where board_no = " + brd_no;
		 
	 
	fs.readFile("./views/user/free_board/board_view.html", "utf-8", function(error, data){
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
			}
		}, function(error, result){
			if(result.first.length == 0){
				response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
				response.end('<script type="text/javascript">alert("게시된 글이 삭제되었습니다.");location.href="/free_board_list";</script>');
			}else{
				response.send(ejs.render(layout.include("app_user", data), {
					connectorNo : connectorNo,
					ad_id : ad_id,
					db_data : result.first,
					db_data_file : result.second,
					nowPage : nowPage,
					menuNum: 3
				}));
			}
			
		});			 
		 
	});	
};
