var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var ad_user = request.session.ad_id;
	var search_code_group = request.param("search_code_group");
	var code_group = request.param("code_group");
	var code = request.param("code")==null ? '' : request.param("code");
	//if(code == null) code = '';
	var code_name = request.param("code_name");
	var code_order = request.param("code_order")==null ?  0 :request.param("code_order");
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
		qry += "update code set \n";
		qry += "code_name = " + "'"+code_name+"' \n";
		if(mode=='child'){
			qry += ", code_order = " + "'"+code_order+"' \n";
		}
		qry += "where \n";
		qry += "code_group = " + "'" + code_group + "'";
		if(mode=='child'){
			qry += " and code = " + "'" + code + "'";
		}
		qry += "and code_mode = '" + mode + "'";
	}
	console.log(qry);
	
	db.query(qry, function(error, results){
		response.writeHead(200, {
			'Content-type': 'text/html; charset=utf-8'
		});
		if(mode == "parent"){
			response.end('<script> window.opener.location = "/admin/web/code_list"; window.close();</script>');
		}else{
			response.end('<script> window.opener.location = "/admin/web/code_list_child?mode=child&search_code_group='+code_group+'"; window.close();</script>');
		}
		
		
	});

}

	
