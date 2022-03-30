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
	var active = (request.param("category")==null) ? 'notice' : request.param("category");
	var event = request.param("event")==null ? 'N' : request.param("event");
	var row_count = 5;	
	var col_count = 5;
	var p_where = "";
	
	if(event=='Y'){
		event = 3;
		active = 'event';
	}else{
		event = 3;
	}
	fs.readFile("./views/user/board/board_list.html", "utf-8", function(error, data){
		page_navi.action('notice', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){

			var sql = "";
				sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
				sql += " cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
				sql += " (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name,";
				sql += " (select count(*) from board_comment c where c.board_no = a.board_no) as comment_cnt";
				sql += " from board a";
				sql += " where a.board_id = 'notice'";
				sql += " order by brd_sort, a.board_no desc";
				sql += " limit " + page_start + ", " + page_end;
		var sql4 = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
				sql4 +=" cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
				sql4 +=" (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, ";
				sql4 +=" ifnull((select c.file_dtname from hongbo_files c where c.board_no = a.board_no and c.file_type='main'), '') as img_file_name, ";
				sql4 +=" ifnull(b.orgmem_name, '') as orgmem_name, ";
				sql4 +=" (select count(*) from hongbo_board_comment c where c.board_no = a.board_no) as comment_cnt";
				sql4 +=" from hongbo_board a left outer join orgmember b on a.orgmem_no = b.orgmem_no ";
				sql4 += " where a.board_id = 'hongbo'";
				sql4 += " order by rand()";

			db.query(sql4, function(error, hongbo_results){
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					console.log(sql);
					response.send(ejs.render(layout.include("app_user", data), {
						connectorNo : connectorNo,
						active : active,
						data : results,
						page_navi :page_txt,
						nowPage : nowPage,
						menuNum:event,
						connectorDivision:connectorDivision,
						hongbo_results:hongbo_results
					}));
				}
			});
		});
	}); 
}); 
};
