var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;
var sql = "";

exports.listener = function(request, response){

	var key_num =  request.param("key_num") == undefined ? "" : request.param("key_num");
	var push_url =  request.param("push_url") == undefined ? "" : request.param("push_url");
	var key_num_flag = false;
	var final_date_update_flag = false;
	
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
			// 토큰정보가 존재할때, push테이블의 마지막 접속일을 갱신한다.
			// 조건 : 토큰정보가 유효해야한다.
			
			if(key_num_flag) {
				sql = "update push set final_date=now() where key_num='"+key_num+"'";
				
				db.query(sql, function(error, results){
					if(error){
						console.log("사용자 앱정보의 마지막접속일을 갱신할때 오류가 발생되었습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "사용자 앱정보의 마지막접속일을 갱신할때 오류가 발생되었습니다."
						});
						response.send(json);
					}else{
						if(results.affectedRows == 1) {
							final_date_update_flag = true;
							callback(null, results);
						} else if(results[0].certification_time_result == 0) {
							console.log("사용자 앱정보의 마지막접속일을 갱신하지 못했습니다.");
							var json = JSON.stringify({ 
								result : false,
								result_msg : "사용자 앱정보의 마지막접속일을 갱신하지 못했습니다."
							});
							response.send(json);
						}
					}
				});
			}
		},
		three : function(callback) {
			if(final_date_update_flag) {
				// 마지막접속일자를 갱신하였으면 쿠키에 회원번호와 이름을 설정한다.
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
							response.cookie("no", results[0].orgmem_no);
							response.cookie("name", results[0].orgmem_name);
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
			if(push_url != "") {
				response.redirect(push_url);
			} else {
				response.redirect('/');
			}
		}
	});
}