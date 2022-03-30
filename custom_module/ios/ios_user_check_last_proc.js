var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;
var sql = "";

exports.listener = function(request, response){

	var orgmem_no =  request.param("orgmem_no") == undefined ? "" : request.param("orgmem_no");
	var orgmem_phone =  request.param("orgmem_phone") == undefined ? "" : request.param("orgmem_phone");
	var certification_num =  request.param("certification_num") == undefined ? "" : request.param("certification_num");
	var certification_result_flag = false;
	var certification_time_result_flag = false;
	var push_reg_flag = false;
	
	console.log("ios 인증 마지막");
	console.log("회원번호 == " + orgmem_no);
	console.log("회원휴대번호 == " + orgmem_phone);
	console.log("인증번호 == " + certification_num);
	
	async.series({
		one : function(callback) {
			// 인증번호가 유효한지 조회한다.
			
			sql = "select count(1) as certification_cnt from orgmember where orgmem_no="+orgmem_no+" and certification_num='"+certification_num+"'";
			console.log("ios_user_check_last_proc [one_sql] == " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					console.log("[오류] 인증처리 CASE 1");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "[오류] 인증처리 CASE 1"
					});
					response.send(json);
				}else{
					console.log("certification_cnt == " + results[0].certification_cnt);
					if(results[0].certification_cnt==1) {
						certification_result_flag = true;
						callback(null, results);
					} else if(results[0].certification_cnt==0) {
						console.log("인증번호가 유효하지 않습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "인증번호가 유효하지 않습니다."
						});
						response.send(json);
					}
				}
			});				 
		},
		two : function(callback) {
			// 회원번호와 인증번호를 회원테이블에서 조회한다.
			// 조건1 : 인증번호가 유효해야한다.
			// 조건2 : 요청한 시간이 인증유효시간에 포함되는지 안되는지 판단한다.
			// Query결과 : 유효하면 1, 유효하지 않으면 0
			
			if(certification_result_flag) {
				sql = "select \n";
					sql += "if(a.now_dttm < a.certification_dttm, 1, 0) as certification_time_result \n";
				sql += "from ( \n";
				sql += "select UNIX_TIMESTAMP(certification_dttm) as certification_dttm, UNIX_TIMESTAMP(now()) as now_dttm from orgmember where orgmem_no="+orgmem_no+" and certification_num='"+certification_num+"' \n";
				sql += ") as a";
			}
			console.log("ios_user_check_last_proc [two_sql] == " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					console.log("[오류] 인증처리 CASE 2");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "[오류] 인증처리 CASE 2"
					});
					response.send(json);
				}else{
					if(results[0].certification_time_result == 1) {
						certification_time_result_flag = true;
						callback(null, results);
					} else if(results[0].certification_time_result == 0) {
						console.log("입력하신 인증번호의 유효시간이 종료되었습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "입력하신 인증번호의 유효시간이 종료되었습니다."
						});
						response.send(json);
					}
				}
			});
		},
		three : function(callback) {
			console.log("certification_result_flag == " + certification_result_flag);
			console.log("certification_time_result_flag == " + certification_time_result_flag);
			
			if(certification_result_flag && certification_time_result_flag) {
				// 인증번호와 인증번호의 유효시간을 모두 만족하면 앱정보 테이블(push)에 Insert를 한다.
				// SQL은 키가 중복이 되면 UPDATE를 한다.
				var devToken =  request.param("devToken") == undefined ? "" : request.param("devToken");
				var deviceModel =  request.param("deviceModel") == undefined ? "" : request.param("deviceModel");
				var deviceVersion =  request.param("deviceVersion") == undefined ? "" : request.param("deviceVersion");
				
				sql = "insert into push \n";
				sql += "(phone_num, key_num, type, version, device, first_date, final_date, orgmem_no, popup_yn) \n";
				sql += "values \n";
				sql += "('"+orgmem_phone+"', '"+devToken+"', 'ios', '"+deviceVersion+"', '"+deviceModel+"', now(), now(), "+orgmem_no+", 'y') \n";
				sql += "on duplicate key \n";
				sql += "update phone_num='"+orgmem_phone+"', key_num='"+devToken+"', type='ios', version='"+deviceVersion+"', device='"+deviceModel+"', final_date=now(), popup_yn='y'";
				
				console.log("sql = " + sql);
				
				db.query(sql, function(error, results){
					if(error){
						console.log("[오류] 인증처리 CASE 3");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "[오류] 인증처리 CASE 3"
						});
						response.send(json);
					//}else if(results.affectedRows==1) {
					} else {
						console.log("aaaaaaaaaaaa");
						push_reg_flag = true;
						callback(null, results);
					}
				});
			}
		}
	}, function(error, result){
		if(error) {
			console.log("모든 task 종료 후 에러");
			var json = JSON.stringify({ 
				result : false,
				result_msg : "[오류] 인증처리 CASE"
			});
			response.send(json);
		} else {
			console.log("모든 task 종료 후 성공");
			
			if(push_reg_flag) {
				var json = JSON.stringify({ 
					result : true,
					result_msg : "인증이 완료되었습니다."
				});
				response.send(json);
			} else {
				var json = JSON.stringify({ 
					result : false,
					result_msg : "인증은 완료되었으나, 내부오류가 발생되었습니다."
				});
				response.send(json);
			}
		}
	});
}