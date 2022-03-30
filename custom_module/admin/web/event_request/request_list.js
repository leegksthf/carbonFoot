var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/board_page_navi.js");
var layout = require("../../../../function/layout.js");

exports.listener=function(request, response){
	
	var nowPage = (request.param("nowPage")==null) ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type");
	var search_event_id = request.param("number")==undefined ? "" : request.param("number");
	//var search_event_id = request.param("search_eventid");
	var row_count = 10;
	var col_count = 10;
	//var numCount = 0;
	var p_where = "";
	var admin = request.session.ad_id;
	var board_title_res = "";	

	if(search_text != ''){ 
		p_where = search_type + " like '%" + search_text + "%'";
	}
	
	
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/event_request/request_list.html", "utf-8", function(error, data){

			var qry = "select board_title from event_board where board_no = "+ search_event_id +"";
			console.log("qry:"+qry);


			page_navi.action('event_request', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end, total_cnt){
				var sql = "select a.*, b.orgmem_name, b.orgmem_phone1, b.orgmem_phone2, b.orgmem_phone3, b.orgmem_email, date_format(a.create_date, '%Y-%m-%d') as c_date";
				sql += ", (select c.board_title from event_board c where c.board_no = '"+ search_event_id +"' ) as board_title";
				sql +=" from event_request a left join orgmember b ON a.orgmem_no=b.orgmem_no";

				sql += " where a.board_id = 'event_request'";
				if(search_text!=''){ 
					sql += " and " + search_type + " like '%" + search_text + "%'";
				}
				if(search_event_id != ''){ 
					sql += " and a.board_no = '" + search_event_id + " '";
				}
				sql += " order by a.request_no desc";
				sql += " limit " + page_start +", " + page_end;
				
				//console.log("sql:"+sql);			
				
				db.query(sql, function(error, results){
					if(error){
						response.send("fail1");
						console.log("admin/web/event_request_list/error======", sql);
					}else{
						response.send(ejs.render(layout.include("web_admin_popup", data), {
											data : results,
											search_text :search_text,
											search_type : search_type,											
											nowPage : nowPage,
											board_no : search_event_id,
											page_navi :page_txt,
											admin : admin,
											menuNum:2,
											total_cnt : total_cnt,
											pageSize : row_count
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
