var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	
	fs.readFile("./views/user/calendar/calendar.html", "utf-8", function(error, data){
		response.send(ejs.render(layout.include("app_user", data), {
			connectorNo : connectorNo,
			menuNum:1
		}));
	}); 
};