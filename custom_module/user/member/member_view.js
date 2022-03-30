var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	
	var mngt_no = request.param("orgmem_no");
	var sql = " select * \n"	+
	// var sql = "select " +	
	// 	" orgmem_no,	\n" +
	// 	" orgmem_name,	\n" +
	// 	" orgmem_birth_year,	\n" +
	// 	" orgmem_company_name,	\n" +
	// 	" company_img1,	\n" +
	// 	" company_img2,	\n" +
	// 	" company_img3,	\n" +
	// 	" company_img4,	\n" +
	// 	" business_card,	\n" +
	// 	" company_introduce,	\n" +
	// 	// " orgmem_address_home,	\n" +
	// 	// " orgmem_address_work,	\n" +
	// 	" orgmem_work_duty,	\n" +
	// 	// " orgmem_career,	\n" +
	// 	" orgmem_phone1,	\n" +
	// 	" orgmem_phone2,	\n" +
	// 	" orgmem_phone3,	\n" +
	// 	" concat(orgmem_phone1, '-', orgmem_phone2, '-', orgmem_phone3) as orgmem_phone, \n" +
	// 	" orgmem_email,	\n" +
	// 	" orgmem_img,	\n" +
	// 	// " orgmem_seqNo,	\n" +
	// 	" date_format(create_date, '%Y.%m.%d') as c_date,	\n" +
	// 	// " orgmem_keyword,	\n" +
	// 	" ifnull(getCodeName('orgmem_orgMaeil',orgmem_position),'') as orgmem_position,	\n" +
	// 	// " orgmem_memberYn,	\n" +
	// 	" create_id,	\n" +
	// 	" create_date,	\n" +
	// 	" create_host	\n" +
	" from orgmember where orgmem_no = " + mngt_no;	
		 //" from orgmember where orgmem_no = 108";	
	
	console.log("member_view sql ==", sql);
	
	db.query(sql, function(error, results){
		response.send({
			connectorNo : connectorNo,
			data : results
		});
	});
};
