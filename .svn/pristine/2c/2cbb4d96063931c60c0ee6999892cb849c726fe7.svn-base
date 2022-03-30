var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi_user.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	var connectorDivision = session.connectorDivision(request);
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var row_count = 5;	
	var col_count = 5;
	var p_where = "";
	
	fs.readFile("./views/user/event_board/board_list.html", "utf-8", function(error, data){
		page_navi.action('event', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			var sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
			sql +=" cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
			sql +=" a.create_id as create_name,";
			sql +=" (select count(*) from event_board_comment c where c.board_no = a.board_no) as comment_cnt,";
			sql +=" (select file_dtname from event_files D where D.board_no = a.board_no limit 0, 1) as file_dtname,";			
			sql +=" date_format(board_startdate, '%Y.%m.%d') as board_startdate_nm,";
			sql +=" date_format(board_enddate, '%Y.%m.%d') as board_enddate_nm,";
			sql +=" date_format(board_eventsdate, '%Y.%m.%d') as board_eventsdate_nm,";
			sql +=" date_format(board_eventedate, '%Y.%m.%d') as board_eventedate_nm,";
			sql +=" case WEEKDAY(board_startdate)";
			sql +=" when '0' then '월'";
			sql +=" when '1' then '화'";
			sql +=" when '2' then '수'";
			sql +=" when '3' then '목'";
			sql +=" when '4' then '금'";
			sql +=" when '5' then '토'";
			sql +=" when '6' then '일'";
			sql +=" end as bs_week_name,";
			sql +=" case WEEKDAY(board_enddate)";
			sql +=" when '0' then '월'";
			sql +=" when '1' then '화'";
			sql +=" when '2' then '수'";
			sql +=" when '3' then '목'";
			sql +=" when '4' then '금'";
			sql +=" when '5' then '토'";
			sql +=" when '6' then '일'";
			sql +=" end as be_week_name,";
			sql +=" case WEEKDAY(board_eventsdate)";
			sql +=" when '0' then '월'";
			sql +=" when '1' then '화'";
			sql +=" when '2' then '수'";
			sql +=" when '3' then '목'";
			sql +=" when '4' then '금'";
			sql +=" when '5' then '토'";
			sql +=" when '6' then '일'";
			sql +=" end as es_week_name,";
			sql +=" case WEEKDAY(board_eventedate)";
			sql +=" when '0' then '월'";
			sql +=" when '1' then '화'";
			sql +=" when '2' then '수'";
			sql +=" when '3' then '목'";
			sql +=" when '4' then '금'";
			sql +=" when '5' then '토'";
			sql +=" when '6' then '일'";
			sql +=" end as ee_week_name";
			sql +=" from event_board a";
			sql += " where a.board_id = 'event'";
			//sql += " and board_startdate <= date_format(now(), '%Y-%m-%d') and board_enddate >= date_format(now(), '%Y-%m-%d')"
			sql += " order by brd_sort, a.board_no desc";
			sql += " limit " + page_start +", " + page_end;

			console.log("sql : " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					response.send(ejs.render(layout.include("app_user", data), {
						connectorNo : connectorNo,
						data : results,
						connectorDivision : connectorDivision,
						page_navi :page_txt,
						nowPage : nowPage,
						menuNum:3
					}));
				}
			});
		});
	}); 
};
