var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){

    var text = request.param("text")==undefined ? "" : request.param("text");
    
	var sql="";
	
	sql =  "SELECT orgmem_name,orgmem_address,area_club FROM orgmember\n";
			db.query(sql, function(error, results){
                console.log(sql); 
				response.send({
					db_data : results
				}); 
			});
};
