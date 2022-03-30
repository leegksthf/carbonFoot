var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var page_navi = require("../../../function/board_page_navi.js");
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");

exports.listener=function(request, response){
	var connectorNo = session.connectorNo(request);
	var century = request.param("century")==undefined ? "" : request.param("century");
	
	fs.readFile("./views/user/bizroom/bizroom.html", "utf-8", function(error, data){

		var sql = "select a.*, date_format(a.create_date, '%Y-%m-%d') as c_date,";
		sql +=" (select ad_nm from admin_mngt where ad_id = a.create_id) as create_name, ";
		sql +=" ifnull((select c.file_dtname from bizroom_files c where c.board_no = a.board_no), '') as file_dtname";
		sql +=" from bizroom_board a";
		sql +=" where a.create_id = "+connectorNo+"";

		console.log(sql);

		db.query(sql, function(error, results){			
			response.send(ejs.render(layout.include("app_user", data), {
				connectorNo : connectorNo,
				century:century,
				menuNum:5,
				data : results,
			})); 
		});
	}); 
};
