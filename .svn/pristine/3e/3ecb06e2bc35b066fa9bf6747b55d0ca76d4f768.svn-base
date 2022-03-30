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
	
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var row_count = 5;	
	var col_count = 5;
	var p_where = "";
	
	fs.readFile("./views/user/free_board/board_list.html", "utf-8", function(error, data){
		page_navi.action('free', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			var sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
			sql +=" cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
			sql +=" a.create_id as create_name,";
			sql +=" (select count(*) from free_board_comment c where c.board_no = a.board_no) as comment_cnt";
			sql +=" from free_board a";
			sql += " where a.board_id = 'free'";
			sql += " order by brd_sort, a.board_no desc";
			sql += " limit " + page_start +", " + page_end;
			
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					response.send(ejs.render(layout.include("app_user", data), {
						connectorNo : connectorNo,
						data : results,
						page_navi :page_txt,
						nowPage : nowPage,
						menuNum:3
					}));
				}
			});
		});
	}); 
};
