var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var session = require("../../../function/session.js");

exports.listener =  function(request, response){
    var connectorNo = session.connectorNo(request);
    var connectorPhone = session.connectorPhone(request);
	
	var table = "event_request";
    var board_no = request.param("board_no");
    var request_state = request.param("request_state");
    var request_no = request.param("request_no");
    var method = request.param("method");
	var wrk_ip = request.connection.remoteAddress;
	var qry = "";
	console.log("method" + method); 
    if(method=="insert") {
        qry  = "insert into "+table+" ";
        qry += "( ";
        qry += "board_id, ";    
        qry += "board_no, ";
        qry += "orgmem_no, ";
        qry += "orgmem_phone, ";
        qry += "request_state, ";
        qry += "create_date, ";
        qry += "create_host ";
        qry += ") values ( ";
        qry +=  "'event_request', ";    
        qry +=  "" + board_no +  ", ";
        qry +=  "" + connectorNo +  ", ";
        qry +=  "" + connectorPhone +  ", ";
        qry += "'" + request_state +"', ";
        qry += "now(), ";
        qry += "'" + wrk_ip + "' ";
        qry += ")";
    }else{        

		qry = "update "+table+ " set request_state ='" + request_state + "'";
		qry += ", update_date = now(), update_host = '" + wrk_ip + "' where request_no = " + request_no;
				
    }
	
		
	console.log("qry : " + qry);
	
	db.query(qry, function(error, results){
		var ajaxResult = "success";
		
		if(error) ajaxResult = "error"; 
		
		response.send(ajaxResult);
	});
}

	
