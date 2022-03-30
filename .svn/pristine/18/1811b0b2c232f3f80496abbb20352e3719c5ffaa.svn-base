var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var sql =  "";
var db = require("../../../DB_config.js").connect;

exports.listener = function(request, response){

	var orgmem_phone1 = request.param("orgmem_phone1");
	var orgmem_phone2 = request.param("orgmem_phone2");
	var orgmem_phone3 = request.param("orgmem_phone3");
	var orgmem_no = request.param("orgmem_no");
	var mode = request.param("mode");
	
	console.log("orgmem_no==" + orgmem_no);
	console.log("mode==" + mode);
	
	var orgmember_result = false;
	
	async.series({
		one : function(callback){
			// 회원테이블의 전화번호를 체크한다.
			sql = "select count(1) as cnt from orgmember \n";
			sql += "where orgmem_phone1 = '" + orgmem_phone1 + "'\n"; 
			sql += "and orgmem_phone2 = '" + orgmem_phone2 + "'\n"; 
			sql += "and orgmem_phone3 = '" + orgmem_phone3 + "'\n";
			if(mode == "modify"){
				sql += "and orgmem_no != " + orgmem_no + " \n";
			}
			console.log("one_SQL : " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					console.log("[오류] 회원정보 전화번호  CASE 1");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "[오류] 회원정보 전화번호 CASE 1"
					});
					response.send(json);
				}else{
					console.log("one_SQL results[0].cnt == " + results[0].cnt);

					if(results[0].cnt>0) orgmember_result = true;
					callback(null, results);
				}
			});				 
		}
	}, function(error, result){
		if(error) {
			console.log("모든 task 종료 후 에러");
			var json = JSON.stringify({ 
				result : false,
				result_msg : "[오류] 인증 CASE"
			});
			response.send(json);
		} else {
			console.log("orgmember_result == " + orgmember_result);
			
			if(orgmember_result) {
				console.log("[fail] Final CASE 3-1");
				var json = JSON.stringify({ 
					result : false,
					result_msg : "등록된 회원의 휴대번호와 중복된 번호입니다."
				});
				response.send(json);
			} else {
				console.log("[success] Final CASE");
				var json = JSON.stringify({ 
					result : true,
					result_msg : "중복된 휴대번호가 존재하지 않습니다."
				});
				response.send(json);
			}
		}
	});
}