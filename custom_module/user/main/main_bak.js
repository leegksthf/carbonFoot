var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");

exports.listener=function(request, response){
	
	var no = request.cookies.no;
	var phone = request.cookies.phone;
	console.log("no:", no);
	console.log("phone:", phone);

	var sql = "select * from banner where file_dtname is not null order by rand()";
	console.log("sql:", sql);
	fs.readFile("views/user/index.html", "utf-8", function(error, data){
		db.query(sql, function(error, banner_result){
			
			response.send(ejs.render(layout.include("index", data), {
				menuNum:0,
				banner_data:banner_result
			}));
		});
		
	}); 
	
};
