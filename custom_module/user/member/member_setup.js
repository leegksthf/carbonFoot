var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	
	var mngt_no = request.param("orgmem_no");
	
	var sql = "select * " +	
		" from push where orgmem_no = " + mngt_no;	
		//" from push where orgmem_no = 104" ;	
	console.log("sql:"+sql);
	
	db.query(sql, function(error, results){
		response.send({
			connectorNo : connectorNo,
			data : results
		});
	});
};
