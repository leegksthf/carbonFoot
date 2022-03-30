var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../custom_module/DB_config.js").connect;
var page_navi = require("../function/board_page_navi.js");
var layout = require("../function/layout.js");
var session = require("../function/session.js");
//조직도, sms 발송, 채팅방 생성 공통 사용
exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request); //5555555 >>194
	var sql="";
	var view_cnt = request.param("view_cnt") == undefined ? 20 : request.param("view_cnt");
	var strlimit = request.param("strlimit") == undefined ? 0 : request.param("strlimit");
	var endlimit = request.param("endlimit") == undefined ? 20 : request.param("endlimit");
	var data_length = request.param("data_length") == undefined ? 20 : request.param("data_length");
	var cooki_phone = request.cookies.phone;

	sql =  "select * from (";
	sql += "select @RNUM := @RNUM + 1 as num, \n";
	sql += "a.*, \n";
	sql += "ifnull(getCodeName('orgmem_orgMaeil', a.orgmem_position),'') as position \n";
	sql += "from orgmember a, (SELECT @RNUM := 0 ) r \n";
	sql += "where 1=1 \n";
	if(connectorNo != '5555555')
		sql += " and orgmem_no != " + connectorNo + "\n";	//휴대전화 본인 사용자 정보를 제외
	sql += "order by a.orgmem_position asc, a.orgmem_name asc \n";
	sql += ") k";
	
	if(data_length < 20) {
		sql += " limit " + strlimit + ", " + data_length;
	} else {
		sql += " limit " + strlimit + ", " + endlimit;
	}
	
	var sel_sql = "select * from orgmember where orgmem_no=" + connectorNo; //기수관리자 확인(해당기수에게만 문자, 채팅 사용)
	console.log("쿼리==\n", sql);
	db.query(sql, function(error, results){
		db.query(sel_sql, function(error, result) {
			response.send({
				db_data : results,
				cooki_phone : cooki_phone,
				result : result
			}); 
		});
	});
};
