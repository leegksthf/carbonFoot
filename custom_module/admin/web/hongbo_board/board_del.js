var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "hongbo_board";
	var file_table = "hongbo_files";
	var brd_no = request.param("board_no");
	var file_name = "";
	var sql = ""; 
	sql = "delete from "+table+" where board_no = " + brd_no;

	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{
			sql = "select * from "+file_table+" where board_no = " + brd_no;
			db.query(sql, function(error, results){
				if(error) {
					console.log("파일조회 에러===", error);
					response.send("fail");
				}
				for(var i = 0; i < results.length; i++) {
					var file_name = results[i].file_dtname;
					fs.unlink('./file/'+table+'/'+file_name, function (err) {
						if(err){
							console.log("폴더파일삭제 에러====", err);
						}
					});
				}
			}); 
			sql = "delete from "+file_table+" where board_no = " + brd_no;
			db.query(sql, function(error, results){
				if(error){
					response.send("fail");
					console.log("삭제 에러===", sql);
				}
			});
			response.redirect("/admin/web/hongbo_board_list");
		}
	});
};
