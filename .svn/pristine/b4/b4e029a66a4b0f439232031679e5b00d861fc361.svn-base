var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var db = require("../custom_module/DB_config.js").connect;

exports.action=function(request, response){
	var type = request.param("type");
	
	var sql="select * from app_version where type = '"+type+"' ";
	console.log("sql : ", sql);
	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}
		else{
			if(results.length > 0){
				if(type!="ios"){
					response.send(results[0].version);
				}else {
					var db_version  = Number(results[0].version);
					var json = JSON.stringify({ 
						result : true,
						result_msg : results[0].version,
						db_version : db_version
					});
					
					response.send(json);
				}

				
			}else{
				if(type!="ios"){
					response.send("fail");
				}else {
					var json = JSON.stringify({ 
						result : true,
						result_msg : "error"
					});
				}
			}
		}
	});
};
