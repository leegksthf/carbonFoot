var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);

	var org_sql ="select 1 from dual"; 
	var century = request.param("century")==undefined ? "" : request.param("century");
	fs.readFile("./views/user/intro/place.html", "utf-8", function(error, data){
		db.query(org_sql, function(error, org_results){			
			response.send(ejs.render(layout.include("app_user", data), {
				connectorNo : connectorNo,
				menuNum : 0,
				century:century
			})); 
		});
	}); 
};
