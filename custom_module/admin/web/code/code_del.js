var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener =  function(request, response){
	
	var code_group = request.param("search_code_group");
	var code = request.param("code");
	var mode = request.param("mode");
	
	var qry = "";
	
	qry += "delete from code 	\n";
	qry += "where 	\n";
	console.log(mode);
	if(mode=="parent"){
		qry += "code_group = '" + code_group + "'	\n";
	}else if(mode=="child"){
		qry += "code_group = '" + code_group + "'	\n";
		qry += "and code = '" + code + "'	\n";
	}
	qry += "and code_mode = '" + mode + "'	\n";
		
	console.log(qry);
	
	db.query(qry, function(error, results){
		console.log(code_group,"2222");
		console.log(mode,"2222");
		if(mode == "parent"){
			response.redirect('/admin/web/code_list');
		}else if(mode=="child"){
			response.redirect('/admin/web/code_list_child?mode=child&search_code_group='+code_group);
		}
	});

}

	
