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

	var sql = "select a.board_no,a.board_title, \n"
		+"b.*,c.orgmem_name,c.area_club, CONCAT(c.orgmem_phone1,'-',c.orgmem_phone2,'-',c.orgmem_phone3) AS phone\n"
		+"from hongbo_board a LEFT JOIN hongbo_files b ON a.board_no=b.board_no LEFT JOIN orgmember c ON a.orgmem_no=c.orgmem_no \n" 
		+"where a.board_no = b.board_no \n" 
		+"and b.file_type = 'main' \n"
		+"and b.file_dtname is not null \n"
		+"ORDER BY RAND()";
    console.log(sql);
	console.log(century);
	fs.readFile("./views/user/member/members_view.html", "utf-8", function(error, data){
		db.query(sql, function(error, banner_result){			
			response.send(ejs.render(layout.include("app_user", data), {
                connectorNo : connectorNo,
                banner_data:banner_result,
				menuNum : 2,
				century:century
			})); 
		});
	}); 
};
