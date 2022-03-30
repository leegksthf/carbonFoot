var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");
var code = require("../../../function/codeMngt2.js");
exports.listener=function(request, response){
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var connectorNo = session.connectorNo(request);
	var num_type = request.param("num_type")==undefined ? "" : request.param("num_type");
	var club_type = request.param("club_type")==undefined ? "" : request.param("club_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var century = request.param("century")==undefined ? "" : request.param("century");
	var sql ="select 1 from dual";
code.selectBoxList("area_zone", "", function (err, area_zone) {
	fs.readFile("./views/user/member/members_list.html", "utf-8", function(error, data){
		db.query(sql, function(error, results){
			response.send(ejs.render(layout.include("app_user", data), {
				connectorNo : connectorNo,
				search_type : search_type,
				search_text : search_text,
				area_zone_code:area_zone,
				num_type : num_type,
				club_type : club_type,
				search_text : search_text,
				menuNum:2,
				century:century
			})); 
		});
	});
}); 
};
