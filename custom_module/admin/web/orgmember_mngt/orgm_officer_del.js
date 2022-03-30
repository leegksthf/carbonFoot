var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var seq = request.param("seq");	
	
	var sql = "delete from orgmember_officer where seq = " + seq;
	
	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			response.send("success");
		}
	});
};
