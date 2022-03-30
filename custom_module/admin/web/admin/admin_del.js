var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var ad_user = '';
	var ad_id = request.param("ad_id");
	var ad_pw = request.param("ad_pw");
	var mode = request.param("mode");
	var wrk_ip = request.connection.remoteAddress;
	
	var qry = "";
	
	qry += "delete from admin_mngt 	\n";
	qry += "where 	\n";
	qry += "ad_id = '" + ad_id + "'	\n";
		
	console.log(qry);
	
	db.query(qry, function(error, results){
		response.redirect('/admin/web/admin_list');
	});

}

	
