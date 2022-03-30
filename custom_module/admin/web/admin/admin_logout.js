var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
exports.listener =  function(request, response){
	var result = request.session.destroy();
	
	fs.readFile('./views/location_page.html', "utf-8", function(error, data){
		response.send(ejs.render(data, {
			loc_txt : '로그아웃되었습니다',
			loc_url : '/admin/web'
		}));
	});
}

	
