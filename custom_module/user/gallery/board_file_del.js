var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var table = "gallery_board";
	var file_table = "gallery_files";	
	var board_path ="";
	var brd_no = request.param("number");	
	var file_no = request.param("file_no");
	var file_name = request.param("file_name");

	var category = request.param('category') == null ? 'sub_directors' : request.param('category');
	var board_table;
	var brd_id;
	switch (category) {
		case 'sub_directors':
			board_table = 'sub_directors_files';
			board_path = 'sub_directors_board';
			
			brd_id = 'sub_directors';
			break;
		case 'sub_meeting':
			board_table = 'sub_meeting_files';
			board_path = 'sub_meeting_board';
			brd_id = 'sub_meeting';
			break;
		case 'sub_mou':
			board_table = 'sub_mou_files';
			board_path = 'sub_mou_board';
			brd_id = 'sub_mou';
			break;
		case 'sub_others':
			board_table = 'sub_others_files';
			board_path = 'sub_others_board';
			brd_id = 'sub_others';
			break;
			
	}
	var sql = "delete from "+board_table+" where file_no = " + file_no;
	
	fs.unlink('./file/'+board_path+'/'+file_name, function (err) {
		if(err){
			console.log(err)
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
			}else{
				response.redirect("/gallery_board_write?category=" + category +"&board_no="+ brd_no + "&mode=modify");
			}
		});
	});	
};
