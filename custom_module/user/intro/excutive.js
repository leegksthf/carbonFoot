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
	var category = request.param('category') == null ? '' : request.param('category');
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var century = request.param("century")==undefined ? "" : request.param("century");

	var sql = "SELECT orgmem_name,orgmem_address,area_club FROM orgmember";


	
	console.log(sql);

	fs.readFile("./views/user/intro/executive.html", "utf-8", function(error, data){
		db.query(sql, function(error, org_results){			
			response.send(ejs.render(layout.include("app_user", data), {
				connectorNo : connectorNo,
				dbdata:JSON.org_results,
				menuNum : 4,
				category : category,
				search_text : search_text,
				century:century
			})); 
		});
	});
} 