var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "banner";
	var idx = request.param("idx");	
	var file_name = request.param("file_name");
	var sql = "update "+table+" set file_name=null, file_dtname=null, file_path=null where idx = " + idx;
	
	fs.unlink('./file/'+table+'/'+file_name, function (err) {
		if(err){
			console.log(err);
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
				console.log("admin/web/banner_file_del/error======", sql);
			}else{
				response.redirect("/admin/web/banner_write?mode=modify&number="+idx);
			}
		});
	});	
};
