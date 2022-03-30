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
	var area_zone_type = request.param("area_zone_type")=='null' ? "" : request.param("area_zone_type");
	var num_type2 = request.param("num_type2")==undefined ? "" : request.param("num_type2");
	var area_zone_type2 = request.param("area_zone_type2")=='null' ? "" : request.param("area_zone_type2");
	var search_text2 = request.param("search_text2")==undefined ? "" : request.param("search_text2");
	var century = request.param("century")==undefined ? "" : request.param("century");
	console.log("num_type"+num_type2);
	console.log("area_zone_type"+area_zone_type2);

	
	var club_type = request.param("club_type")==undefined ? "" : request.param("club_type");
	var sql="";
	var app_install_sql = "";
	var club_sql = "";
	var where_sql = "";
	var strlimit = request.param("strlimit") == undefined ? 0 : request.param("strlimit");
	var endlimit = request.param("endlimit") == undefined ? 20 : request.param("endlimit");
	console.log("endlimit!!!!!!!!!!!!!!!!!!!!!!!!!!"+ endlimit);
	var table = "";

	if(century == 2020){
		table  = "orgmember_2020";
	}else{
		table = "orgmember";
	}

	var count_sql2 = " select count(*) as cnt \n" +
	" from  "+table+" \n" +
	" where 1=1 AND orgmem_disp_yn = 'N' \n";
	/* 카운트 S */
	
	var count_sql = "";

	count_sql =  "select count(*) as cnt  from ( \n";
	count_sql += "select @RNUM := @RNUM + 1 as num, \n";
	count_sql += "link2, \n";
	count_sql += "orgmem_no, \n";
	count_sql += "orgmem_reg_no, \n";
	count_sql += "orgmem_company_name, \n";
	count_sql += "orgmem_birth_month, \n";
	count_sql += "orgmem_email, \n";	
	count_sql += "orgmem_name, \n";
	count_sql += "ifnull(orgmem_phone1, '') as orgmem_phone1, \n";
	count_sql += "ifnull(orgmem_phone2, '') as orgmem_phone2, \n";
	count_sql += "ifnull(orgmem_phone3, '') as orgmem_phone3, \n";
	count_sql += "ifnull(orgmem_tel1, '') as orgmem_tel1, \n";
	count_sql += "ifnull(orgmem_tel2, '') as orgmem_tel2, \n";
	count_sql += "ifnull(orgmem_tel3, '') as orgmem_tel3, \n";
	count_sql += "ifnull(orgmem_fax1, '') as orgmem_fax1, \n";
	count_sql += "ifnull(orgmem_fax2, '') as orgmem_fax2, \n";
	count_sql += "ifnull(orgmem_fax3, '') as orgmem_fax3, \n";
	count_sql += "zip_code, \n";
	count_sql += "orgmem_address, \n";
	count_sql += "orgmem_img, \n";
	count_sql += "orgmem_branch, \n";
	count_sql += "orgmem_name_en, \n";
	count_sql += "orgmem_name_han, \n";
	count_sql += "orgmem_area, \n";
	count_sql += "club_position_text, \n";
	count_sql += "area_club, \n";
	count_sql += "area_zone, \n";
	count_sql += "club_position, \n";
	count_sql += "club_position2, \n";
	count_sql +=  "orgmem_disp_yn, \n";
	count_sql +=  "club_position_second, \n";
	count_sql +=  "CHAR_LENGTH(club_position_text) AS club_position_text_length, \n";
	count_sql +=  "SUBSTRING(club_position_text,1,2) AS club_position_text3, \n";
	count_sql += "(SELECT club_order FROM code_club cl WHERE a.club_index = cl.code_id) AS club_order,\n";
	count_sql += "(SELECT club_num FROM code_club cl WHERE a.club_index = cl.code_id) AS club_num,\n";
	count_sql += "(SELECT club_date FROM code_club cl WHERE a.club_index = cl.code_id) AS club_date,\n";
	count_sql += "(SELECT club_sponser FROM code_club cl WHERE a.club_index = cl.code_id) AS club_sponser,\n";
	count_sql += "(SELECT club_address FROM code_club cl WHERE a.club_index = cl.code_id) AS club_address,\n";
	count_sql += "(SELECT club_tel FROM code_club cl WHERE a.club_index = cl.code_id) AS club_tel,\n";
	count_sql += "(SELECT club_fax FROM code_club cl WHERE a.club_index = cl.code_id) AS club_fax,\n";
	count_sql += "(SELECT club_meeting FROM code_club cl WHERE a.club_index = cl.code_id) AS club_meeting,\n";
	count_sql += "(SELECT club_directors FROM code_club cl WHERE a.club_index = cl.code_id) AS club_directors,\n";
	count_sql += "(SELECT club_worker FROM code_club cl WHERE a.club_index = cl.code_id) AS club_worker,\n";
	count_sql += "(SELECT t.code_name FROM code t WHERE t.code=a.club_position AND t.code_group='club_position' and t.code_mode='child') as club_position_name, \n";
	count_sql += "right((SELECT t.code_name FROM code t WHERE t.code=a.club_position AND t.code_group='club_position' and t.code_mode='child'), '2') AS club_position_name2,\n";
	count_sql += "IFNULL(SUBSTRING(club_position_text, 2,1), '') AS club_position_text2,\n";
	count_sql += "(select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os \n";
	if(century == '2020'){
		count_sql += "from orgmember_2020 a, (SELECT @RNUM := 0 ) r \n";
	}else{
		count_sql += "from orgmember a, (SELECT @RNUM := 0 ) r \n";
	}
	count_sql += ") k ";
	count_sql += "where 1=1  AND orgmem_disp_yn = 'Y'\n";

	

	var count_where_sql = "";
	if(num_type == '' && area_zone_type == ''){
		num_type += num_type2;
		area_zone_type += area_zone_type2;
	}
	// if(search_text == '' && num_type == '' && area_zone_type == ''){
	// 	search_text += search_text2;
	// }
	switch(num_type){
		case "1지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null \n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '1지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}

			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "2지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '2지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "3지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '3지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "4지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '4지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "5지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '5지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "6지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '6지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "7지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '7지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "8지역":
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '8지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				count_where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		
		default:
			count_where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			count_where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				count_where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(search_text2 != '' && search_text == ''){
				count_where_sql += "and (area_club like '%" + search_text2 + "%' or orgmem_phone3 like '%" + search_text2 + "%')";
			}
        break;
	}
	
	count_sql = count_sql + count_where_sql;
	count_sql2 = count_sql2 + count_where_sql;
	/* 카운트 E */

	/* 데이터 S */

	sql =  "select * from ( \n";
	sql += "select @RNUM := @RNUM + 1 as num, \n";
	sql += "link2, \n";
	sql += "orgmem_no, \n";
	sql += "orgmem_reg_no, \n";
	sql += "orgmem_company_name, \n";
	sql += "orgmem_birth_month, \n";
	sql += "orgmem_email, \n";	
	sql += "orgmem_name, \n";
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
	sql += "orgmem_img, \n";
	sql += "orgmem_branch, \n";
	sql += "orgmem_name_en, \n";
	sql += "orgmem_name_han, \n";
	sql += "orgmem_area, \n";
	sql += "club_position_text, \n";
	sql += "area_club, \n";
	sql += "area_zone, \n";
	sql += "club_position, \n";
	sql += "club_position2, \n";
	sql += "phone_YN, \n";
	sql += "company_YN, \n";
	sql += "tel_YN, \n";
	sql += "fax_YN, \n";
	sql += "e_mail_YN, \n";
	sql += "adr_YN, \n";
	sql += "club_position_second, \n";
	sql += "CHAR_LENGTH(club_position_text) AS club_position_text_length, \n";
	sql += "orgmem_disp_yn, \n";
	sql += "SUBSTRING(club_position_text,1,2) AS club_position_text3, \n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.club_position_second AND t.code_group='club_position' and t.code_mode='child') as club_position_second_name, \n";
	sql += "(SELECT club_order FROM code_club cl WHERE a.club_index = cl.code_id) AS club_order,\n";
	sql += "(SELECT club_num FROM code_club cl WHERE a.club_index = cl.code_id) AS club_num,\n";
	sql += "(SELECT club_date FROM code_club cl WHERE a.club_index = cl.code_id) AS club_date,\n";
	sql += "(SELECT club_sponser FROM code_club cl WHERE a.club_index = cl.code_id) AS club_sponser,\n";
	sql += "(SELECT club_address FROM code_club cl WHERE a.club_index = cl.code_id) AS club_address,\n";
	sql += "(SELECT club_tel FROM code_club cl WHERE a.club_index = cl.code_id) AS club_tel,\n";
	sql += "(SELECT club_fax FROM code_club cl WHERE a.club_index = cl.code_id) AS club_fax,\n";
	sql += "(SELECT club_meeting FROM code_club cl WHERE a.club_index = cl.code_id) AS club_meeting,\n";
	sql += "(SELECT club_directors FROM code_club cl WHERE a.club_index = cl.code_id) AS club_directors,\n";
	sql += "(SELECT club_worker FROM code_club cl WHERE a.club_index = cl.code_id) AS club_worker,\n";
	sql += "(SELECT t.code_name FROM code t WHERE t.code=a.club_position AND t.code_group='club_position' and t.code_mode='child') as club_position_name, \n";
	sql += "right((SELECT t.code_name FROM code t WHERE t.code=a.club_position AND t.code_group='club_position' and t.code_mode='child'), '2') AS club_position_name2,\n";
	sql += "right((SELECT t.code_name FROM code t WHERE t.code=a.club_position_second AND t.code_group='club_position' and t.code_mode='child'),2) as club_position_second_name2,\n";
	sql += "club_position_text AS club_position_text2,\n";
	sql += "(select x.type from push x where x.orgmem_no = a.orgmem_no order by final_date limit 0,1) as device_os \n";
	if(century == '2020'){
		sql += "from orgmember_2020 a, (SELECT @RNUM := 0 ) r \n";
	}else{
		sql += "from orgmember a, (SELECT @RNUM := 0 ) r \n";
	}
	sql += ") k ";
	sql += "where 1=1 AND orgmem_disp_yn = 'Y'\n";

	
	switch(num_type){
	
		case "1지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '1지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "2지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '2지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "3지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '3지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "4지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '4지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "5지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '5지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "6지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '6지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "7지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '7지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		case "8지역":
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND orgmem_area = '8지역' and (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(area_zone_type != ''){
				where_sql += "AND area_club = '" + area_zone_type + "'\n";
			}
		break;
		default:
			where_sql += "AND club_position Is NOT NULL AND club_position != '' AND area_club != '' AND area_club IS NOT null\n";
			where_sql += "AND (club_position = '1000' OR club_position = '1001' OR club_position = '1002' OR club_position = '1003' OR club_position = '1004' OR club_position = '1013' OR club_position = '1005' OR club_position = '1010' OR club_position = '1011' OR club_position = '1012') AND (orgmem_branch != '099' or orgmem_branch IS null)\n";
			if(search_text != ''){
				where_sql += "and (orgmem_name like '%" + search_text + "%' or orgmem_company_name like '%" + search_text + "%' or area_club like '%" + search_text + "%' or orgmem_phone3 like '%" + search_text + "%')";
			}
			if(search_text2 != '' && search_text == ''){
				where_sql += "and (area_club like '%" + search_text2 + "%' or orgmem_phone3 like '%" + search_text2 + "%')";
			}
        break;
	}
	
	sql += where_sql;
	//정렬
	if(area_zone_type != ''){
		//sql += "ORDER BY orgmem_birth_month is NULL, orgmem_birth_month ASC\n";
		sql += "ORDER BY club_position is NULL, club_position ASC, club_position_text2 = '' asc, club_position_text2*10 asc \n";
	}else {
		//sql += "ORDER BY club_order is NULL, club_order*10 ASC, club_position*10 asc,  club_position_text2 ASC, orgmem_name ASC\n";
		sql += "ORDER BY club_position is NULL, club_position ASC, club_position_text2 = '' asc, club_position_text2*10 asc \n";
	}

	sql += " limit " + strlimit + ", " + endlimit;
	console.log(sql);
	app_install_sql = "select count(*) as cnt from orgmember a, push b where a.orgmem_no = b.orgmem_no " + where_sql;
	/* 데이터 E */
	club_sql = "select * from code_club";
	//앱설치된사람 카운트
	console.log("conunt_sql ======================================================= \n");
	console.log(count_sql);
	console.log("======================================================= \n");
	console.log(sql);
	console.log("======================================================= \n");
	console.log("======================================================= \n");
	db.query(app_install_sql, function(error, app_install_count_result){
	db.query(club_sql, function(error, club_result){
		db.query(count_sql2, function(error, count_result2){
			db.query(count_sql, function(error, count_result){
			db.query(sql, function(error, results){
				response.send({
					connectorNo : connectorNo,
					db_data : results,
					db_data_length : count_result[0].cnt,
					db_data_length2 : count_result2[0].cnt,
					club_data : club_result,
					search_type : search_type,
					search_text : search_text,
					num_type : num_type,
					app_install_count : app_install_count_result[0].cnt,
					century:century
				}); 
			});
		});
	});
});
	});
};
