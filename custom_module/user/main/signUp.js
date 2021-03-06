var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");
exports.listener=function(request, response){
	
	var no = request.cookies.no;
	var phone = request.cookies.phone;
	var disp_yn = request.cookies.disp_yn;
	var connectorDisp_yn = session.connectorDisp_yn(request);
	var century = request.param("century")==undefined ? "" : request.param("century");

	var sql = "select a.board_no, a.strt_dt, a.end_dt, b.* \n" +
				  "from event a, event_files b \n" +
				  "where a.board_no = b.board_no \n" +
				  "and date_format(now(), '%Y-%m-%d') between a.strt_dt and a.end_dt \n" +
				  "and b.file_dtname is not null \n" +
				  "and b.file_type = 'banner' \n" +
				  "order by rand()";
	
	console.log(sql);
	
	fs.readFile("views/user/signUp.html", "utf-8", function(error, data){
		db.query(sql, function(error, banner_result){
			
			response.send(ejs.render(layout.include("index", data), {
				menuNum:null,
				banner_data:banner_result,
				disp_yn:disp_yn,
				connectorDisp_yn:connectorDisp_yn,
				century:century
			}));
		});
		
	}); 
	
};
