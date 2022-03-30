var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../DB_config.js").connect;
var session = require("../../function/session.js");

exports.listener =  function(request, response){
	//var connectorNo = session.connectorNo(request);
	
	var table = "orgmember";
	var user_name = request.param("user_name");
	var phone_select = request.param("phone_select");
	var user_phoneNumber = request.param("user_phoneNumber");
	user_phoneNumber = phone_select + user_phoneNumber;
	var sql = "";
	var one_results_length = "";
	
	async.series({
		one : function(callback){
			sql = "select count(1) as cnt, orgmem_no, concat( replace(ifnull(orgmem_phone1, ''), '-', ''), replace(ifnull(orgmem_phone2, ''), '-', ''), replace(ifnull(orgmem_phone3, ''), '-', '') ) as orgmem_phone from orgmember where orgmem_name= '"+user_name+"' and concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) = '"+user_phoneNumber+"' group by orgmem_no, concat( replace(ifnull(orgmem_phone1, ''), '-', ''), replace(ifnull(orgmem_phone2, ''), '-', ''), replace(ifnull(orgmem_phone3, ''), '-', '') )";
			console.log("sql == " + sql);
			db.query(sql, function(error, results){
				if(error){
					console.log("사용자가 존재하지 않습니다.");
					var json = JSON.stringify({ 
						result : false,
						result_msg : "사용자가 존재하지 않습니다."
					});
					response.send(json);
				}else{
					one_results_length = results[0].cnt;
					console.log("oegmem_no == " + results[0].orgmem_no);
					callback(null, results);	
				}
			});				 
		},
		two : function(callback){
			console.log("one.length == " + one_results_length);
			if(one_results_length == 0) {
				response.send("error");
			} else {
				sql = "select cast(concat(Floor(Rand()*10), Floor(Rand()*10), Floor(Rand()*10), Floor(Rand()*10), Floor(Rand()*10), Floor(Rand()*10)) as char) as random_number from dual";
				console.log("sql == " + sql);
				db.query(sql, function(error, results){
					if(error){
						console.log("인증번호를 생성하지 못했습니다.");
						var json = JSON.stringify({ 
							result : false,
							result_msg : "인증번호를 생성하지 못했습니다."
						});
						response.send(json);
					}else{
						console.log("results[0].random_number == " + results[0].random_number);
						//callback(null, results[0].random_number);	
						callback(null, results);
					}
				});				 
			}
		}
	}, function(error, result){
		if(result.one.length == 0){
			console.log("현재 프로그램에 문제가 발생되었습니다.");
			var json = JSON.stringify({ 
				result : false,
				result_msg : "현재 프로그램에 문제가 발생되었습니다."
			});
			response.send(json);
			
		}else{
			console.log("등록자");
			//response.writeHead(200, {"Content-Type": "application/json"});
			var json = JSON.stringify({ 
				result : true,
				orgmem_no : result.one[0].orgmem_no,
				orgmem_phone : result.one[0].orgmem_phone,
				certification_num : result.two[0].random_number
			});
			response.send(json);
			//console.log("result.two == " + result.two[0].random_number);
			//response.send(result.two);
		}
	});
}