var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");


exports.listener =  function(request, response){
	var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type");
	var row_count = 10; //목록 갯수
	var col_count = 10; //하단 페지지갯수
	var qry = "";
	var p_where = "";
	if(search_text!=null || search_text!=''){
		p_where = "ad_id like '%" + search_text + "%'";
	}
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	if(request.session.admin_yn=='Y'){
		fs.readFile("./views/admin/web/admin/admin_list.html","utf-8", function(error, data){
			//param :table,where구문, 현제페이지, 하단페이지갯수 뿌려질갯수
			page_navi.action('admin_mngt', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
				qry += 	"select * from \n";
				qry += 	"(select \n"+
						"  ad_id, \n"+
						"  ad_pw, \n"+
						"  ifnull((select b.orgmem_name from orgmember b where b.orgmem_no = a.orgmem_no), '관리자') as ad_nm , \n"+
						"  ad_grant, \n"+
						"  create_id, \n"+
						"  DATE_FORMAT(create_date, '%Y-%m-%d') as create_date \n"+
						"from admin_mngt a) x \n" + 
						"where \n" + 
						" 1=1  \n";
				if(search_text!=''){ 
					qry += " and " + search_type + " like '%" + search_text + "%' ";
				}				
				qry += "limit " + page_start + "," +page_end;
				
				console.log(qry);
				
				db.query(qry,function(error, results){
					response.send(ejs.render(layout.include("web_admin", data), {
						search_text :search_text,
						search_type : search_type,
						nowPage : nowPage,
						data : results,
						page_navi :page_txt,
						menuNum:5
					}));
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
}

	
