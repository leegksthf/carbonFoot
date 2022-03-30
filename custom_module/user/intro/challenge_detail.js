var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	var century = request.param("century")==undefined ? "" : request.param("century");
	var org_sql ="select 1 from dual"; 
	
	fs.readFile("./views/user/intro/challenge_detail.html", "utf-8", function(error, data){
		db.query(org_sql, function(error, org_results){			
			response.send(ejs.render(layout.include("app_user_footer", data), {
				connectorNo : connectorNo,
				menuNum : 2,
				century:century
			})); 
		});
	}); 
};
