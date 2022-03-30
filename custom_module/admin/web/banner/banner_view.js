var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	 var table = "banner";
	 var idx = request.param("number");
	 
	 var sql = "select " +
	   " a.idx, a.title, a.homepage, a.strt_dt, a.end_dt, a.file_name, a.file_dtname, a.file_path, a.create_id, date_format(a.create_date, '%Y-%m-%d') as c_date, a.create_host, \n" +
	   " (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, ifnull(b.orgmem_name, '') as orgmem_name \n" +
	   " from "+table+" a left outer join orgmember b on a.orgmem_no = b.orgmem_no where a.idx = " + idx;	 
	 
	 fs.readFile("./views/admin/web/banner/banner_view.html", "utf-8", function(error, data){
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
    			 db_data : result.first,
    			 menuNum: 5
    		 }));
		 });			 
		 
	 });
};
