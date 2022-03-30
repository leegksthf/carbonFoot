var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var ad_id = request.param("ad_id");
	var ad_pw = request.param("ad_pw");
	var ad_nm = request.param("ad_nm");
	var mode = request.param("mode");
	var orgmem_no = request.param("orgmem_no");
	var wrk_ip = request.connection.remoteAddress;
	var create_id = request.session.ad_id;
	
	var qry = "";

	if(mode == 'write'){
		qry += "insert into admin_mngt 	\n";
		qry += "(	        		\n";
		qry += "   orgmem_no,	        \n";
		qry += "   ad_id,	        \n";
		qry += "   ad_pw,	        \n";
		qry += "   ad_grant,	   	\n";
		qry += "   create_id,	\n";
		qry += "   create_date,	\n";
		qry += "   create_host	\n";
		qry += ") values (          \n";
		qry += "'" + orgmem_no + "',   \n";
		qry += "'" + ad_id + "',   \n";
		qry += "BASE64_ENCODE('" + ad_pw + "'),   \n";
		qry += "0,   \n";
		qry += "'" + create_id + "',   \n";
		qry += "now(),   \n";
		qry += "'" + wrk_ip + "'   \n";
		qry += ") \n";
	}else if(mode =='modify'){
		qry += "update admin_mngt set \n";
		qry += "ad_pw = BASE64_ENCODE('"+ad_pw+"') \n";
		qry += "where \n";
		qry += "ad_id = '" + ad_id + "' \n";
	}
	
	console.log(qry);
	
	db.query(qry, function(error, results){
		 response.writeHead(200, {
		        'Content-type': 'text/html; charset=utf-8'
		    });
		  response.end('<script>opener.document.adminForm.submit(); window.close();</script>');
	});

}

	
