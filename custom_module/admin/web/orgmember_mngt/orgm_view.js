var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var ad_grant = request.session.ad_grant;

	var mngt_no = request.param("number");

	var sql = "select " +
					" orgmem_no,	\n" +
					" orgmem_reg_no,	\n" +
					" orgmem_company_name,	\n" +
					" orgmem_name,	\n" +
					" orgmem_birth_year,	\n" +
					" orgmem_birth_month,	\n" +
					" orgmem_birth_day,	\n" +					
					" orgmem_phone1,	\n" +
					" orgmem_phone2,	\n" +
					" orgmem_phone3,	\n" +
					" orgmem_email,	\n" +
					" organ_position,	\n" +
					" ifnull((select code_name from code where code = if((select organ_position from orgmember where orgmem_no = "+mngt_no+")='',null,(select organ_position from orgmember where orgmem_no = "+mngt_no+"))),'') as organ_position_name, \n" +
					" orgmem_tel1,	\n" +
					" orgmem_tel2,	\n" +
					" orgmem_tel3,	\n" +
					" orgmem_fax1,	\n" +
					" orgmem_fax2,	\n" +
					" orgmem_fax3,	\n" +
					" company_img1,	\n" +
					" company_img2,	\n" +
					" company_img3,	\n" +
					" company_img4,	\n" +
					" business_card,	\n" +
					" orgmem_product, \n" +
					" certificate1,	\n" +
					" certificate2,	\n" +
					" link1,	\n" +
					" link2,	\n" +
					" priority, \n" +
					" org_grant, \n" +
					" company_introduce,	\n" +
					" orgmem_work_duty, \n" +
					" orgmem_area, \n" +
					" area_club, \n" +
					" area_zone, \n" +
					" zip_code,	\n" +
					" club_position_text,	\n" +
					// " ifnull((select code_name from code where code = (select orgmem_branch from orgmember where orgmem_no = "+mngt_no+")),'') as orgmem_position,	\n" +
					" orgmem_homepage, \n" + 
					" orgmem_address,	\n" +
					" format(cap_eval_amount, 0) as cap_eval_amount,	\n" +
					" format(local_rank, 0) as local_rank,	\n" +
					" format(national_rank, 0) as national_rank,	\n" +
					" remrk,	\n" +
					" orgmem_img,	\n" +
					" date_format(create_date, '%Y.%m.%d') as c_date,	\n" +
					" create_id,	\n" +
					" create_date,	\n" +
					" create_host	\n" +
				" from orgmember where orgmem_no = " + mngt_no;
	
	console.log(sql);
			
	
	fs.readFile("./views/admin/web/orgmember_mngt/orgm_viewForm.html", "utf-8", function(error, data){
		 
		db.query(sql, function(error, results){
			
			if(error){
				response.send("fail");
			}else{
			   response.send(ejs.render(layout.include("web_admin_popup", data), {
				   db_data : results,
				   menuNum: 0,
				   modivision:ad_grant
			   }));				 
			}
		});
	});
};
