var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var brd_no = request.param("board_no");
	var file_name = "";
	var sql = ""; 
	sql = "delete from event_board where board_no = " + brd_no;

	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			sql = "select * from event_files where board_no = " + brd_no;
			db.query(sql, function(error, results){
				if(error) {
					console.log("파일조회 에러===", error);
					response.send("fail");
				}
				for(var i = 0; i < results.length; i++) {
					var file_name = results[i].file_dtname;
					fs.unlink('./file/event_board/'+file_name, function (err) {
						if(err){
							console.log("폴더파일삭제 에러====", err);
						}
					});
				}
			}); 
			sql1 = "delete from event_files where board_no = " + brd_no;
			db.query(sql1, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러sql1===", sql1);
				}
			});

			sql2 = "delete from event_request where board_no = " + brd_no;
			db.query(sql2, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러sql2===", sql2);
				}
			});
			response.redirect("/admin/web/event_board_list");
		}
	});
};
