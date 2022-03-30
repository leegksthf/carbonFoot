var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){

	var eventData = request.param("eventData");
	var sql = "";
	
	if(eventData.status == "C"){
		sql = "insert into calendar " +
		"(title, start, end, backgroundColor, textColor, allDay) " +
		"values ('" + eventData.title + "', '" + eventData.start + "', '" + eventData.end + "', '" + eventData.backgroundColor + "', '" + eventData.textColor + "', '" + eventData.allDay + "')";

		console.log("sql : " + sql);
	} else if(eventData.status == "U"){
		sql = "update calendar " +
		"set title = '" + eventData.title + "' , description = '" + eventData.description + "', start = '" + eventData.start + "', end = '" + eventData.end + "', backgroundColor = '" + eventData.backgroundColor + "', textColor = '" + eventData.textColor + "', allDay = '" + eventData.allDay + "' " +
		"where cal_id = '" + eventData.cal_id + "'";
		
		console.log("sql : " + sql);
	} else if(eventData.status == "D"){
		sql = "delete from calendar " +
		"where cal_id = '" + eventData.cal_id + "'";

		console.log("sql : " + sql);
	}
	
	db.query(sql, [], function(error, results){
		if(error){
			console.log(error);
		}else{
			response.send("success");
		}
	});
};
