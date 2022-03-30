var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var session = require("../../../function/session.js");

exports.listener =  function(request, response){
	
	var ad_id = request.session.ad_id;
	
	if( ad_id==undefined ){
		var qry = "select * from orgmember where orgmem_no="+session.connectorNo(request);		
		console.log(qry);
		
		db.query(qry, function(error, results){
			var ajaxResult = ( error||results.length==0 ) ? "error" :"success";
			response.send(ajaxResult);
		});
	}
	else{
		response.send("success");		
	}
	
}

	
