var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
	
	var brd_no = request.param("number");	
	var file_name = request.param("file_name");
	var type = request.param("type");
	var sql = "update orgmember set orgmem_img = '' where orgmem_no = " + brd_no;


	switch (type) {
		case 'member':
			sql = "update orgmember set orgmem_img = '' where orgmem_no = " + brd_no;
			break;
		case 'com1':
			sql = "update orgmember set company_img1 = '' where orgmem_no = " + brd_no;
			break;
		case 'com2':
			sql = "update orgmember set company_img2 = '' where orgmem_no = " + brd_no;
			break;
		case 'com3':
			sql = "update orgmember set company_img3 = '' where orgmem_no = " + brd_no;
			break;
		case 'com4':
			sql = "update orgmember set company_img4 = '' where orgmem_no = " + brd_no;
			break;
		case 'card':
			sql = "update orgmember set business_card = '' where orgmem_no = " + brd_no;
			break;

		case 'cert1':
			sql = "update orgmember set certificate1 = '' where orgmem_no = " + brd_no;
			break;
		case 'cert2':
			sql = "update orgmember set certificate2 = '' where orgmem_no = " + brd_no;
			break;
		case 'intro':
			sql = "update orgmember set company_introduce = '' where orgmem_no = " + brd_no;
			break;
	}

	fs.unlink('./file/member/'+file_name, function (err) {
		if(err){
			console.log(err)
		}
		db.query(sql, function(error, results){
			if(error){
				response.send("fail");
			}else{
				response.send("success");
			}
		});
	});	
};
