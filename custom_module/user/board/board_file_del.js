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
	var board_table;
	var brd_id;
	switch (category) {
		case 'notice':
			board_path = 'board';
			brd_id = 'notice';
			break;
		case 'congrats':
			board_path = 'congrats_board';
			brd_id = 'congrats';
			break;
		case 'event':
			board_path = 'event_board';
			brd_id = 'event';
			break;
		case 'sub_notice':
			board_path = 'sub_notice_board';
			brd_id = 'sub_notice';
			break;
		case 'sub_media':
			board_path = 'sub_media_board';
			brd_id = 'sub_media';
			break;
			
	}
	var sql = "delete from files where file_no = " + file_no;
	console.log(sql);
	fs.unlink('./file/board/'+file_name, function (err) {
		if(err){
			console.log(err)
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
			}else{
				response.redirect("/board_write?category=" + category +"&board_no="+ brd_no + "&mode=modify");
			}
		});
	});	
};
