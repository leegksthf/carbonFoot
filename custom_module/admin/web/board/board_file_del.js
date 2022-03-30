var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var brd_no = request.param("number");	
	var file_no = request.param("file_no");
	var file_name = request.param("file_name");
	var sql = "delete from files where file_no = " + file_no;
	var category = request.param('category') == null ? 'notice' : request.param('category');
	fs.unlink('./file/board/'+file_name, function (err) {
		if(err){
			console.log(err);
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
				console.log("admin/web/board_file_del/error======", sql);
			}else{
				response.redirect("/admin/web/board_write?mode=modify&category="+category+"&number="+brd_no);
			}
		});
	});	
};
