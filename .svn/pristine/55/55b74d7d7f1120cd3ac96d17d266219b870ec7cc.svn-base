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
	var search_text2 = request.param("search_text2")==undefined ? "" : request.param("search_text2");
	var connectorNo = session.connectorNo(request); //5555555 >>f194
	var search_txt2 = request.param("search_txt2")==undefined ? "" : request.param("search_txt2");
	var num_type = request.param("num_type")==undefined ? "" : request.param("num_type");
	var num_type2 = request.param("num_type2")==undefined ? "" : request.param("num_type2");
	var area_zone_type = request.param("area_zone_type")==undefined ? "" : request.param("area_zone_type");
	var club_type2 = request.param("club_type2")==undefined ? "" : request.param("club_type2");
	var club_type = request.param("club_type")==undefined ? "" : request.param("club_type");
	var sql="";
	var app_install_sql = "";
	var where_sql = "";
	var strlimit = request.param("strlimit") == undefined ? 0 : request.param("strlimit");
	var endlimit = request.param("endlimit") == undefined ? 20 : request.param("endlimit");
	var century = request.param("century")==undefined ? "" : request.param("century");
	/* 카운트 S */

	var table = "";
	if(century == 2020){
		table  = "orgmember_2020";
	}else{
		table = "orgmember";
	}

	var count_sql = " select count(*) as cnt \n" +
	" from  "+table+" \n" +
	" where 1=1 AND orgmem_disp_yn = 'Y' \n";

	var count_sql2 = " select count(*) as cnt \n" +
	" from  "+table+" \n" +
	" where 1=1 AND orgmem_disp_yn = 'N' \n";

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
	console.log("club_type"+ club_type);
	console.log("club_type2"+ club_type2);
	console.log("num_type"+ num_type);
	console.log("num_type2"+ num_type2);
	console.log("search_txt2"+ search_txt2);
	console.log("search_text2"+ search_text2);
	if(search_txt2 == '' && num_type == ''){
		search_txt2 += search_text2;
	}	
	if(num_type == '' && club_type == ''){
		num_type += num_type2;
		club_type += club_type2;
	}
	switch(num_type){
		case "1지역":
			count_where_sql += "AND orgmem_area = '1지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "2지역":
			count_where_sql += "AND orgmem_area = '2지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "3지역":
			count_where_sql += "AND orgmem_area = '3지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "4지역":
			count_where_sql += "AND orgmem_area = '4지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "5지역":
			count_where_sql += "AND orgmem_area = '5지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "6지역":
			count_where_sql += "AND orgmem_area = '6지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "7지역":
			count_where_sql += "AND orgmem_area = '7지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "8지역":
			count_where_sql += "AND orgmem_area = '8지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				count_where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "all":
			count_where_sql += "AND (orgmem_branch != '099' OR orgmem_branch IS null) and orgmem_area is not null and orgmem_area != ''\n";
			if(search_txt2 != ''){
				count_where_sql += "and (orgmem_name like '%" + search_txt2 + "%' or orgmem_company_name like '%" + search_txt2 + "%' or area_club like '%" + search_txt2 + "%' or orgmem_phone3 like '%" + search_txt2 + "%')";
			}
			// if(area_zone_type != ''){
			// 	count_where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			// }
			// if(club_type != ''){
			// 	count_where_sql += "AND area_club = '" + club_type + "'\n";
			// }
		break;
	}
	
	count_sql = count_sql + count_where_sql;
	count_sql2 = count_sql2 + count_where_sql;
	/* 카운트 E */

	/* 데이터 S */

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
	sql +=  "orgmem_disp_yn, \n";
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
	sql += "phone_YN, \n";
	sql += "company_YN, \n";
	sql += "tel_YN, \n";
	sql += "fax_YN, \n";
	sql += "e_mail_YN, \n";
	sql += "adr_YN, \n";
	sql += "area_zone, \n";
	sql += "club_position, \n";
	sql += "club_position2, \n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.club_position  AND t.code_group='club_position' and t.code_mode='child') as club_position_name, ";
	sql += "orgmem_committee_text,\n";
	sql += "right(orgmem_committee_text,1) AS orgmem_committee_text2,\n";
	sql += "orgmem_sub_position,\n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_branch  AND t.code_group='branch' and t.code_mode='child') as orgmem_branch_name, ";
	sql += "orgmem_committee, orgmem_committee_position,";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee  AND t.code_group='committee' and t.code_mode='child') as orgmem_committee_name, ";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.orgmem_committee_position  AND t.code_group='composition' and t.code_mode='child') as orgmem_committee_position_name, ";
	sql += "orgmem_committee2, orgmem_committee_position2,";
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
	sql += "where 1=1  AND orgmem_disp_yn = 'Y' AND orgmem_no != '6000'\n";

	switch(num_type){
		
		case "1지역":
			where_sql += "AND orgmem_area = '1지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "2지역":
			where_sql += "AND orgmem_area = '2지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "3지역":
			where_sql += "AND orgmem_area = '3지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "4지역":
			where_sql += "AND orgmem_area = '4지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "5지역":
			where_sql += "AND orgmem_area = '5지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "6지역":
			where_sql += "AND orgmem_area = '6지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "7지역":
			where_sql += "AND orgmem_area = '7지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
		break;
		case "8지역":
			where_sql += "AND orgmem_area = '8지역' AND (orgmem_branch != '099' OR orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_zone = '" + area_zone_type + "'\n";
			}
			if(club_type != ''){
				where_sql += "AND area_club = '" + club_type + "'\n";
			}
			break;
			case "all":
				where_sql += "AND (orgmem_branch != '099' OR orgmem_branch IS null) and orgmem_area is not null and orgmem_area != ''\n";
				if(search_txt2 != ''){
					where_sql += "and (orgmem_name like '%" + search_txt2 + "%' or orgmem_company_name like '%" + search_txt2 + "%' or area_club like '%" + search_txt2 + "%' or orgmem_phone3 like '%" + search_txt2 + "%')";
				}
				// if(area_zone_type != ''){
				// 	where_sql += "AND area_zone = '" + area_zone_type + "'\n";
				// }
				// if(club_type != ''){
				// 	where_sql += "AND area_club = '" + club_type + "'\n";
				// }	
		break;
	}
	
	// if(search_text != ''){
	// 	switch(search_type){
	// 		case "name":
	// 			where_sql += " and (orgmem_name like '%" + search_text + "%') \n";
	// 			break;
	// 		case "company":
	// 			//where_sql += " and ((select x.company_name from company x where x.company_no = a.company_no) like '%" + search_text + "%') \n";
	// 			where_sql += " and (orgmem_company_name like '%" + search_text + "%' or orgmem_company_name_minor like '%" + search_text + "%') \n";
	// 			break;
	// 		default :				
	// 			where_sql += " and (orgmem_company_name like '%" + search_text + "%' \n";
	// 			where_sql += " or orgmem_name like '%" + search_text + "%' \n";
	// 			where_sql += " or concat(orgmem_tel1, orgmem_tel2, orgmem_tel3) like concat('%', replace('" + search_text + "', '-', ''), '%')\n";
	// 			where_sql += " or concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like concat('%', replace('" + search_text + "', '-', ''), '%')\n";

	// 			where_sql += " or (SELECT t.code_name FROM code t WHERE t.code=orgmem_committee  AND t.code_group='committee') like '%" + search_text + "%' \n";
	// 			where_sql += " or orgmem_address like '%" + search_text + "%' \n";
	// 			where_sql += " or concat(orgmem_fax1, orgmem_fax2, orgmem_fax3) like concat('%', replace('" + search_text + "', '-', ''), '%')\n";
	// 			where_sql += " or orgmem_homepage like '%" + search_text + "%' \n";
	// 			where_sql += " or orgmem_product like '%" + search_text + "%') \n";
	// 			break;
	// 	}
	// }	

	var org_posi = "";
	// switch(search_type){
	// 	/*case "001":	 // 지부장
	// 		org_posi = "001, 011, 012, 020, 023, 030, 022, 025";
	// 		break;*/
	// 	default :
	// 		org_posi = search_type;
	// 		break;
			
	// }
	// console.log("SEARCH TYPE : " + search_type);
	// if(search_type != '' && search_type != 'all' && search_type != 'name' && search_type != 'company' && search_type!='null'){
	// 	where_sql += " and orgmem_position in ("+org_posi+") \n";
	// }	
	// console.log("BRANCH TYPE :"+branch_type);
	// if(member_type == "member2"){
	// 	if(branch_type != '' && branch_type != 'all' && branch_type != 'name' && branch_type != 'company' && branch_type!='null'){
	// 		where_sql += " and orgmem_position = '" + branch_type + "' ";
	// 	}	
		
	// }else{
	// 	if(branch_type != '' && branch_type != 'all' && branch_type != 'name' && branch_type != 'company' && branch_type!='null'){
	// 		where_sql += " and orgmem_branch= '"+branch_type+"' ";
	// 	}	
	// }
			
	// 개발자는 앱에선 안 보이게
	// where_sql += "AND (orgmem_branch != '099' OR orgmem_branch IS null) ";
	// if(member_type == "member2"){
	// 	where_sql += " and orgmem_branch = '120' ";
	// }else{
	// 	where_sql += " and orgmem_branch != '120' ";
	// }
	sql += where_sql;
	count_sql += where_sql;
	//정렬
	// if(club_type == '대구새천년 L.C' || club_type == '대구반월 L.C'){
		//sql += "ORDER BY orgmem_birth_month is NULL, orgmem_birth_month ASC,  orgmem_reg_no is null, orgmem_reg_no ASC\n";
	// 	sql += "ORDER BY orgmem_birth_month is NULL, orgmem_birth_month ASC ,orgmem_birth_year IS NULL, orgmem_birth_year*10 asc \n";
	// }else{
		sql += "ORDER BY orgmem_birth_month is NULL, orgmem_birth_month ASC,  orgmem_reg_no is null, orgmem_reg_no ASC\n";
	// }
	//sql += "order by orgmem_committee2  IS NULL asc, orgmem_committee2 = '550' DESC, orgmem_committee2 = '560' DESC, orgmem_committee2 = '580' DESC, orgmem_committee_text ASC \n";

		
	// if(branch_type=='120'){
	// 	sql += "order by priority is null asc, priority asc, organ_position asc, orgmem_name asc \n";
	// }else{
	// 	sql += "order by  branch_order asc , orgmem_committee_position asc, position_order asc ,priority is null asc, priority asc, committee_order asc, composition_order asc, orgmem_name asc \n";
	// }
	// if(branch_type=='120'){
	// 	sql += "order by priority is null asc, priority asc, organ_position asc, orgmem_name asc \n";
	// }else{
	// 	sql += "order by  branch_order asc , priority is null asc, priority asc, position_order asc , committee_order asc, composition_order asc, orgmem_name asc \n";
	// }
	// if(branch_type=='104') {
	// 	sql += "order by composition_order asc, orgmem_name ='' asc, orgmem_name asc   \n";
	// }
	// else if(branch_type=='120'){
	// 	sql += "order by  ISNULL(organ_position), organ_position asc ,orgmem_name ='' asc, orgmem_name asc   \n";
	// }else if(branch_type=='115' || branch_type =='110') {
	// 	sql += "order by orgmem_name ='' asc, orgmem_name asc \n";
	// }
	// else if (branch_type == '' || branch_type == null || branch_type == undefined || branch_type == "null"){
	// 	sql += "order by branch_order asc, composition_order asc, orgmem_name ='' asc, orgmem_name asc  \n";
		
	// }
	// else if (branch_type == '' || branch_type == null || branch_type == undefined || branch_type == "null"){
	// 	sql += "order by  branch_order asc, orgmem_committee_position asc, orgmem_committee asc, orgmem_member asc, ISNULL(organ_position), organ_position ='', organ_position asc    \n";
		
	// }
	
	sql += " limit " + strlimit + ", " + endlimit;
	
	/* 데이터 E */

	//앱설치된사람 카운트
	app_install_sql = "select count(*) as cnt from orgmember a, push b where a.orgmem_no = b.orgmem_no " + where_sql;
	console.log(app_install_sql);
	console.log("conunt_sql ======================================================= \n");
	console.log(count_sql);
	console.log("======================================================= \n");
	console.log(sql);
	console.log("======================================================= \n");
	console.log("\n \n " + app_install_sql);
	console.log("======================================================= \n");
	db.query(app_install_sql, function(error, app_install_count_result){
		
	if (error) throw error;
	console.log('The solution is: ', app_install_count_result[0].solution);
	 db.query(count_sql2, function(error, count_result2){
		db.query(count_sql, function(error, count_result){
			db.query(sql, function(error, results){
				response.send({
					connectorNo : connectorNo,
					db_data : results,
					db_data_length : count_result[0].cnt,
					db_data_length2 : count_result2[0].cnt,
					search_type : search_type,
					search_text : search_text,
					app_install_count : app_install_count_result[0].cnt,
					num_type : num_type,
					century:century
				}); 
			});
		});
	});
});
};
