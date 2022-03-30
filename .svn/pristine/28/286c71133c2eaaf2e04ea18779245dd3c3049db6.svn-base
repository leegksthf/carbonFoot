var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var search_type = request.param("search_type")==undefined ? "" : request.param("search_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var officer_code = request.param("officer_code")==undefined ? "" : request.param("officer_code");
	var sub_officer_code = request.param("sub_officer_code")==undefined ? "" : request.param("sub_officer_code");
	var connectorNo = session.connectorNo(request);
	var num_type = request.param("num_type")==undefined ? "" : request.param("num_type");
	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	var century = request.param("century")==undefined ? "" : request.param("century");
	var sql ="select 1 from dual";
	fs.readFile("./views/user/member/member_officer_list.html", "utf-8", function(error, data){
		db.query(sql, function(error, results){
			response.send(ejs.render(layout.include("app_user", data), {
				connectorNo : connectorNo,
				search_type : search_type,
				search_text : search_text,
				officer_code : officer_code,
				sub_officer_code : sub_officer_code,
				num_type : num_type,
				search_text : search_text,
				menuNum:3,
				century:century
			})); 
		});
	}); 
};
