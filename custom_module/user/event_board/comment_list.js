var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	
	var table = "event_board_comment";
	var sql = "";
	var board_no = request.param("board_no");
	
	sql =  "select a.*, ";
	sql += "	   date_format(a.create_date, '%Y.%m.%d %H:%m:%s') as c_date, ";
	sql += "       (select b.orgmem_name from orgmember b where b.orgmem_no = a.orgmem_no) as orgmem_name ";
	sql += "from "+table+" a where a.board_no = "+board_no+" order by a.create_date desc";
	
	db.query(sql, function(error, result) {
		response.send({
			connectorNo : connectorNo,
			result : result
		}); 
	});
};
