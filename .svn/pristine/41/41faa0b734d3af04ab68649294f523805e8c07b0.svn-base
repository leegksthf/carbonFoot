var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;
var session = require("../../function/session.js");
var sql = "";

exports.listener = function(request, response){

	var key_num =  request.param("key_num") == undefined ? "" : request.param("key_num");
	var key_num_flag = false;
	var key_num_for_org_flag = false;
	
	console.log("최초 key_num == " + key_num);
	if(key_num!=null || key_num!="") {
		key_num = key_num.replace("<", "").replace(">", "").replace(/\s/gi, '');
	}
	console.log("변환 key_num == " + key_num);
	
	async.series({
		one : function(callback) {
			// 토큰정보가 저장되어 있는지 체크한다.
			
			sql = "select count(1) as cnt from push where key_num='"+key_num+"'";
			console.log("ios_get_info [one_sql] == " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					console.log("토큰정보를 가져올때 오류가 발생되었습니다.");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "토큰정보를 가져올때 오류가 발생되었습니다."
					});
					response.send(json);
				}else{
					console.log("cnt == " + results[0].cnt);
					if(results[0].cnt==1) {
						key_num_flag = true;
						callback(null, results);
					} else if(results[0].cnt==0) {
						console.log("토큰정보가 존재하지 않습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "토큰정보가 존재하지 않습니다."
						});
						response.send(json);
					}
				}
			});				 
		},
		two : function(callback) {
			// 토큰정보가 존재할때, json으로 회원번호, 회원명을 리턴한다.
			// 조건 : 토큰정보가 유효해야한다.
			
			if(key_num_flag) {
				sql = "select b.orgmem_no, b.orgmem_name \n";
				sql += "from \n";
				sql += "( \n";
					sql += "select orgmem_no from push \n";
					sql += "where key_num='"+key_num+"' \n";
				sql += ") a left outer join orgmember as b on a.orgmem_no = b.orgmem_no";
				console.log("ios_get_info [two_sql] == " + sql);
				
				db.query(sql, function(error, results){
					if(error){
						console.log("회원정보를 가져올때 오류가 발생되었습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "회원정보를 가져올때 오류가 발생되었습니다."
						});
						response.send(json);
					}else{
						if(results != null) {
							key_num_for_org_flag = true;
							callback(null, results);
						} else if(results[0].certification_time_result == 0) {
							console.log("사용자 정보가 존재하지 않습니다.");
							var json = JSON.stringify({ 
								result : false,
								result_msg : "사용자 정보가 존재하지 않습니다."
							});
							response.send(json);
						}
					}
				});
			}
			
		}
	}, function(error, result){
		if(error) {
			console.log("모든 task 종료 후 에러");
			var json = JSON.stringify({ 
				result : false,
				result_msg : "모든 task 종료 후 에러"
			});
			response.send(json);
		} else {
			if(key_num_for_org_flag) {

				var sql2 = "select * from orgmember where CONCAT(orgmem_phone1, orgmem_phone2, orgmem_phone3 ) = (select phone_num from push where key_num ='"+key_num+"')";
				console.log("sql 2 :::::::::::::" + sql2);
						db.query(sql2, function(error, user_result){
							if(user_result.length > 0){
							console.log("user_result ::::::::::" +user_result[0].orgmem_division);
							request.cookies.division = user_result[0].orgmem_division;
							response.cookie("division", user_result[0].orgmem_division);
							request.cookies.disp_yn = user_result[0].orgmem_disp_yn;
							response.cookie("disp_yn", user_result[0].orgmem_disp_yn);
							console.log(session.connectorDisp_yn(request));
							}
					var orgmem_name  ="";
					// if(request.cookies.disp_yn == 'N'){
					// 	orgmem_name += "(관리자)";
					// }
					if (user_result[0].orgmem_division == "admin"){
						orgmem_name += "(관리자)";
					}
					orgmem_name += result.two[0].orgmem_name;
						
					
					var json = JSON.stringify({ 
						result : true,
						orgmem_no : result.two[0].orgmem_no,
						orgmem_name : orgmem_name,
						result_msg : "처리가 완료되었습니다."
					});
					response.send(json);
				});
			} else {
				var json = JSON.stringify({ 
					result : false,
					result_msg : "처리는 완료되었으나, 내부오류가 발생되었습니다."
				});
				response.send(json);
			}
		}
	});
}