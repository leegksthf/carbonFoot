var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var ad_id = request.param("ad_id");
	var qry = "";
	
	qry += "select count(*) as cnt from admin_mngt 	\n";
	qry += "where 	\n";
	qry += "ad_id = '" + ad_id + "'	\n";
	
	db.query(qry, function(error, result){
		var return_value = "error";
		
		if(result[0].cnt == "0") return_value = "success";
		
		response.send(return_value);
	});

}