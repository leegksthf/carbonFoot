var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
require('date-utils');
var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){

	var orgmem_no = request.param("orgmem_no");
	var popup_yn = request.param("popup_yn");
	
	var sql = "";
	 
	sql = "update push set " +
		"popup_yn ='"+popup_yn+"' " +
		"where orgmem_no =" + orgmem_no;
	 
	console.log("sql:"+sql);
	
	 db.query(sql, [], function(error, results){
		 if(error){
			 console.log(error);
		 }else{
				response.send("success");
		 }
	 });
};
