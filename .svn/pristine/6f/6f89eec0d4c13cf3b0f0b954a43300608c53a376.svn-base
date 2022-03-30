var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var code_group = request.param("code_group");
	var code = request.param("code");
	var mode = request.param("mode");
	
	var qry = "";
	
	qry += "select  count(*) as cnt from  code	\n";
	qry += "where 	\n";
	if(mode=="parent"){
		qry += "code_group = '"+code_group+"' \n";
		
	}else if(mode=="child"){
		qry += "code_group = '"+code_group+"' \n";
		qry += "and code = '"+code+"' \n";
	}
		
	console.log(qry);
	
	db.query(qry, function(error, results){
		console.log("results[0].cnt" +  results[0].cnt);
		
		var chk = results[0].cnt > 0 ? "fail" : "success"; 
		response.send(chk);
	});

}

	
