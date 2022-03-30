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
	var connectorDivision = session.connectorDivision(request);
	var brd_no = request.param("brd_no");
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");

	//카운트증가
	var sql_cnt = "update event_board set board_cnt = board_cnt+1 where board_no = " + brd_no;
	db.query(sql_cnt, function(error, result_cnt){});	 
	 
	 
	var sql = "select " +
			  	" board_no, board_id, board_cnt, board_title, board_content, create_id, \n" +
			  	" board_startdate, board_enddate, board_address, board_address_detail, board_eventsdate, board_eventedate, board_xgps, board_ygps, \n" + 
			  	" date_format(create_date, '%Y-%m-%d') as c_date, create_host, \n" +
			  	" a.create_id as create_name, a.sort, \n" +
			  	" date_format(now(), '%Y-%m-%d') as nowdate, \n" + 
			  	" (select count(*) from event_request where board_no =" + brd_no + " and orgmem_no = "+ connectorNo +") as ev_req, \n" +
				" (select orgmem_no from orgmember where orgmem_name=a.create_id) as member_num, \n"+
				" board_eventstime, \n"+
				" board_eventetime, \n"+
			  	" date_format(board_startdate, '%Y.%m.%d') as board_startdate_nm,\n" + 
				" date_format(board_enddate, '%Y.%m.%d') as board_enddate_nm,\n" + 
				" date_format(board_eventsdate, '%Y.%m.%d') as board_eventsdate_nm,\n" + 
				" date_format(board_eventedate, '%Y.%m.%d') as board_eventedate_nm,\n" + 
				" orgmem_no, \n"+
				"(select request_state from event_request where board_no = " + brd_no + " and orgmem_no = "+ connectorNo + ") as request_state,\n" +
				"(select request_no from event_request where board_no = " + brd_no + " and orgmem_no = "+ connectorNo + ") as request_no,\n" +
				
				" case WEEKDAY(board_startdate)\n" + 
				" when '0' then '월'\n" + 
				" when '1' then '화'\n" + 
				" when '2' then '수'\n" + 
				" when '3' then '목'\n" + 
				" when '4' then '금'\n" + 
				" when '5' then '토'\n" + 
				" when '6' then '일'\n" + 
				" end as bs_week_name,\n" + 
				" case WEEKDAY(board_enddate)\n" + 
				" when '0' then '월'\n" + 
				" when '1' then '화'\n" + 
				" when '2' then '수'\n" + 
				" when '3' then '목'\n" + 
				" when '4' then '금'\n" + 
				" when '5' then '토'\n" + 
				" when '6' then '일'\n" + 
				" end as be_week_name,\n" + 
				" case WEEKDAY(board_eventsdate)\n" + 
				" when '0' then '월'\n" + 
				" when '1' then '화'\n" + 
				" when '2' then '수'\n" + 
				" when '3' then '목'\n" + 
				" when '4' then '금'\n" + 
				" when '5' then '토'\n" + 
				" when '6' then '일'\n" + 
				" end as es_week_name,\n" + 
				" case WEEKDAY(board_eventedate)\n" + 
				" when '0' then '월'\n" + 
				" when '1' then '화'\n" + 
				" when '2' then '수'\n" + 
				" when '3' then '목'\n" + 
				" when '4' then '금'\n" + 
				" when '5' then '토'\n" + 
				" when '6' then '일'\n" + 
				" end as ee_week_name\n" + 
			   " from event_board a where board_no = " + brd_no;
			   
	console.log("sql : " + sql);
	 
	var sql_files = "select " +
				    " * \n" +
					" from event_files where board_no = " + brd_no;
		 
	 
	fs.readFile("./views/user/event_board/board_view.html", "utf-8", function(error, data){
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
				response.end('<script type="text/javascript">alert("게시된 글이 삭제되었습니다.");location.href="/event_board_list";</script>');
			}else{
				response.send(ejs.render(layout.include("app_user", data), {
					connectorNo : connectorNo,
					ad_id : ad_id,
					db_data : result.first,
					db_data_file : result.second,
					connectorDivision : connectorDivision,
					nowPage : nowPage,
					menuNum: 3
				}));
			}
			
		});			 
		 
	});	
};
