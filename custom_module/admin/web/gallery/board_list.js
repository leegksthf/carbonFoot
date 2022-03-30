var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/board_page_navi.js");
var layout = require("../../../../function/layout.js");

exports.listener=function(request, response){
	
	var table = "gallery_board";
	var file_table = "gallery_files";		
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type");
	var row_count = 8;
	var col_count = 10;
	var p_where = "";
	var admin = request.session.ad_id;

	if(search_text != ''){ 
		p_where = search_type + " like '%" + search_text + "%'";
	}
	
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/gallery/board_list.html", "utf-8", function(error, data){
			 
			page_navi.action('gallery', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end, total_cnt){
			var sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
			sql +=" cast(if(a.sort = '', '9999999999', a.sort) as UNSIGNED) as brd_sort,";
			sql +=" (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, ";
			sql +=" ifnull((select c.file_dtname from "+file_table+" c where c.board_no = a.board_no and c.file_type='main'), '') as img_file_name, ";
			sql +=" ifnull(b.orgmem_name, '') as orgmem_name, ";
			sql +="  (select count(*) from gallery_board_comment c where c.board_no = a.board_no) as comment_cnt ";
			sql +=" from "+table+" a left outer join orgmember b on a.orgmem_no = b.orgmem_no ";
			sql += " where a.board_id = 'gallery'";
			if(search_text!=''){ 
				sql += " and " + search_type + " like '%" + search_text + "%'";
			}
			sql += " order by brd_sort, a.board_no desc";
			sql += " limit " + page_start +", " + page_end;
			
			console.log("sql:"+sql);
			
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("admin/web/gallery_board_list/error======", sql);
				}else{
					response.send(ejs.render(layout.include("web_admin", data), {
										data : results,
										search_text :search_text,
										search_type : search_type,
										nowPage : nowPage,
										page_navi :page_txt,
										admin : admin,
										total_cnt : total_cnt,
										menuNum:4
								}));
							}
						});
					});
			}); 
	}else{
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
				loc_txt : '관리자 로그인이 필요합니다.',
				loc_url : '/admin/web'
			}));
		});
	}
};
