var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");


exports.listener=function(request, response){
	var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var row_count = 10; //페이지목록 갯수
	var col_count = 10; //하단 페이지수
	var sql = "";
	var p_where = "";

	if(search_type!=''){
		
		if(search_type == "orgmem_name"){
			p_where += " orgmem_name like '%" + search_text +  "%' \n" ;
		}else if(search_type == "orgmem_phone"){
			p_where += " concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
		}else if(search_type == "orgmem_company_name"){
			p_where += " orgmem_company_name like '%" + search_text +  "%' \n" ;
		}
	}
	 
	if(request.session.admin_yn=='Y'){
	 
	 fs.readFile("./views/admin/web/orgmember_mngt/orgm_listForm_popup.html", "utf-8", function(error, data){
		 page_navi.action('orgmember', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end){
			
			sql += "select	\n"+
			" @RNUM := @RNUM +1 as num, \n" +
			" (select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os, \n" +
			" orgmem_no,	\n" +
			" orgmem_reg_no,	\n" +
			" orgmem_company_name,	\n" +
			" orgmem_name,	\n" +
			" orgmem_phone1,	\n" +
			" orgmem_phone2,	\n" +
			" orgmem_phone3,	\n" +
			" orgmem_tel1,	\n" +
			" orgmem_tel2,	\n" +
			" orgmem_tel3,	\n" +
			" orgmem_fax1,	\n" +
			" orgmem_fax2,	\n" +
			" orgmem_fax3,	\n" +
			" zip_code,	\n" +
			" orgmem_address,	\n" +
			" cap_eval_amount,	\n" +
			" local_rank,	\n" +
			" national_rank,	\n" +
			" remrk,	\n" +
			" orgmem_img,	\n" +
			" create_id,	\n" +
			" create_date,	\n" +
			" create_host,	\n" +
			" priority \n" + 
			" from orgmember a, (SELECT @RNUM := 0 ) r \r";
			sql += " where \n";
			sql += " 1=1 \n";
			
			 
			 if(search_type!=''){
			 	
				if(search_type == "orgmem_name"){
					sql += " and orgmem_name like '%" + search_text +  "%' \n" ;
				}else if(search_type == "orgmem_phone"){
					sql += " and concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
				}else if(search_type == "orgmem_company_name"){
					sql += " and orgmem_company_name like '%" + search_text +  "%' \n" ;
				}
			 }
			 sql += "order by orgmem_no desc "; 
			 sql += "limit " + page_start + "," +page_end;

			 db.query(sql, function(error, results){
				 
				 if(error){
					 response.send(error);
				 }else{
					 sql ="select 1 from dual"; 
					 db.query(sql, function(error, results2){
						 response.send(ejs.render(layout.include("web_admin_popup", data),{
							 db_data : results,  
							 page_navi :page_txt,
							 nowPage : nowPage,
							 search_text :search_text,
							 search_type :search_type,
							 menuNum: 0
						 }));
					 });
				 	}
		 	});
	 	});
	  });
	}
	else{
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
				loc_txt : '관리자 로그인이 필요합니다.',
				loc_url : '/admin/web'
			}));
		});
	}
};
