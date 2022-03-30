var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var db = require("../custom_module/DB_config.js").connect;
var sql = "";
var lms_title = "[로타리클럽]";
var ums_key = "dmms_mmate";

exports.send = function (receive_number, sender_number, msg){
	console.log("receive_number == " + receive_number);
	console.log("sender_number == " + sender_number);
	console.log("msg == " + msg);
	
	if(receive_number!="" && sender_number!="" && msg!="") {
		var brd_titleByteLength = 0;
		brd_titleByteLength = (function(s,b,i,c){
			for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
			return b
		})(msg);
		
		if(brd_titleByteLength>80) { // LMS 장문
			sql = "insert into flash21_ums.MMS_MSG \n";
			sql += "(subject, phone, callback, status, reqdate, msg, file_cnt, file_path1, type, etc1) \n";
			sql += "values \n";
			sql += "('"+lms_title+"', '"+receive_number+"', '"+sender_number+"', '0', now(), '"+msg+"', '0', '' ,'0', '"+ums_key+"')";
		} else { // SMS 단문
			sql = "insert into flash21_ums.SC_TRAN \n";
			sql += "(tr_senddate, tr_sendstat, tr_msgtype, tr_phone, tr_callback, tr_msg, tr_etc1) \n";
			sql += "values \n";
			sql += "(now(), '0', '0', '"+receive_number+"', '"+sender_number+"', '"+msg+"', '"+ums_key+"')";
		}
		
		console.log("sms.send sql="+sql);
		
		db.query(sql, function(error, results){
			if(error) {
				console.log("sms.send error="+error);
			} else {
				console.log("sms.send results="+results);
			}
		});
	}
	
}