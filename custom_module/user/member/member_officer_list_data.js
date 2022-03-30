var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var limit_num = "";
	var member_type = request.param("member_type")==undefined ? "" : request.param("member_type");
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var branch_type = request.param("branch_type")==undefined ? "" : request.param("branch_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var connectorNo = session.connectorNo(request); //5555555 >>f194
	var num_type = request.param("num_type")==undefined ? "" : request.param("num_type");
	var num_type2 = request.param("num_type2")==undefined ? "" : request.param("num_type2");
	var search_text2 = request.param("search_text2")==undefined ? "" : request.param("search_text2");
	var sql="";
	var app_install_sql = "";
	var where_sql = "";
	var century = request.param("century")==undefined ? "" : request.param("century");
	var strlimit = request.param("strlimit") == undefined ? 0 : request.param("strlimit");
	var endlimit = request.param("endlimit") == undefined ? 20 : request.param("endlimit");
	var temp_division = "";
	/* 카운트 S */
	var table = "";
	if(century == 2020){
		table  = "orgmember_2020";
	}else{
		table = "orgmember";
	}


	var count_sql = " select count(*) as cnt \n" +
	" from  "+table+" \n" +
	" where 1=1 \n";

	
	var count_sql2 = " select count(*) as cnt \n" +
	" from  "+table+" \n" +
	" where 1=1  AND orgmem_disp_yn = 'N'\n";


	var count_where_sql = "";
	
	// if(search_text != ''){
	// 	if(search_type == "orgmem_name"){
	// 		count_where_sql += " and orgmem_name like '%" + search_text +  "%' \n" ;
	// 	}else if(search_type == "orgmem_phone"){
	// 		count_where_sql += " and concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
	// 	}else if(search_type == "orgmem_company_name"){
	// 		count_where_sql += " and orgmem_company_name like '%" + search_text +  "%' \n" ;
	// 	}else if(search_type == "orgmem_company_name_cho"){
	// 		count_where_sql += " and orgmem_company_name_cho like '" + search_text +  "%' \n" ;
	// 	}
	// }
	console.log("num_type"+ num_type);
	console.log("num_type2"+ num_type2);
	if(num_type == ''){
		num_type += num_type2;
	}	
	if(search_text == '' && num_type == ''){
		search_text += search_text2;
	}

	switch(num_type){
		
		case "num1":
			count_where_sql += "and (orgmem_committee2 = '500' OR orgmem_committee3 = '500') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num2":
			count_where_sql += "AND (orgmem_committee2 = '510' OR orgmem_committee_position2 = '265' OR orgmem_committee3 = '510' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
		
			}		
		break;
		case "num3":
			count_where_sql += "AND (orgmem_committee2 = '520' OR orgmem_committee3 = '520' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num4":
			count_where_sql += "AND (orgmem_committee2 = '530' OR orgmem_committee3 = '530') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				ccount_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num5":
			count_where_sql += "AND (orgmem_committee2 = '540' OR orgmem_committee3 = '540' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num6":
			count_where_sql += "AND (orgmem_committee2 = '550' OR orgmem_committee3 = '550' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num7":
			count_where_sql += "AND (orgmem_committee2 = '560' OR orgmem_committee3 = '560' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num8":
			count_where_sql += "AND (orgmem_committee2 = '570' OR orgmem_committee3 = '570' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num9":
			count_where_sql += "AND (orgmem_committee2 = '580' OR orgmem_committee3 = '580' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num10":
			count_where_sql += "AND (orgmem_committee2 = '590' OR orgmem_committee3 = '590') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num11":
			count_where_sql += "AND (orgmem_committee2 = '600' OR orgmem_committee3 = '600' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num12":
			count_where_sql += "AND tmem_position != '총재'\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;

		default:
			count_where_sql += "AND orgmem_committee2 != '' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
        break;


	}
	
	count_sql = count_sql + count_where_sql;
	count_sql2 = count_sql2 + count_where_sql;
	/* 카운트 E */

	/* 데이터 S */
	if(num_type != 'num12'){

	sql =  "select * from ( \n";
	sql += "select @RNUM := @RNUM + 1 as num, \n";
	sql += "priority, \n";
	sql += "certificate1, \n";
	sql += "certificate2, \n";
	sql += "link1, \n";
	sql += "link2, \n";
	sql +=  "orgmem_disp_yn, \n";
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
	sql += "post_num, \n";	
	sql += "orgmem_committee_text, \n";
	// sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_position AND t.code_group='position') as orgmem_position_name, ";
	sql +=	"(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position AND t.code_group='composition' and t.code_mode='child') as orgmem_composition_name1, ",
    sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name1, ",
    sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_member AND t.code_group='member' and t.code_mode='child') as orgmem_member_name1, ",
	sql +=  "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_position AND t.code_group='position' and t.code_mode='child') as orgmem_position_name1, ",
	sql += "phone_YN, \n";
	sql += "company_YN, \n";
	sql += "tel_YN, \n";
	sql += "fax_YN, \n";
	sql += "e_mail_YN, \n";
	sql += "adr_YN, \n";
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
	sql += "orgmem_name_en, \n";
	sql += "orgmem_name_han, \n";
	sql += "orgmem_area, \n";
	sql += "area_club, \n";
	sql += "area_zone, \n";
	sql += "orgmem_committee_second, \n";
	sql += "if(orgmem_committee_position2 != '',orgmem_committee_position2,orgmem_committee_position3) AS numbe, \n";
	sql += "orgmem_sub_position2,\n";
	sql += "orgmem_sub_position, \n";
	sql += "orgmem_committee3, \n";
	sql += "orgmem_committee_position3, \n";
	sql += "orgmem_committee_text3, \n";
	sql += "orgmem_sub_position3, \n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_branch  AND t.code_group='branch' and t.code_mode='child') as orgmem_branch_name, ";
	sql += "orgmem_committee, orgmem_committee_position,";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee  AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name, ";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position  AND t.code_group='composition' and t.code_mode='child') as orgmem_committee_position_name, ";
	sql += "orgmem_committee2, orgmem_committee_position2,";
	sql += "IFNULL((SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee3  AND t.code_group='orgmem_committee2' and t.code_mode='child'),'') AS orgmem_committee_name3,";
	sql += "IFNULL((SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position3  AND t.code_group='committee_position2' and t.code_mode='child'),'') as orgmem_committee_position_name3,";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee2  AND t.code_group='orgmem_committee2' and t.code_mode='child') as orgmem_committee_name2, ";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position2  AND t.code_group='committee_position2' and t.code_mode='child') as orgmem_committee_position_name2, ";
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_committee AND t.code_group='committee' and t.code_mode='child') as committee_order, ";
	sql += "(SELECT t.code_order FROM code t WHERE t.code=a.orgmem_committee_position AND t.code_group='composition' and t.code_mode='child') as composition_order, ";
	sql += "(select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os \n";
	if(century == '2020'){
		sql += "from orgmember_2020 a, (SELECT @RNUM := 0 ) r \n";
	}else{
		sql += "from orgmember a, (SELECT @RNUM := 0 ) r \n";
	}
	sql += ") k ";
	sql += "where 1=1  AND orgmem_no != '6000'\n";

	}else if(num_type == 'num12'){

	sql =  "select * from ( \n";
	sql += "select @RNUM := @RNUM + 1 as num, \n";
	sql += "tmem_no AS orgmem_no, \n";
	sql += "tmem_name AS orgmem_name, \n";
	sql += "tmem_img AS orgmem_img, \n";
	sql += "tmem_club, \n";
	sql += "tmem_position AS orgmem_committee2, \n";
	sql += "tmem_position AS orgmem_committee_name2, \n";
	sql += "tmem_name_eg AS orgmem_name_en, \n";
	sql += "tmem_name_han AS orgmem_name_han, \n";
	sql += "ifnull(tmem_phone1, '') AS orgmem_phone1, \n";
	sql += "ifnull(tmem_phone2, '') AS orgmem_phone2, \n";
	sql += "ifnull(tmem_phone3, '') AS orgmem_phone3, \n";
	sql += "ifnull(tmem_tel1, '') AS orgmem_tel1, \n";
	sql += "ifnull(tmem_tel2, '') AS orgmem_tel2, \n";
	sql += "ifnull(tmem_tel3, '') AS orgmem_tel3, \n";
	sql += "ifnull(tmem_fax1, '') AS orgmem_fax1, \n";
	sql += "ifnull(tmem_fax2, '') AS orgmem_fax2, \n";
	sql += "ifnull(tmem_fax3, '') AS orgmem_fax3, \n";	
	sql += "zip_code, \n";	
	sql += "tmem_address AS orgmem_address,\n";	
	sql += "tmem_company_name, \n";

	sql += "company_position, \n";
	sql += "CONCAT(tmem_company_name,company_position) AS orgmem_company_name, \n";

	sql += "right(tmem_num,11) AS tmem_num, \n";
	sql += "NUMBER \n";

	sql += "from alltime_orgmember , (SELECT @RNUM := 0 ) r \n";
	sql += ") k ";
	sql += "where 1=1  AND orgmem_disp_yn = 'Y'\n";
	
	}
	switch(num_type){
		
		case "num1":
			temp_division = '500';
			where_sql += "AND (orgmem_committee2 = '500' OR orgmem_committee3 = '500') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num2":
			temp_division = '510';	
			where_sql += "AND (orgmem_committee2 = '510' OR orgmem_committee_position2 = '265' OR orgmem_committee3 = '510') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num3":
			temp_division = '520';
			where_sql += "AND (orgmem_committee2 = '520' OR orgmem_committee3 = '520' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num4":
			temp_division = '530';
			where_sql += "AND (orgmem_committee2 = '530' OR orgmem_committee3 = '530') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num5":
			temp_division = '540';
			where_sql += "AND (orgmem_committee2 = '540' OR orgmem_committee3 = '540' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num6":
			temp_division = '550';
			where_sql += "AND (orgmem_committee2 = '550' OR orgmem_committee3 = '550') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num7":
			temp_division = '560';
			where_sql += "AND (orgmem_committee2 = '560' OR orgmem_committee3 = '560' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num8":
			temp_division = '570';
			where_sql += "AND (orgmem_committee2 = '570' OR orgmem_committee3 = '570') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			// where_sql += "AND (orgmem_committee2 = '570' or orgmem_committee_second is not null) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num9":
			temp_division = '580';
			where_sql += "AND (orgmem_committee2 = '580' OR orgmem_committee3 = '580' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num10":
			temp_division = '590';
			where_sql += "AND (orgmem_committee2 = '590' OR orgmem_committee3 = '590') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;
		case "num11":
			temp_division = '600';
			where_sql += "AND (orgmem_committee2 = '600' OR orgmem_committee3 = '600' ) AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;

		case "num12":
			where_sql += "AND orgmem_committee_name2 != '총재'\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
		break;

		default:
			where_sql += "AND orgmem_committee2 != '' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%' )";
			}
        break;
		

	}


	sql += where_sql;
	//정렬
	if(num_type == 'num1'){
		sql +="order by numbe ASC,orgmem_sub_position2*10 ASC \n";
	}else if(num_type == 'num10'){
		sql += "order by orgmem_committee2 asc,orgmem_sub_position2 IS NULL  asc, orgmem_sub_position2*10 asc, orgmem_committee_position*10 ASC \n";
	}else{
		sql += "order by orgmem_sub_position2 IS NULL  asc, orgmem_sub_position2*10 asc, orgmem_committee_position*10 ASC \n";
	}

	sql += " limit " + strlimit + ", " + endlimit;
	
	console.log("sql :::::: " + sql);
	if(num_type == "num10"){
	var where_sql2 = "";
		where_sql2 += "AND (orgmem_committee2 = '590' or a.orgmem_no ='869') AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
		if(search_text != ''){
				where_sql2 += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%'or orgmem_area like '%" + search_text + "%')";
		}
	}
	/* 데이터 E */

	//앱설치된사람 카운트
	if(num_type == "num10"){
	app_install_sql = "select count(*) as cnt from orgmember a, push b where a.orgmem_no = b.orgmem_no " + where_sql2;
	}else{
		app_install_sql = "select count(*) as cnt from orgmember a, push b where a.orgmem_no = b.orgmem_no " + where_sql;
	}
	console.log("conunt_sql ======================================================= \n");
	console.log(count_sql);
	console.log("======================================================= \n");
	console.log(sql);
	console.log("======================================================= \n");
	console.log("\n \n " + app_install_sql);
	console.log("======================================================= \n");
	db.query(app_install_sql, function(error, app_result){
	db.query(count_sql2, function(error, count_result2){
		db.query(count_sql, function(error, count_result){
			db.query(sql, function(error, results){
				response.send({
					connectorNo : connectorNo,
					db_data : results,
					db_data_length : count_result[0].cnt,
					db_data_length2 : count_result2[0].cnt,
					db_app_length2 : app_result[0].cnt,
					search_type : search_type,
					search_text : search_text,
					num_type : num_type,
					century:century,
					temp_division:temp_division
				}); 
		});
	});
});
});
};
