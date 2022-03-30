var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var ad_user = request.session.ad_id;
	var search_code_group = request.param("search_code_group");
	var code_group = request.param("code_group");
	var code = request.param("code");
	var code_name = request.param("code_name");
	var code_order = request.param("code_order")==null ?  '' :request.param("code_order");
	var mode = request.param("mode")==null ? "parent" : request.param("mode");
	var save_mode = request.param("save_mode")==null ? "parent" : request.param("save_mode");
	
	var wrk_ip = request.connection.remoteAddress;
	var qry = "";
	if(save_mode == 'write'){
		qry += "insert into code 	\n";
		qry += "(				 	\n";
		qry += "code_group,            \n";
		qry += "code,            \n";
		qry += "code_name,          \n";
		qry += "code_mode,          \n";
		qry += "code_order,         \n";
		qry += "ad_create_id,       \n";
		qry += "ad_create_date,     \n";
		qry += "ad_create_host     \n";
		qry += ") values ( 			\n";
		
		qry +=  "'" + code_group +  "', \n";
		qry +=  "'" + code +  "', \n";
		qry +=  "'" + code_name +  "', \n";
		qry +=  "'" + mode +  "', \n";
		qry +=  "'" + code_order + "', \n";
		qry += "'" + ad_user + "',   \n";
		qry += "now(),   \n";
		qry += "'" + wrk_ip + "'   \n";
		qry += ") 					\n";
	}else if(save_mode == 'modify'){
		qry += "update code set";
		qry += "code_name = " + "'"+code_name+"'";
		qry += "code_order = " + "'"+code_order+"'";
	}
	console.log(qry);
	
	db.query(qry, function(error, results){
		/*if(mode == "parent"){
			response.redirect('/admin/web/code_list');
		}else{
			response.redirect('/admin/web/code_list_child?mode=child&search_code_group='+search_code_group);
		}*/
		response.writeHead(200, {
			'Content-type': 'text/html; charset=utf-8'
		});
		response.end('<script> window.opener.document.location.href = window.opener.document.URL; window.close();</script>');
	});

}

	
