var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var LOCK_VALUE = request.param("LOCK_VALUE") == undefined ? null : request.param("LOCK_VALUE");
	var CHKED_ARRY = request.param("CHKED_ARRY") == undefined ? null : request.param("CHKED_ARRY");
	
	var SQL = "update orgmember set orgmem_disp_yn = '"+LOCK_VALUE+"' where orgmem_no in (" +  CHKED_ARRY + ")";
		
	console.log("SQL :: " + SQL);
	 
	 db.query(SQL, [], function(error, results){
		 if(error) {
			 console.log(error);
			 var json = JSON.stringify({ 
						result : false,
						result_msg : "데이터 처리과정에서 오류가 발생했습니다.",
						result_log : error
			 });
			 response.send(json);
		 } else {
			 var json = JSON.stringify({ 
						result : true,
						result_msg : "정상적으로 처리되었습니다."
			 });
			 response.send(json);
		 }
	 });
};