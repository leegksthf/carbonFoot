var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){
	var brd_no = request.param("board_no");
	var file_name = "";
	var sql = ""; 
	var category = request.param('category') == null ? 'notice' : request.param('category');
	var table="";
	var file_table = "";
	var comment = "";
	
	switch (category) {
		case 'notice':
			table = "board";
			comment = "board_comment";
			break;
		case 'congrats':
			table = 'congrats_board';
			comment = 'congrats_board_comment';
			break;
		case 'event':
			table = 'event_board';
			comment = 'event_board_comment';
			break;
		case 'sub_notice':
			table = 'sub_notice_board';
			comment = 'sub_notice_board_comment';
			break;
		case 'sub_media':
			table = 'sub_media_board';
			comment = 'sub_media_board_comment';
			break;
			
	}


	sql = "delete from " + table + " where board_no = " + brd_no;
	
	console.log(sql);
	
	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			sql = "select * from files where board_no = " + brd_no;
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
			sql = "delete from files where board_no = " + brd_no;
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러===", sql);
				}
			});
			
			sql = "delete from "+ comment +" where board_no = " + brd_no;
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러===", sql);
				}
			});
			response.redirect("/board_list?category=" + category);
		}
	});
};
