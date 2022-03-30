var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	var table = "banner";
	var mode = request.param("mode") == undefined ? "write" : request.param("mode");
	var admin = request.session.ad_id;
	var idx = request.param("number");

	fs.readFile("./views/admin/web/banner/banner_write.html","utf-8",function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				data : []
			}));
		}else if(mode ='modify'){
			
			var sql = "select a.*, ifnull(b.orgmem_name, '') as orgmem_name ";
				sql += " from "+table+" a ";
				sql += " left outer join orgmember b ";
				sql += " on a.orgmem_no = b.orgmem_no ";
				sql += " where a.idx = " + idx;
				
			 async.series({
				 first : function(callback){
					 db.query(sql, function(error, results){
						 if(error){
							 response.send("fail");
						 }else{
							 callback(null, results);	
						 }
					 });				 
				 }
			 }, function(error, result){
	     		 response.send(ejs.render(layout.include("web_admin_popup", data), {
					data : result.first,
					data_file : result.second,
					data_main_file : result.third,
					mode :mode,
					admin : admin,
	        		menuNum:5
	    		 }));
			 });			
		}
	});
};
