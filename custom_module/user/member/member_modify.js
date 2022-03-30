var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../DB_config.js").connect;
var osModule = require('os');

exports.listener=function(request, response){
	var use_os_falg = false;
	if(osModule.type()=='Linux') use_os_falg = true;

	var orgmem_company_name =  request.param("orgmem_company_name") == undefined ? '' : request.param("orgmem_company_name");	
	// 회원명
	var orgmem_name =  request.param("orgmem_name");

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

	//
	var cap_eval_amount = request.param("cap_eval_amount") == undefined ? '' : request.param("cap_eval_amount");
	var local_rank = request.param("local_rank") == undefined ? '' : request.param("local_rank");
	var national_rank = request.param("national_rank") == undefined ? '' : request.param("national_rank");
	
	// 비고
	var remrk = request.param("remrk") == undefined ? '' : request.param("remrk");

	
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
	

	var officer_arr = request.param("officer_arr") == undefined ? '' : request.param("officer_arr");
	var sub_officer_arr = request.param("sub_officer_arr") == undefined ? '' : request.param("sub_officer_arr");
	var position_arr = request.param("position_arr") == undefined ? '' : request.param("position_arr");
	
	var create_id = request.session.ad_id;
	var create_host = request.connection.remoteAddress;
	 
	var extensionIndex = "";
	var extension = "";
	var date = new Date();
	var day = date.toFormat('YYYYMMDDHHMISS');
	var pathlast = __dirname;
	var pathIndex = "";
	

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
	 
		sql = "update orgmember set " +
		"orgmem_company_name='"+orgmem_company_name+"', " +
		"orgmem_company_name_cho=fn_choSearch('"+orgmem_company_name+"'), " +
		"orgmem_regist_num='"+orgmem_regist_num+"', " + 
		//  "orgmem_name='"+orgmem_name+"', " +
		"orgmem_name_cho=fn_choSearch('"+orgmem_name+"'), " +
		"orgmem_lunar='"+orgmem_lunar+"', \n " +
		"orgmem_birth_year='"+orgmem_birth_year+"', \n " +
		"orgmem_birth_month='"+orgmem_birth_month+"', \n " +
		"orgmem_birth_day='"+orgmem_birth_day+"', \n " +
		//  "orgmem_phone1='"+orgmem_phone1+"', " +
		//  "orgmem_phone2='"+orgmem_phone2+"', " +
		//  "orgmem_phone3='"+orgmem_phone3+"', " +
		 "orgmem_tel1='"+orgmem_tel1+"', " +
		 "orgmem_tel2='"+orgmem_tel2+"', " +
		 "orgmem_tel3='"+orgmem_tel3+"', " +
		 "orgmem_fax1='"+orgmem_fax1+"', " +
		 "orgmem_fax2='"+orgmem_fax2+"', " +
		"orgmem_fax3='"+orgmem_fax3+"', " +				
		 "zip_code='"+zip_code+"', " +
		"orgmem_address='"+orgmem_address+"', " +
		"orgmem_branch='"+orgmem_branch+"', " +	
		"orgmem_position='"+orgmem_position+"', " +	
		"orgmem_sub_position='"+orgmem_sub_position+"', " +	
		"orgmem_committee='"+orgmem_committee+"', " +	
		"orgmem_committee_position='"+orgmem_committee_position+"', " +	
		"orgmem_committee2='"+orgmem_committee2+"', " +	
		"orgmem_committee_position2='"+orgmem_committee_position2+"', " +	
		"orgmem_work_duty='"+orgmem_work_duty+"', " +	
		"orgmem_product='"+orgmem_product+"', " +
		"orgmem_email='"+orgmem_email+"', " +				 
		"organ_position='"+organ_position+"', " +
		 "cap_eval_amount='"+cap_eval_amount+"', " +
		 "local_rank='"+local_rank+"', " +
		 "national_rank='"+national_rank+"', " +
		 "remrk='"+remrk+"', " +
		 "orgmem_img='"+orgmem_img+"', " +
		 "company_img1='"+company_img1+"', " +
		 "company_img2='"+company_img2+"', " +
		 "company_img3='"+company_img3+"', " +
		 "company_img4='"+company_img4+"', " +
		 "business_card='"+business_card+"', " +
		 "orgmem_homepage='"+orgmem_homepage+"', " +
		 "create_id='"+create_id+"', " +
		 "create_date=now(), " +
		"create_host='"+create_host+"', " +
		"orgmem_member='"+orgmem_member+"', " +

		"certificate1='"+certificate1+"', " +
		"certificate2='"+certificate2+"', " +
		"company_introduce='"+company_introduce+"', " +
		"link1='"+link1+"', " +
		"link2='"+link2+"', " +
		"priority= "+priority + " " +
		 "where orgmem_no=" + request.param("no");
		 //"where orgmem_no= 108";
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
					
					// if(mode=="insert"){
					// 	var select_sql = "select max(orgmem_no) as orgmem_no from orgmember";
					// 	console.log("select_sql == " + select_sql);
					// 	db.query(select_sql, function(error, max_result){
					// 		if(error){
					// 			response.send(error);
					// 		}else{
					// 			orgmem_no = max_result[0].orgmem_no;
					// 			callback(null, null);
					// 		}
					// 	});	
					// }else{
					// 	callback(null, null);
					// }
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
	
	 db.query(sql, [], function(error, results){
		 if(error){
			 console.log(error);
		 }else{
				response.send(true);
		 }
	 });
};
