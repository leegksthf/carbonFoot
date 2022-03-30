var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var brd_no = request.param("board_no");
	var file_name = "";
	var sql = ""; 

	var category = request.param('category') == null ? 'notice' : request.param('category');
	var board_table;
	var brd_id;
	switch (category) {
		case 'notice':
			board_table = 'board';
			brd_id = 'notice';
			break;
		case 'congrats':
			board_table = 'board';
			brd_id = 'free';
			break;
		case 'event':
			board_table = 'event_board';
			brd_id = 'event';
			break;
	}

	sql = "delete from "+board_table+" where board_no = " + brd_no;

	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			sql = "select * from files where board_no = " + brd_no+ " AND board_id='"+brd_id+"'";
			db.query(sql, function(error, results){
				if(error) {
					console.log("파일조회 에러===", error);
					response.send("fail");
				}
				for(var i = 0; i < results.length; i++) {
					var file_name = results[i].file_dtname;
					fs.unlink('./file/board/'+file_name, function (err) {
						if(err){
							console.log("폴더파일삭제 에러====", err);
						}
					});
				}
			}); 
			sql = "delete from files where board_no = " + brd_no + " AND board_id='"+brd_id+"'";
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러===", sql);
				}
			});
			response.redirect("/admin/web/board_list?category="+category);
		}
	});
};
