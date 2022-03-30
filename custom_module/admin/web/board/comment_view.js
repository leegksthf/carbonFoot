var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	 var board_no = request.param("number");
	 
	 fs.readFile("./views/admin/web/board/comment_view.html", "utf-8", function(error, data){
 		 response.send(ejs.render(layout.include("web_admin_popup", data), {
 			board_no : board_no
		 }));		 
	 });
};
