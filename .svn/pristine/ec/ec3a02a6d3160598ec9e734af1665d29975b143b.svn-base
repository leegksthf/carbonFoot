var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;
var osModule = require('os');

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;
	var mode= request.param("mode");
	
	// 사업자번호
	var orgmem_reg_no =  request.param("orgmem_reg_no") == undefined ? '' : request.param("orgmem_reg_no");
	var club_position_text =  request.param("club_position_text") == undefined ? '' : request.param("club_position_text");
	var club_position_second =  request.param("club_position_second") == undefined ? '' : request.param("club_position_second");

	// 회사명
	var orgmem_company_name =  request.param("orgmem_company_name") == undefined ? '' : request.param("orgmem_company_name");	
	// 회원명
	var orgmem_name =  request.param("orgmem_name");
	var orgmem_name_en =  request.param("orgmem_name_en") == null ? '' : request.param("orgmem_name_en");
	var orgmem_name_han =  request.param("orgmem_name_han") == null ? '' : request.param("orgmem_name_han");

	// 휴대번호
	var orgmem_phone1 = request.param("orgmem_phone1") == null ? '' : request.param("orgmem_phone1");
	var orgmem_phone2 = request.param("orgmem_phone2") == null ? '' : request.param("orgmem_phone2");
	var orgmem_phone3 = request.param("orgmem_phone3") == null ? '' : request.param("orgmem_phone3");

	// 전화번호
	var orgmem_tel1 = request.param("orgmem_tel1") == null ? '' : request.param("orgmem_tel1");
	var orgmem_tel2 = request.param("orgmem_tel2") == null ? '' : request.param("orgmem_tel2");
	var orgmem_tel3 = request.param("orgmem_tel3") == null ? '' : request.param("orgmem_tel3");	 

	// 팩스번호
	var orgmem_fax1 = request.param("orgmem_fax1") == null ? '' : request.param("orgmem_fax1");
	var orgmem_fax2 = request.param("orgmem_fax2") == null ? '' : request.param("orgmem_fax2");
	var orgmem_fax3 = request.param("orgmem_fax3") == null ? '' : request.param("orgmem_fax3");	
	var post_num = request.param("post_num") == null ? '' : request.param("post_num");	
	// 이메일
	var orgmem_email = request.param("orgmem_email") == null ? '' : request.param("orgmem_email");	

	//직위
	var organ_position = request.param("organ_position") == null ? '' : request.param("organ_position");	

	// 생산or취급 상품
	var orgmem_product = request.param("orgmem_product") == null ? '' : request.param("orgmem_product");	

	// 음력여부
	var orgmem_lunar = request.param("orgmem_lunar") == undefined ? 'N' : request.param("orgmem_lunar");

	// 생일
	var orgmem_birth_year =  request.param("orgmem_birth_year");
	var orgmem_birth_month =  request.param("orgmem_birth_month");
	var orgmem_birth_day =  request.param("orgmem_birth_day");	

	// 지부
	var orgmem_branch = request.param("orgmem_branch") == undefined ? '' : request.param("orgmem_branch");

	// 직위
	var orgmem_position = request.param("orgmem_position") == undefined ? '' : request.param("orgmem_position");
	
	// 부직위
	var orgmem_sub_position = request.param("orgmem_sub_position") == undefined ? '' : request.param("orgmem_sub_position");
	
	// 위원회
	var orgmem_committee = request.param("orgmem_committee") == undefined ? '' : request.param("orgmem_committee");

	// 위원회 직위
	var orgmem_committee_position = request.param("orgmem_committee_position") == undefined ? '' : request.param("orgmem_committee_position");
	
	// 위원회2
	var orgmem_committee2 = request.param("orgmem_committee2") == undefined ? '' : request.param("orgmem_committee2");

	// 위원회 직위2
	var orgmem_committee_position2 = request.param("orgmem_committee_position2") == undefined ? '' : request.param("orgmem_committee_position2");
	var orgmem_sub_position2 = request.param("orgmem_sub_position2") == undefined ? '' : request.param("orgmem_sub_position2");


	// 위원회3
	var orgmem_committee3 = request.param("orgmem_committee3") == undefined ? '' : request.param("orgmem_committee3");

	// 위원회 직위3
	var orgmem_committee_position3 = request.param("orgmem_committee_position3") == undefined ? '' : request.param("orgmem_committee_position3");
	var orgmem_sub_position3 = request.param("orgmem_sub_position3") == undefined ? '' : request.param("orgmem_sub_position3");
	var orgmem_committee_text3 = request.param("orgmem_committee_text3") == undefined ? "" : request.param("orgmem_committee_text3");
	// 회원 종류
	var orgmem_member = request.param("orgmem_member") == undefined ? '' : request.param("orgmem_member");


	// 업종
	var orgmem_work_duty = request.param("orgmem_work_duty") == undefined ? '' : request.param("orgmem_work_duty");

	// 사업자번호
	var orgmem_regist_num = request.param("orgmem_regist_num") == undefined ? '' : request.param("orgmem_regist_num");

	// 우편번호
	var zip_code = request.param("zip_code") == null ? '' : request.param("zip_code");	

	// 주소
	var orgmem_address = request.param("orgmem_address") == undefined ? '' : request.param("orgmem_address");
	
	// 홈페이지
	var orgmem_homepage = request.param("orgmem_homepage") == undefined ? '' : request.param("orgmem_homepage");

	var area_club = request.param("area_club") == undefined ? '' : request.param("area_club");
	
	var orgmem_area = request.param("orgmem_area") == undefined ? '' : request.param("orgmem_area");

	var area_zone = request.param("area_zone") == undefined ? '' : request.param("area_zone");
	var club_position = request.param("club_position") == '' ? '1015' : request.param("club_position");
	var club_position2 = request.param("club_position2") == '' ? '' : request.param("club_position2");
	//
	var cap_eval_amount = request.param("cap_eval_amount") == undefined ? '' : request.param("cap_eval_amount");
	var local_rank = request.param("local_rank") == undefined ? '' : request.param("local_rank");
	var national_rank = request.param("national_rank") == undefined ? '' : request.param("national_rank");
	
	// 비고
	var remrk = request.param("remrk") == undefined ? '' : request.param("remrk");

	var orgmem_committee_text = request.param("orgmem_committee_text") == undefined ? "" : request.param("orgmem_committee_text");
	// 인증서1
	var certificate1 = request.param("certificate1") == undefined ? '' : request.param("certificate1");
	// 인증서2
	var certificate2 = request.param("certificate2") == undefined ? '' : request.param("certificate2");
	
	//	회사소개pdf 
	var company_introduce = request.param("company_introduce") == undefined ? '' : request.param("company_introduce");
	
	// 언론보도 link
	var link1 = request.param("link1") == undefined ? '' : request.param("link1");
	// 동영상 link
	var link2 = request.param("link2") == undefined ? '' : request.param("link2");
	// 정렬순서
	var priority = request.param("priority") == undefined ? null : request.param("priority");
	if(priority == null || priority == 'null' || priority == '') {
		priority = null;
	}

	console.log("priority :::::" + orgmem_committee_text) 

	var officer_arr = request.param("officer_arr") == undefined ? '' : request.param("officer_arr");
	var sub_officer_arr = request.param("sub_officer_arr") == undefined ? '' : request.param("sub_officer_arr");
	var position_arr = request.param("position_arr") == undefined ? '' : request.param("position_arr");
	
	var create_id = request.session.ad_id;
	var create_host = request.connection.remoteAddress;
	var create_name = request.session.ad_nm;
	
	var extensionIndex = "";
	var extension = "";
	var date = new Date();
	var day = date.toFormat('YYYYMMDDHHMISS');
	var pathlast = __dirname;
	var pathIndex = "";
	var phone_YN = request.param("phone_YN") == undefined ? 'Y' : request.param("phone_YN");
	var company_YN = request.param("company_YN") == undefined ? 'Y' : request.param("company_YN");
	var tel_YN = request.param("tel_YN") == undefined ? 'Y' : request.param("tel_YN");
	var fax_YN = request.param("fax_YN") == undefined ? 'Y' : request.param("fax_YN");
	var e_mail_YN = request.param("e_mail_YN") == undefined ? 'Y' : request.param("e_mail_YN");
	var adr_YN = request.param("adr_YN") == undefined ? 'Y' : request.param("adr_YN");

	var company_img1 = request.param("company_img1") == undefined || null ? '' : request.param("company_img1");
	var company_img2 = request.param("company_img2") == undefined || null ? '' : request.param("company_img2");
	var company_img3 = request.param("company_img3") == undefined || null ? '' : request.param("company_img3");
	var company_img4 = request.param("company_img4") == undefined || null ? '' : request.param("company_img4");
	
	var business_card = request.param("business_card") == undefined || null ? '' : request.param("business_card");




	if(use_os_falg) {
		pathIndex = pathlast.lastIndexOf('\/custom_module');
	} else {
		pathIndex = pathlast.lastIndexOf('\\custom_module');
	}
	
	var path = pathlast.substring(pathIndex, 0);						//파일이름
	var orgmem_img = "";
	var memberImg_original = "";
	var memberImg_path = "";
	
	var orgmem_no = 0;
	var club_index = '';
	var org_grant = '';

	var company_img1_path="";
	var company_img2_path="";
	var company_img3_path="";
	var company_img4_path="";

	var business_card_path="";

	var certificate1_path="";
	var certificate2_path="";
	
	var company_introduce_path ="";
	
	if(request.param("memberImg") != undefined){
		orgmem_img = request.param("memberImg");
		
	}else if(request.files.memberImg.name != ""){
		memberImg_original = request.files.memberImg.name;
		memberImg_path = request.files.memberImg.path;
		
		extensionIndex = memberImg_original.lastIndexOf('.');
		extension = memberImg_original.substring(extensionIndex, memberImg_original.length);	//파일확장자
		
		if(extension != ""){
			orgmem_img = day + extension;
		}else{
			orgmem_img = "";
		}
	}

	 var sql = "";
	switch (area_club) {
		case '대구(MJF) L.C':
			club_index = '1';
			org_grant = '5149';
		break;
		case '대구중앙 L.C':
			club_index = '3';
			org_grant = '6166';
		break;
		case '대구동 L.C':
			club_index = '14';
			org_grant = '0385';
		break;
		case '대구남 L.C':
			club_index = '107';
			org_grant = '4822';
		break;
		case '대구서 L.C':
			club_index = '15';
			org_grant = '0436';
		break;
		case '대구팔공 L.C':
			club_index = '108';
			org_grant = '4822';
		break;
		case '대구새대구 L.C':
			club_index = '16'
			org_grant = '8917';
		break;
		case '대구달구벌 L.C':
			club_index = '110'
			org_grant = '4822';
		break;
		case '대구경북 L.C':
			club_index = '2'
			org_grant = '0060';
		break;
		case '대구수성 L.C':
			club_index = '60'
			org_grant = '0385';
		break;
		case '대구대덕 L.C':
			club_index = '47'
			org_grant = '8088';
		break;
		case '대구종로 L.C':
			club_index = '17'
			org_grant = '0436';
		break;
		case '대구한일 L.C':
			club_index = '57'
			org_grant = '9085';
		break;
		case '대구대도 L.C':
			club_index = '111'
			org_grant = '3692';
		break;
		case '대구화랑 L.C':
			club_index = '67'
			org_grant = '';
		break;
		case '대구경일 L.C':
			club_index = '73'
			org_grant = '2639';
		break;
		case '대구한별 L.C':
			club_index = '61'
			org_grant = '9085';
		break;
		case '대구금호 L.C':
			club_index = '115'
			org_grant = '0017';
		break;
		case '대구구일 L.C':
			club_index = '18'
			org_grant = '0436';
		break;
		case '달성 L.C':
			club_index = '112'
			org_grant = '2244';
		break;
		case '대구반월 L.C':
			club_index = '113'
			org_grant = '0017';
		break;
		case '대구태극 L.C':
			club_index = '83'
			org_grant = '6954';
		break;
		case '대구경구 L.C':
			club_index = '63'
			org_grant = '8515';
		break;
		case '대구달서 L.C':
			club_index = '49'
			org_grant = '6123';
		break;
		case '대구통일 L.C':
			club_index = '64'
			org_grant = '8515';
		break;
		case '대구무도 L.C':
			club_index = '19'
			org_grant = '5523';
		break;
		case '대구대호 L.C':
			club_index = '96'
			org_grant = '0513';
		break;
		case '대구청구 L.C':
			club_index = '42'
			org_grant = '6213';
		break;
		case '대구천마 L.C':
			club_index = '20'
			org_grant = '0436';
		break;
		case '대구성호 L.C':
			club_index = '88'
			org_grant = '5076';
		break;
		case '대구성일 L.C':
			club_index = '92'
			org_grant = '5076';
		break;
		case '대구대성 L.C':
			club_index = '65'
			org_grant = '0385';
		break;
		case '대구동호 L.C':
			club_index = '100'
			org_grant = '0513';
		break;
		case '대구경원 L.C':
			club_index = '74'
			org_grant = '4034';
		break;
		case '대구경신 L.C':
			club_index = '75'
			org_grant = '6954';
		break;
		case '대구용호 L.C':
			club_index = '89'
			org_grant = '5076';
		break;
		case '대구경우 L.C':
			club_index = '78'
			org_grant = '2954';
		break;
		case '대구경진 L.C':
			club_index = '84'
			org_grant = '2639';
		break;
		case '대구여명 L.C':
			club_index = '4'
			org_grant = '6166';
		break;
		case '대구비룡 L.C':
			club_index = '101'
			org_grant = '4859';
		break;
		case '대구세명 L.C':
			club_index = '79'
			org_grant = '2639';
		break;
		case '대구쌍용 L.C':
			club_index = '93'
			org_grant = '4859';
		break;
		case '대구영동 L.C':
			club_index = '27'
			org_grant = '6335';
		break;
		case '대구대일 L.C':
			club_index = '5'
			org_grant = '0060';
		break;
		case '대구태화 L.C':
			club_index = '80'
			org_grant = '2954';
		break;
		case '대구대붕 L.C':
			club_index = '70'
			org_grant = '0385';
		break;
		case '대구청호 L.C':
			club_index = '97'
			org_grant = '0513';
		break;
		case '대구영화 L.C':
			club_index = '28'
			org_grant = '5709';
		break;
		case '대구영창 L.C':
			club_index = '37'
			org_grant = '6335';
		break;
		case '대구영광 L.C':
			club_index = '38'
			org_grant = '5709';
		break;
		case '대구목련 L.C':
			club_index = '54'
			org_grant = '4494';
		break;
		case '대구경인 L.C':
			club_index = '85'
			org_grant = '2954';
		break;
		case '대구대동 L.C':
			club_index = '45'
			org_grant = '8088';
		break;
		case '대구경성 L.C':
			club_index = '86'
			org_grant = '6954';
		break;
		case '대구평화 L.C':
			club_index = '71'
			org_grant = '9085';
		break;
		case '대구천우 L.C':
			club_index = '21'
			org_grant = '8917';
		break;
		case '대구청룡 L.C':
			club_index = '90'
			org_grant = '5076';
		break;
		case '대구청산 L.C':
			club_index = '22'
			org_grant = '8917';
		break;
		case '대구대청 L.C':
			club_index = '50'
			org_grant = '1577';
		break;
		case '대구와룡 L.C':
			club_index = '102'
			org_grant = '4859';
		break;

		case '대구강북 L.C':
			club_index = '68'
			org_grant = '8769';
		break;

		case '대구달빛 L.C':
			club_index = '109'
			org_grant = '4758';
		break;
		case '대구동 L.C':
			club_index = '14'
			org_grant = '0385';
		break;
		case '대구영호MJF L.C':
			club_index = '32'
			org_grant = '7949';
		break;
		case '대구월성 L.C':
			club_index = '58'
			org_grant = '9085';
		break;
		case '대구경림MJF L.C':
			club_index = '9'
			org_grant = '0060';
		break;
		case '대구경운 L.C':
			club_index = '10'
			org_grant = '5149';
		break;
		case '대구경명 L.C':
			club_index = '6'
			org_grant = '5149';
		break;
		case '대구경한 L.C':
			club_index = '11'
			org_grant = '6166';
		break;
		case '대구영풍 L.C':
			club_index = '33'
			org_grant = '6335';
		break;
		case '대구성화 L.C':
			club_index = '98'
			org_grant = '0513';
		break;
		case '대구새천년 L.C':
			club_index = '103'
			org_grant = '4273';
		break;
		case '대구성명 L.C':
			club_index = '91'
			org_grant = '9875';
		break;
		case '대구대경 L.C':
			club_index = '43'
			org_grant = '1577';
		break;
		case '대구동서 L.C':
			club_index = '55'
			org_grant = '6123';
		break;
		case '대구대한 L.C':
			club_index = '46'
			org_grant = '1577';
		break;
		case '대구대서 L.C':
			club_index = '52'
			org_grant = '8088';
		break;
		case '대구해동 L.C':
			club_index = '24'
			org_grant = '1278';
		break;
		case '대구성신 L.C':
			club_index = '104'
			org_grant = '9875';
		break;

		case '대구성경 L.C':
			club_index = '94'
			org_grant = '4859';
		break;

		case '대구대명 L.C':
			club_index = '7'
			org_grant = '6166';
		break;
		case '대구경혜 L.C':
			club_index = '66'
			org_grant = '8515';
		break;
		case '대구경숙 L.C':
			club_index = '81'
			org_grant = '0648';
		break;
		case '대구경모랑 L.C':
			club_index = '12'
			org_grant = '0060';
		break;
		case '대구원진 L.C':
			club_index = '76'
			org_grant = '2639';
		break;
		case '대구동백 L.C':
			club_index = '25'
			org_grant = '0385';
		break;
		case '대구영제 L.C':
			club_index = '34'
			org_grant = '6335';
		break;
		case '대구수정 L.C':
			club_index = '62'
			org_grant = '0385';
		break;
		case '대구원혜 L.C':
			club_index = '69'
			org_grant = '0385';
		break;
		case '대구경서 L.C':
			club_index = '53'
			org_grant = '5759';
		break;
		case '대구영진 L.C':
			club_index = '39'
			org_grant = '7949';
		break;

		case '대구비사 L.C':
			club_index = '48'
			org_grant = '8088';
		break;
		case '대구천호 L.C':
			club_index = '105'
			org_grant = '4273';
		break;
		case '대구대연 L.C':
			club_index = '59'
			org_grant = '5523';
		break;
		case '대구에이스 L.C':
			club_index = '56'
			org_grant = '6123';
		break;
		case '대구태연 L.C':
			club_index = '77'
			org_grant = '';
		break;
		case '대구세온 L.C':
			club_index = '82'
			org_grant = '2639';
		break;
		case '대구경아 L.C':
			club_index = '87'
			org_grant = '4710';
		break;
		case '대구유진 L.C':
			club_index = '114'
			org_grant = '0883';
		break;
		case '대구대산 L.C':
			club_index = '13'
			org_grant = '5149';
		break;
		case '대구성웅 L.C':
			club_index = '95'
			org_grant = '4273';
		break;
		case '대구해람 L.C':
			club_index = '26'
			org_grant = '8917';
		break;
		case '대구영경 L.C':
			club_index = '29'
			org_grant = '7949';
		break;
		case '대구삼강 L.C':
			club_index = '72'
			org_grant = '5523';
		break;
		case '대구대지 L.C':
			club_index = '8'
			org_grant = '6166';
		break;
		case '대구동우 L.C':
			club_index = '106'
			org_grant = '9875';
		break;
		case '대구영민 L.C':
			club_index = '35'
			org_grant = '5709';
		break;
		case '대구영빈 L.C':
			club_index = '30'
			org_grant = '5709';
		break;
		case '대구청마 L.C':
			club_index = '116'
			org_grant = '5337';
		break;
		case '대구동미 L.C':
			club_index = '99'
			org_grant = '9875';
		break;
		case '대구해원 L.C':
			club_index = '117'
			org_grant = '7757';
		break;
		case '대구효성 L.C':
			club_index = '51'
			org_grant = '6632';
		break;
		case '대구영심이 L.C':
			club_index = '40'
			org_grant = '7949';
		break;
		case '대구영림 L.C':
			club_index = '31'
			org_grant = '6335';
		break;
		case '대구영모 L.C':
			club_index = '41'
			org_grant = '5709';
		break;
		case '대구청암 L.C':
			club_index = '44'
			org_grant = '1577';
		break;
		case '대구경교 L.C':
			club_index = '130'
			org_grant = '6166';
		break;
	}
	     

	 
	 if(mode=="insert"){
		 sql = "insert into orgmember(" +
				"orgmem_company_name, " +
				"orgmem_company_name_cho, " +
				"orgmem_regist_num, " +
				"orgmem_lunar, \n" +
		 		"orgmem_name, " +
		 		"orgmem_name_cho, " +
		 		"orgmem_phone1, " +
		 		"orgmem_phone2, " +
		 		"orgmem_phone3, " +
		 		"orgmem_tel1, " +
		 		"orgmem_tel2, " +
		 		"orgmem_tel3, " +
		 		"orgmem_fax1, " +
		 		"orgmem_fax2, " +
				"orgmem_fax3, " +				
		 		"zip_code, " +
				"orgmem_address, " +
				"orgmem_branch, " +
				"orgmem_position, " +
				"orgmem_sub_position, "  +
				"orgmem_committee, "  +
				"orgmem_committee_position, "  +
				"orgmem_committee2, "  +
				"orgmem_committee_position2, "  +
				"orgmem_sub_position2, "  +
				/*	지구임원 겸직 추가     */
				"orgmem_committee3, "  +
				"orgmem_committee_position3, "  +
				"orgmem_sub_position3, "  +
				"orgmem_committee_text3, "  +	
				/*	지구임원 겸직 추가     */
				"orgmem_work_duty, " +
				"orgmem_product, " +
				"orgmem_email, "  +
				"organ_position, "  +
		 		"cap_eval_amount, " +
		 		"local_rank, " +
		 		"national_rank, " +
		 		"remrk, " +
		 		"orgmem_img, " +
		 		"company_img1, " +
		 		"company_img2, " +
		 		"company_img3, " +
		 		"company_img4, " +
		 		"business_card, " +
				"orgmem_homepage, " +
				"orgmem_name_en, " +
				"orgmem_name_han, " +
				"orgmem_reg_no, " +
				"orgmem_birth_month, " +
		 		"create_id, " +
		 		"create_date, " +
				"create_host," +
				"orgmem_member, "+
				"orgmem_area," + 
				"area_zone," + 
				"area_club," + 
				"post_num," + 
				"phone_YN," + 
				"company_YN," + 
				"tel_YN," + 
				"fax_YN," + 
				"e_mail_YN," + 
				"adr_YN," + 
				"certificate1," +
				"certificate2," +
				"company_introduce," +
				"link1," +
				"link2," +
				"club_index," +
				"org_grant," +
				"club_position_second," +
				"club_position_text," +
				"orgmem_committee_text," +
				"club_position," +
				"club_position2," +
				"priority" +
				" ) " +
		 		"values(" +
		 		"'"+orgmem_company_name+"'," +
				"fn_choSearch('"+orgmem_company_name+"')," +
				"'"+orgmem_regist_num+"', \n" +
				"'"+orgmem_lunar+"', \n" +
                "'"+orgmem_name+"'," +
                "fn_choSearch('"+orgmem_name+"')," +
                "'"+orgmem_phone1+"'," +
                "'"+orgmem_phone2+"'," +
                "'"+orgmem_phone3+"'," +
                "'"+orgmem_tel1+"'," +
                "'"+orgmem_tel2+"'," +
                "'"+orgmem_tel3+"'," +
                "'"+orgmem_fax1+"'," +
                "'"+orgmem_fax2+"'," +
				"'"+orgmem_fax3+"'," +				
                "'"+zip_code+"'," +
				"'"+orgmem_address+"'," +
				"'"+orgmem_branch+"'," +
				"'"+orgmem_position+"'," +
				"'"+orgmem_sub_position+"'," +
				"'"+orgmem_committee+"'," +
				"'"+orgmem_committee_position+"'," +
				"'"+orgmem_committee2+"'," +
				"'"+orgmem_committee_position2+"'," +
				"'"+orgmem_sub_position2+"'," +
				/*지구임원 겸직 추가*/ 
				"'"+orgmem_committee3+"'," +
				"'"+orgmem_committee_position3+"'," +
				"'"+orgmem_sub_position3+"'," +
				"'"+orgmem_committee_text3+"'," +
				/*지구임원 겸직 추가*/
				"'"+orgmem_work_duty+"'," +
				"'"+orgmem_product+"'," +
				"'"+orgmem_email+"'," +
				"'"+organ_position+"'," +								
                "'"+cap_eval_amount+"'," +
                "'"+local_rank+"'," +
                "'"+national_rank+"'," +
                "'"+remrk+"'," +
                "'"+orgmem_img+"'," +
                "'"+company_img1+"'," +
                "'"+company_img2+"'," +
                "'"+company_img3+"'," +
                "'"+company_img4+"'," +
                "'"+business_card+"'," +
				"'"+orgmem_homepage+"'," +
				"'"+orgmem_name_en+"'," +
				"'"+orgmem_name_han+"'," +
				"'"+orgmem_reg_no+"'," +
				"'"+orgmem_birth_month+"'," +
                "'"+create_id+"'," +
                "now(), " +
				"'"+create_host+"', " +
				"'"+orgmem_member+"', " +
				"'"+orgmem_area+"', " +
				"'"+area_zone+"', " +
				"'"+area_club+"', " +
				"'"+post_num+"', " +
				"'"+phone_YN+"', " +
				"'"+company_YN+"', " +
				"'"+tel_YN+"', " +
				"'"+fax_YN+"', " +
				"'"+e_mail_YN+"', " +
				"'"+adr_YN+"', " +
				"'"+certificate1+"', " +
				"'"+certificate2+"', " +
				"'"+company_introduce+"',  " +
				"'"+link1+"', " +
				"'"+link2+"', " +
				"'"+club_index+"', " +
				"'"+org_grant+"', " +
				"'"+club_position_second+"', " +
				"'"+club_position_text+"', " +
				"'"+orgmem_committee_text+"', " +
				"'"+club_position+"', " +
				"'"+club_position2+"', " ;
				if(priority == null) {
					sql += "null" ;
				}else{
					sql += priority ;
				}
				
		 		sql += ")";
	 }
	 else {
		 orgmem_no = request.param("no");
		 console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+area_club);
		 sql = "update orgmember set " +
				"orgmem_reg_no='"+orgmem_reg_no+"', " +
				"orgmem_company_name='"+orgmem_company_name+"', " +
				"orgmem_company_name_cho=fn_choSearch('"+orgmem_company_name+"'), " +
				"orgmem_regist_num='"+orgmem_regist_num+"', " + 
		 		"orgmem_name='"+orgmem_name+"', " +
				"orgmem_name_cho=fn_choSearch('"+orgmem_name+"'), " +
				"orgmem_lunar='"+orgmem_lunar+"', \n " +
		 		"orgmem_phone1='"+orgmem_phone1+"', " +
		 		"orgmem_phone2='"+orgmem_phone2+"', " +
		 		"orgmem_phone3='"+orgmem_phone3+"', " +
		 		"orgmem_tel1='"+orgmem_tel1+"', " +
		 		"orgmem_tel2='"+orgmem_tel2+"', " +
		 		"orgmem_tel3='"+orgmem_tel3+"', " +
		 		"orgmem_fax1='"+orgmem_fax1+"', " +
		 		"orgmem_fax2='"+orgmem_fax2+"', " +
				"orgmem_fax3='"+orgmem_fax3+"', " +				
				"zip_code='"+zip_code+"', " +
				"phone_YN='"+phone_YN+"', " +
				"company_YN='"+company_YN+"', " +
				"tel_YN='"+tel_YN+"', " +
				"fax_YN='"+fax_YN+"', " +
				"adr_YN='"+adr_YN+"', " +
				"e_mail_YN='"+e_mail_YN+"', " +
				"orgmem_address='"+orgmem_address+"', " +
				"orgmem_branch='"+orgmem_branch+"', " +	
				"orgmem_position='"+orgmem_position+"', " +	
				"orgmem_sub_position='"+orgmem_sub_position+"', " +	
				"orgmem_committee='"+orgmem_committee+"', " +	
				"orgmem_committee_position='"+orgmem_committee_position+"', " +	
				"orgmem_committee2='"+orgmem_committee2+"', " +	
				"orgmem_committee_position2='"+orgmem_committee_position2+"', " +	
				"orgmem_sub_position2='"+orgmem_sub_position2+"', " +	

				/*지구임원 겸직 추가*/ 
				"orgmem_committee3 ='"+orgmem_committee3 +"', " +	
				"orgmem_committee_position3 ='"+orgmem_committee_position3 +"', " +	
				"orgmem_sub_position3 ='"+orgmem_sub_position3 +"', " +	
				"orgmem_committee_text3 ='"+orgmem_committee_text3 +"', " +	
				/*지구임원 겸직 추가*/ 

				"orgmem_work_duty='"+orgmem_work_duty+"', " +	
				"orgmem_product='"+orgmem_product+"', " +
				"orgmem_name_en='"+orgmem_name_en+"', " +
				"orgmem_name_han='"+orgmem_name_han+"', " +
				"orgmem_birth_month='"+orgmem_birth_month+"', " +
				"orgmem_email='"+orgmem_email+"', " +				 
				"organ_position='"+organ_position+"', " +
		 		"cap_eval_amount='"+cap_eval_amount+"', " +
		 		"local_rank='"+local_rank+"', " +
		 		"national_rank='"+national_rank+"', " +
				"remrk='"+remrk+"', " +
				"club_position_text='"+club_position_text+"', " +
		 		"orgmem_img='"+orgmem_img+"', " +
		 		"company_img1='"+company_img1+"', " +
		 		"company_img2='"+company_img2+"', " +
		 		"company_img3='"+company_img3+"', " +
		 		"company_img4='"+company_img4+"', " +
				"business_card='"+business_card+"', " +
				"post_num='"+post_num+"', " +
		 		"orgmem_homepage='"+orgmem_homepage+"', " +
		 		"create_id='"+create_name+"', " +
		 		"create_date=now(), " +
				"create_host='"+create_host+"', " +
				"orgmem_member='"+orgmem_member+"', " +
				"club_position='"+club_position+"', " +
				"club_position2='"+club_position2+"', " +
				"club_index='"+club_index+"', " +
				"org_grant='"+org_grant+"', " +
				"certificate1='"+certificate1+"', " +
				"certificate2='"+certificate2+"', " +
				"company_introduce='"+company_introduce+"', " +
				"link1='"+link1+"', " +
				"link2='"+link2+"', " +
				"club_position_second='"+club_position_second+"', " +
				"orgmem_committee_text='"+orgmem_committee_text+"', " +
				"priority= "+priority + " ," +
				"orgmem_area= '"+orgmem_area+"', " +
				"area_zone= '"+area_zone+"'," +
				"area_club= '"+area_club+"' " +
		 		"where orgmem_no=" + request.param("no");
	 }
	 
	async.series({
		one : function(callback){
			console.log("sql == " + sql);
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					if(request.param("memberImg") == undefined && request.files.memberImg.name != "") {
						 
						var orgpath = "";
						if(use_os_falg) {
							orgpath = path + "\/file\/member\/" + orgmem_img;		//파일업로드 경로
						} else { 
							orgpath = path + "\\file\\member\\" + orgmem_img;		//파일업로드 경로
						}
						
						//파일을 동기적으로 사용(기본으로 비동기적)
						var data = fs.readFileSync(memberImg_path);
						fs.writeFileSync(orgpath, data); 
					}

					if(mode=="insert"){
						var select_sql = "select max(orgmem_no) as orgmem_no from orgmember";
						console.log("select_sql == " + select_sql);
						db.query(select_sql, function(error, max_result){
							if(error){
								response.send(error);
							}else{
								orgmem_no = max_result[0].orgmem_no;
								callback(null, null);
							}
						});	
					}else{
						callback(null, null);
					}
				}
			});				 
		},
		two : function(callback){
			if(officer_arr != ""){
				
				var officer_sql = "";
				var officer = officer_arr.split("@");
				var sub_officer = sub_officer_arr.split("@");
				var position = position_arr.split("@");
				
				for(var i = 0 ; i < officer.length; i++){
					officer_sql = "insert into orgmember_officer(" +
					"orgmem_no, officer_code, sub_officer_code, position_code, create_id, create_date, create_host)" +
					"values('" + orgmem_no +  
					"', '" + officer[i] + 
					"', '" + sub_officer[i] + 
					"', '" + position[i] + 
					"', '" + create_id + 
					"', now() " + 
					", '" + create_host + "')";
					
					console.log("officer_sql::"+officer_sql);
					
					db.query(officer_sql, function(error, results){
						if(error){
							console.log("admin/web/orgm_save/officer/error===", officer_sql);
							response.send("fail");
						} 
					});						
				}
			}
			
			callback(null, null);
		}
	}, function(error, result){
		response.writeHead(200, {
			'Content-type': 'text/html; charset=utf-8'
		});
		response.end('<script>opener.document.writehtm.submit(); window.close();</script>');
	});	 
};
