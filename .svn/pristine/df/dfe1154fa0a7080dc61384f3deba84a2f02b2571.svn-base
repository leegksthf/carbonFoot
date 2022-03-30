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
	var area_zone_type = request.param("area_zone_type")==undefined ? "" : request.param("area_zone_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var sql ="select 1 from dual";
	var century = request.param("century")==undefined ? "" : request.param("century");
	code.selectBoxList("position", "", function (err, position) {
		code.selectBoxList("branch", "", function (err, branch) {
			fs.readFile("./views/user/member/club_list.html", "utf-8", function(error, data){
				db.query(sql, function(error, results){
					response.send(ejs.render(layout.include("app_user", data), {
						connectorNo : connectorNo,
						search_type : search_type,
						search_text : search_text,
						num_type : num_type,
						area_zone_type : area_zone_type,
						menuNum:1,
						century:century
					})); 
				});
			}); 
		})
	});
};
