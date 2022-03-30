var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;
var layout = require("../../function/layout.js");
var sql = "";

exports.listener = function(request, response){
	var user_name = request.param("user_name");
	var user_pw = request.param("user_pw");

	var sql = "select * from orgmember where orgmem_name='" + user_name + "' and orgmem_pw='" + user_pw + "'";

	console.log(sql);

	fs.readFile("/views/user/index.html", "utf-8", function(error, data){
		db.query(sql, function(error, result){
			if(error){
				response.send(error);
			}else{
				console.log(sql);
				response.cookie("no", result[0].orgmem_no);
				response.cookie("name", result[0].orgmem_name);
				response.cookie("image", result[0].orgmem_img);
				response.cookie("phone", result[0].orgmem_phone1 + "-" + result[0].orgmem_phone2 + "-" + result[0].orgmem_phone3);
				response.cookie("division", result[0].orgmem_division);
				response.cookie("disp_yn", results1[0].orgmem_disp_yn);
				var json = JSON.stringify({ 
					result : true,
					orgmem_no : result[0].orgmem_no,
					orgmem_phone : result[0].orgmem_phone,
					certification_num : result[0].random_number
				});
				response.send(json);
			}
		}); 

	}); 
}