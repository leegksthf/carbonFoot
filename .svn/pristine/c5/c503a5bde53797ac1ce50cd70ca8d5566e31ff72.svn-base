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
	
	var table = "hongbo_board";
	var file_table = "hongbo_files";		
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var row_count = 5;
	var col_count = 5;
	var p_where = "";
	var century = request.param("century")==undefined ? "" : request.param("century");
	var connectorDivision = session.connectorDivision(request);
	fs.readFile("./views/user/hongbo_board/board_list.html", "utf-8", function(error, data){
		page_navi.action('hongbo', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			var sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
			sql +=" cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
			sql +=" (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, ";
			sql +=" ifnull((select c.file_dtname from "+file_table+" c where c.board_no = a.board_no and c.file_type='main'), '') as img_file_name, ";
			sql +=" ifnull(b.orgmem_name, '') as orgmem_name, ";
			sql +=" (select count(*) from hongbo_board_comment c where c.board_no = a.board_no) as comment_cnt";
			sql +=" from "+table+" a left outer join orgmember b on a.orgmem_no = b.orgmem_no ";
			sql += " where a.board_id = 'hongbo'";
			sql += " order by brd_sort, a.board_no desc";
			sql += " limit " + page_start +", " + page_end;
			
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					console.log(sql);
					response.send(ejs.render(layout.include("app_user", data), {
						connectorNo : connectorNo,
						data : results,
						page_navi :page_txt,
						nowPage : nowPage,
						menuNum:3,
						connectorDivision:connectorDivision,
						century:century
					}));
				}
			});
		});
	}); 
};
