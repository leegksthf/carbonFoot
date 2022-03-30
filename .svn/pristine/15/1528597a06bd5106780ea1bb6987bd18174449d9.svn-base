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
	var event = request.param("event")==null ? 'N' : request.param("event");
	var brd_no = request.param("brd_no");
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var category = request.param("category");
	var connectorDivision = session.connectorDivision(request);
	//카운트증가
	var sql_cnt = "update board set board_cnt = board_cnt+1 where board_no = " + brd_no;
	db.query(sql_cnt, function(error, result_cnt){});	 
	 

	var sql = "";
	switch (category) {
		case 'notice':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort, link1, link2, link3 \n" +
				" from board a where board_no = " + brd_no;
			break;

			
		case 'free':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort, link1, link2, link3 \n" +
				" from board a where board_no = " + brd_no;
			break;

		case 'congrats':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort, link1, link2, link3 \n" +
				" from board a where board_no = " + brd_no;
			break;

		case 'event':
			sql = "select " +
				" board_no, board_id, board_cnt, board_title, board_content, create_id, date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
				" (select b.ad_nm from admin_mngt b where b.ad_id = a.create_id) as create_name, a.sort \n" +
				" from event_board a where board_no = " + brd_no;
			break;
	}




	var sql_files = "select " +
				    " * \n" +
					" from files where board_no = " + brd_no+
					" AND board_id ='" + category+"'";
	
	 console.log(sql_files);

	fs.readFile("./views/user/board/board_view.html", "utf-8", function(error, data){
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
			var event_num = 3;
			// if(event=='Y'){
			// 	event = 5;
			// }

			if(result.first.length == 0){
				response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
				response.end('<script type="text/javascript">alert("게시된 글이 삭제되었습니다.");location.href="/board_list";</script>');
			}else{
				response.send(ejs.render(layout.include("app_user", data), {
					connectorNo : connectorNo,
					db_data : result.first,
					db_data_file : result.second,
					nowPage : nowPage,
					category : category,
					menuNum: 3,
					connectorDivision : connectorDivision
				}));
			}
			
		});			 
		 
	});	
};
