var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var page_navi = require("../../../../function/person_page_navi.js");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");


exports.listener=function(request, response){
	var nowPage = request.param("nowPage")==null ? 1 : request.param("nowPage");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");
	var row_count = 15; //페이지목록 갯수
	var col_count = 10; //하단 페이지수
	var sql = "";
	var p_where = "";
	var ad_grant = request.session.ad_grant;

	if(search_text != ''){
		if(search_type == "orgmem_name"){
			p_where += " orgmem_name like '%" + search_text +  "%' \n" ;
		}else if(search_type == "orgmem_phone"){
			p_where += " concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
		}else if(search_type == "orgmem_company_name"){
			p_where += "area_club like '%" + search_text +  "%' \n" ;
		}
	}
	
	if(request.session.admin_yn=='Y'){

		fs.readFile("./views/admin/web/orgmember_mngt/orgm_listForm.html", "utf-8", function(error, data){
			page_navi.action('orgmember', p_where, nowPage, col_count, row_count, function(error, page_txt, page_start, page_end, total_cnt){
				sql =  "select * from ( \n";
	sql += "select @RNUM := @RNUM + 1 as num, \n";
	sql += "priority, \n";
	sql += "certificate1, \n";
	sql += "certificate2, \n";
	sql += "link1, \n";
	sql += "link2, \n";

	sql += "orgmem_no, \n";
	sql += "orgmem_reg_no, \n";
	sql += "orgmem_company_name, \n";
	sql += "orgmem_company_name_cho, \n";
	sql += "orgmem_company_name_minor, \n";
	sql += "orgmem_position, \n";
	sql += "orgmem_lunar, \n";
	sql += "orgmem_birth_year, \n";
	sql += "orgmem_birth_month, \n";
	sql += "orgmem_birth_day, \n";
	sql += "orgmem_homepage, \n";	
	sql += "business_card, \n";	
	sql += "orgmem_email, \n";	
	// sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_position AND t.code_group='position') as orgmem_position_name, ";
	sql +=	"(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position AND t.code_group='composition' and t.code_mode='child') as orgmem_composition_name1, ",
    sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name1, ",
    sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_member AND t.code_group='member' and t.code_mode='child') as orgmem_member_name1, ",
	sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_position AND t.code_group='position' and t.code_mode='child') as orgmem_position_name1, ",
	
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_position AND t.code_group='position') as position_order, ";
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_branch AND t.code_group='branch') as branch_order, ";
	sql += "trim(replace(replace(replace(replace(orgmem_company_name, '(주)', ''), '주식회사', ''), '(합)', ''), '㈜', '')) as orgmem_company_name_sort, \n";
	sql += "orgmem_name, \n";
	sql += "orgmem_name_cho, \n";
	sql += "ifnull(orgmem_phone1, '') as orgmem_phone1, \n";
	sql += "ifnull(orgmem_phone2, '') as orgmem_phone2, \n";
	sql += "ifnull(orgmem_phone3, '') as orgmem_phone3, \n";
	sql += "ifnull(orgmem_tel1, '') as orgmem_tel1, \n";
	sql += "ifnull(orgmem_tel2, '') as orgmem_tel2, \n";
	sql += "ifnull(orgmem_tel3, '') as orgmem_tel3, \n";
	sql += "ifnull(orgmem_fax1, '') as orgmem_fax1, \n";
	sql += "ifnull(orgmem_fax2, '') as orgmem_fax2, \n";
	sql += "ifnull(orgmem_fax3, '') as orgmem_fax3, \n";
	sql += "zip_code, \n";
	sql += "orgmem_address, \n";
	sql += "orgmem_product, \n";
	sql += "organ_position, \n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.organ_position  AND t.code_group='company_position') as organ_position_name, \n";
	sql += "orgmem_work_duty, \n";
	sql += "format(cap_eval_amount, 0) as cap_eval_amount, \n";
	sql += "format(local_rank, 0) as local_rank, \n";
	sql += "format(national_rank, 0) as national_rank, \n";
	sql += "remrk, \n";
	sql += "orgmem_img, \n";
	sql += "company_img1, \n";
	sql += "company_img2, \n";
	sql += "company_img3, \n";
	sql += "company_img4, \n";
	sql += "orgmem_branch, \n";
	sql += "orgmem_member, \n";
	sql += "orgmem_area, \n";
	sql += "phone_YN, \n";
	sql += "area_club, \n";
	sql += "area_zone, \n";
	sql += "orgmem_committee3, \n";
	sql += "orgmem_committee_position3, \n";
	sql += "orgmem_committee_text3, \n";
	sql += "orgmem_sub_position3, \n";
	sql += "create_date, \n";
	sql += "org_grant, \n";
	sql += "orgmem_sub_position, \n";
	sql += "orgmem_sub_position2, \n";
	sql += "orgmem_disp_yn, \n";
	sql += "orgmem_committee_text, \n";
	sql += "SUBSTRING_INDEX(area_club,' ',1) AS club_name, \n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_branch  AND t.code_group='branch' and t.code_mode='child') as orgmem_branch_name, ";
	sql += "orgmem_committee, orgmem_committee_position,";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee  AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name, ";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position  AND t.code_group='composition' and t.code_mode='child') as orgmem_committee_position_name, ";
	sql += "orgmem_committee2, orgmem_committee_position2,";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee2  AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name2, ";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position2  AND t.code_group='composition' and t.code_mode='child') as orgmem_committee_position_name2, ";
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_committee AND t.code_group='committee' and t.code_mode='child') as committee_order, ";
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_committee_position AND t.code_group='composition' and t.code_mode='child') as composition_order, ";
	sql += "(select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os \n";
	sql += "from orgmember a, (SELECT @RNUM := 0 ) r \n";
	sql += ") k ";
	sql += "where 1=1 \n";
				// sql += "select	\n"+
				// " @RNUM := @RNUM +1 as num, \n" +
				// " (select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os, \n" +
				// " orgmem_no,	\n" +
				// " orgmem_reg_no,	\n" +
				// " orgmem_company_name,	\n" +
				// " trim(replace(replace(replace(replace(orgmem_company_name, '(주)', ''), '주식회사', ''), '(합)', ''), '㈜', '')) as orgmem_company_name_sort,	\n" +
				// " orgmem_name,	\n" +
				// " orgmem_phone1,	\n" +
				// " orgmem_phone2,	\n" +
				// " orgmem_phone3,	\n" +
				// " orgmem_tel1,	\n" +
				// " orgmem_tel2,	\n" +
				// " orgmem_tel3,	\n" +
				// " orgmem_fax1,	\n" +
				// " orgmem_fax2,	\n" +
				// " orgmem_fax3,	\n" +
				// " zip_code,	\n" +
				// " orgmem_address,	\n" +
				// " cap_eval_amount,	\n" +
				// " local_rank,	\n" +
				// " national_rank,	\n" +
				// " remrk,	\n" +
				// " orgmem_img,	\n" +
				// " create_id,	\n" +
				// " create_date,	\n" +
				// " create_host	\n" +
				// " from orgmember a, (SELECT @RNUM := 0 ) r \r";
				// sql += " where \n";
				// sql += " 1=1 \n";

				if(search_text != ''){
					
					if(search_type == "orgmem_name"){
						// sql += " and orgmem_position in ("+search_text+") \n";
						sql += " and orgmem_name like '%" + search_text +  "%' \n" ;
					}else if(search_type == "orgmem_phone"){
						sql += " and concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
					}else if(search_type == "orgmem_company_name"){
						sql += " and club_name like '%" + search_text +"'\n" ;
					}
				}

				if(order_type=='no'){
					sql += "order by  create_date IS NULL ASC, create_date IS NULL DESC\n";
					// sql += "order by orgmem_no desc ";
				}else if(order_type=='name'){
					sql += "order by orgmem_name asc\n";
				}

				sql += "limit " + page_start + "," +page_end;

				console.log(sql);

				db.query(sql, function(error, results){

					if(error){
						response.send(error);
					}else{
						sql ="select 1 from dual";
						db.query(sql, function(error, results2){
							response.send(ejs.render(layout.include("web_admin", data),{
								db_data : results,  
								page_navi :page_txt,
								nowPage : nowPage,
								search_text :search_text,
								search_type : search_type,
								menuNum: 0,
								order_type :  order_type,
								total_cnt : total_cnt,
								page_start : page_start+1,
								modivision : ad_grant
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
