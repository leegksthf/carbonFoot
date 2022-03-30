var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;
var sql = "";
var ums_key = "keca_daegu";

exports.listener = function(request, response){

	var orgmem_no =  request.param("orgmem_no") == undefined ? "" : request.param("orgmem_no");
	var receive_number =  request.param("receive_number") == undefined ? "" : request.param("receive_number");
	var certification_num =  request.param("certification_num") == undefined ? "" : request.param("certification_num");
	var update_result_flag = false;
	var repre_number_flag = false;
	
	console.log("회원번호 == " + orgmem_no);
	console.log("회원수신번호 == " + receive_number);
	console.log("인증번호 == " + certification_num);
	
	async.series({
		one : function(callback){
			// 인증번호와 인증번호 유효시간을 회원테이블에 업데이트를 한다.
			sql = "update orgmember set certification_num = '"+certification_num+"' \n";
			sql += ", certification_dttm = DATE_ADD(NOW(),INTERVAL 3 MINUTE) \n";
			sql += "where orgmem_no="+orgmem_no;
			console.log("sql == " + sql);
			
			db.query(sql, function(error, results){
				if(error){
					console.log("[오류] 인증 CASE 1");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "[오류] 인증 CASE 1"
					});
					response.send(json);
				}else{
					console.log("사용자정보 업데이트 여부 == " + results.affectedRows);
					if(results.affectedRows==1) {
						update_result_flag = true;
						callback(null, results);
					}
				}
			});				 
		},
		two : function(callback){
			// 문자 발송할 대표번호를 가져온다.
			sql = "select replace(repre_number, '-', '') as repre_number from repre_number";
			db.query(sql, function(error, results){
				if(error){
					console.log("[오류] 인증 CASE 2");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "[오류] 인증 CASE 2"
					});
					response.send(json);
				}else{
					if(results[0].repre_number == null && results.affectedRows==1) {
						console.log("[오류] 인증 CASE 2-1");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "[오류] 인증 CASE 2-1"
						});
						response.send(json);
					} else {
						repre_number_flag = true;
						console.log("발신 대표번호 == " + results[0].repre_number);
						callback(null, results);
					}
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
			console.log("update_result_flag == " + update_result_flag);
			console.log("repre_number_flag == " + repre_number_flag);
			
			if(update_result_flag && repre_number_flag) {
				// 사용자정보를 업데이트를 하고 대표번호를 가져왔을 경우에 사용자에게 문자를 전송한다.
				var msg = "[국제라이온즈협회] IOS 인증번호는 ["+certification_num+"] 입니다.";
				sql = "insert into flash21_ums.SC_TRAN \n";
				sql += "(tr_senddate, tr_sendstat, tr_msgtype, tr_phone, tr_callback, tr_msg, tr_etc1) \n";
				sql += "values \n";
				sql += "(now(), '0', '0', '"+receive_number+"', '"+result.two[0].repre_number+"', '"+msg+"', '"+ums_key+"')";
				
				//sql = "select 1 as temp from dual";
				
				console.log("sms_sql == " + sql);
				db.query(sql, function(error, results){
					if(error){
						console.log("[오류] 인증 CASE 3");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "[오류] 인증 CASE 3"
						});
						response.send(json);
					}else if(results.affectedRows==1) {
					//}else if(results[0].temp==1) {
						console.log("ums.affectedRows == " + results.affectedRows);
						console.log("완료~!");
						var json = JSON.stringify({ 
							result : true,
							result_msg : "인증번호가 발송되었습니다.",
							result_tag_textInput : "<input type='hidden' name='user_orgmem_no' value='"+orgmem_no+"'/><input type='text' name='user_certification_num' style='width:80%;' />",
							result_tag_buttonInput : "<input type='button' name='certification_num_clickBtn' value='인증번호 확인' class='btn_blue btn_round mt_20'/>"
						});
						response.send(json);
					}
				});
			}
		}
	});
}