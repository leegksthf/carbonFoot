var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	var search_name = request.param("search_name");
	
	async.series({
		one : function(callback){
			sql = "select count(1) as cnt from orgmember where orgmem_name like '%"+search_name+"%'";
			console.log("sql == " + sql);
			db.query(sql, function(error, results){
				if(error){
					response.send(error);
				}else{
					one_results_length = results[0].cnt;
					callback(null, results);	
				}
			});				 
		},
		two : function(callback){
			if(one_results_length == 0) {
				response.send("error");
			} else {
				sql = "select orgmem_no, orgmem_name, concat(orgmem_phone1, '-', orgmem_phone2, '-', orgmem_phone3) as orgmem_phone, orgmem_company_name from orgmember where orgmem_name like '%"+search_name+"%'";
				console.log("sql == " + sql);
				db.query(sql, function(error, results){
					if(error){
						response.send(error);
					}else{
						//callback(null, results[0].random_number);	
						callback(null, results);
					}
				});				 
			}
		}
	}, function(error, result){
		if(result.one.length == 0){
			response.send("error");
		}else{
			response.send(result.two);
		}
	});
}