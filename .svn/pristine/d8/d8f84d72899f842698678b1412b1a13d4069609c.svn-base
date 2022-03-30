var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var session = require("../../../function/session.js");

exports.listener =  function(request, response){
	var connectorNo = session.connectorNo(request);
	
	var table = "hongbo_board_comment";
	var mode = request.param("mode");
	var board_no = request.param("board_no");
	var comment_content = request.param("comment_content");
	var comment_no = (request.param("comment_no") == null) ? 0 : request.param("comment_no");
	var wrk_ip = request.connection.remoteAddress;
	var qry = "";
	
	if(mode == "write"){
		qry  = "insert into "+table+" ";
		qry += "( ";
		qry += "comment_content, ";
		qry += "orgmem_no, ";
		qry += "board_no, ";
		qry += "create_date, ";
		qry += "create_host ";
		qry += ") values ( ";
		qry +=  "'" + comment_content +  "', ";
		qry +=  "" + connectorNo +  ", ";
		qry +=  "" + board_no +  ", ";
		qry += "now(), ";
		qry += "'" + wrk_ip + "' ";
		qry += ")";
	}else if(mode == "modify"){
		qry  = "update "+table+" set ";
		qry += "comment_content = '"+comment_content+"' , ";
		qry += "orgmem_no = "+connectorNo+" , ";
		qry += "board_no = "+board_no+" ";
		qry += "where comment_no = "+comment_no+" ";
	}else if(mode == "delete"){
		qry = "delete from "+table+" where comment_no = "+comment_no+" ";
	}
		
	console.log(qry);
	
	db.query(qry, function(error, results){
		var ajaxResult = "success";
		
		if(error) ajaxResult = "error"; 
		
		response.send(ajaxResult);
	});
}

	
