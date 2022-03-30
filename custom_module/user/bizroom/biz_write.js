var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	var century = request.param("century")==undefined ? "" : request.param("century");
	var org_sql ="select 1 from dual"; 
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var brd_no = request.param("brd_no");

	fs.readFile("./views/user/bizroom/biz_write.html", "utf-8", function(error, data){
		if(mode == 'write'){
			db.query(org_sql, function(error, org_results){			
				response.send(ejs.render(layout.include("app_user", data), {
					connectorNo : connectorNo,
					century:century,
					menuNum:5,
					data : [],
					mode:'insert'
				})); 
			});
		}else if(mode == 'modify'){
			
			var sql = "select * ";
				sql += " from bizroom_board" 
				sql += " where board_no = " + brd_no;
				
			var sql_files = "select * ";
				sql_files += " from bizroom_files ";
				sql_files += " where board_no = " + brd_no;
				sql_files += " order by file_dtname";		
				console.log(sql);
				console.log(sql_files);
			async.series({
					first : function(callback){
						db.query(sql, function(error, results){
							if(error){
								response.send("fail");
							}else{
								callback(null, results);	
							}
						});				 
					},
					second : function(callback){
						db.query(sql_files, function(error, results_files){
							if(error){
								response.send("fail");
							}else{
								callback(null, results_files);	
							}
						});				 
					}
				}, function(error, result){
					 response.send(ejs.render(layout.include("app_user", data), {
					   data : result.first,
					   data_file : result.second,
					   connectorNo : connectorNo,
					   mode : mode,
					   menuNum : 5
					}));
				});
		}
	}); 
};
