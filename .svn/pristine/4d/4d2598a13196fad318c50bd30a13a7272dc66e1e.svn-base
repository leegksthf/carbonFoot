var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
var session = require("../../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	var sql = "";
	
	sql +="select cal_id, title, start, end, backgroundColor, textColor, allDay ";
	sql +="from calendar";

	console.log("sql : " + sql);			

	fs.readFile("./views/admin/web/calendar/calendar.html", "utf-8", function(error, data){
		db.query(sql, function(error, results){
			response.send({
				connectorNo : connectorNo,
				db_data : results
			}); 
		});
	}); 
};
