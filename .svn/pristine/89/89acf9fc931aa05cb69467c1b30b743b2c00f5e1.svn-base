var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var table = "event_board";
	var file_table = "event_files";	
	var board_path ="event_board";
	var brd_no = request.param("number");	
	var file_no = request.param("file_no");
	var file_name = request.param("file_name");

	var sql = "delete from "+file_table+" where file_no = " + file_no;
	console.log(sql);
	fs.unlink('./file/'+board_path+'/'+file_name, function (err) {
		if(err){
			console.log(err)
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
			}else{
				response.redirect("/event_brd_write?board_no="+ brd_no + "&mode=modify");
			}
		});
	});	
};
