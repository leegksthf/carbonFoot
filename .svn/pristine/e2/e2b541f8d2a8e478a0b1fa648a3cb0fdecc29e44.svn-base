var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
    var brd_no = request.param("board_no");
    var request_no = request.param("req_no");
    var request_state = request.param("request_state");
	var sql = ""; 
    sql = "update event_request ";
    sql += "set request_state = '"+request_state+"'";
    sql += " where request_no = " + request_no;
    console.log("sql : " + sql);

	db.query(sql, function(error, results){
		if(error){
			response.send("fail");
		}else{			
            var moveUrl = "/admin/web/event_request_list?mode=view&number="+brd_no;
			response.redirect(moveUrl);
		}
	});
};
