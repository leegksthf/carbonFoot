var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	var ad_id = request.session.ad_id;
	var sql = "";
	
	sql = "select '휴대번호' as send_title, concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) as send_number from orgmember where orgmem_no = (select orgmem_no from admin_mngt where ad_id='"+ad_id+"') \n";
	sql += "union all \n";
	sql += "select '대표번호' as send_title, repre_number as send_number from repre_number";
	console.log("sql == " + sql);
	
	db.query(sql, function(error, result){
		if(error){
			console.log("error");
			response.send(error);
		}else{
			if(result.length == 0){
				response.send("error");
			}else{
				response.send(result);
			}	
		}
	});
}