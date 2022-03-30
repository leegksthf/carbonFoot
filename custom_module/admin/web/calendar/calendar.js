var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");

exports.listener=function(request, response){
	fs.readFile("./views/admin/web/calendar/calendar.html", "utf-8", function(error, data){
		response.send(ejs.render(layout.include("web_admin", data), {
			menuNum:4
		}));
	}); 
};