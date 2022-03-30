var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request); //5555555 >>f194
	var club_value = request.param("club_value")==undefined ? "" : request.param("club_value");
	var sql="select SUBSTRING_INDEX(club_name,' ',1) AS club_name2,club_name, TIMESTAMPDIFF(YEAR,club_date,NOW())+1 AS date_year, club_year from  code_club where code1 = '"+ club_value +"' ORDER BY club_order*10 ASC\n";
    /* 카운트 S */

	//앱설치된사람 카운트
	console.log("======================================================= \n");
	console.log(sql);

	db.query(sql, function(error, results){
        response.send({
            connectorNo : connectorNo,
            db_data : results,
		}); 
	});
};
