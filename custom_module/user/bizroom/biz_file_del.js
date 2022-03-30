var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var board_path ="";
	var brd_no = request.param("number");	
	var file_no = request.param("file_no");
	var file_name = request.param("file_name");

	var category = request.param('category') == null ? 'notice' : request.param('category');


	var sql = "delete from bizroom_files where file_no = " + file_no;
	console.log(sql);
	fs.unlink('./file/bizroom/'+file_name, function (err) {
		if(err){
			console.log(err)
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
			}else{
				response.redirect("/biz_write?brd_no="+ brd_no + "&mode=modify");
			}
		});
	});	
};
