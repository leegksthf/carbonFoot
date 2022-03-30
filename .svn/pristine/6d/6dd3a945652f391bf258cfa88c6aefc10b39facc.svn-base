var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var code = require("../../../../function/codeMngt.js");
var layout = require("../../../../function/layout.js");


exports.listener =  function(request, response){
	
	var mode = request.param("mode")==null ? "parent" : request.param("mode");
	var code_group = request.param("search_code_group")==null ? "" : request.param("search_code_group");
	var URL = "";
	
	if(mode=="parent"){
		URL = "./views/admin/web/code/code_list.html";
	}else{
		URL = "./views/admin/web/code/code_list_child.html";
	}
	if(request.session.admin_yn=='Y'){
		fs.readFile(URL, "utf-8", function(error, data){
			var qry = "";
			
			qry = 	"select \n"+
					"  code_group, \n"+
					"  code, \n"+
					"  code_name, \n"+
					"  code_mode, \n"+
					"  code_order, \n"+
					"  ad_create_id, \n"+
					"  ad_create_date, \n"+
					"  ad_create_host \n"+ 
					"from code \n" + 
					"where \n" + 
					"code_mode = '"+mode+"' \n";
			if(mode=='child'){
				qry +=	"and code_group = '"+code_group+"' \n";
			}
			qry +=  "order by code_order";   
			
			console.log(qry);
			
			db.query(qry,function(error, results){
				response.send(ejs.render(layout.include("web_admin", data), {
					mode : mode,
					data : results,
					menuNum:6,
					code_group : code_group
				}));
			});
		});
	}else{
		fs.readFile('views/location_page.html', "utf-8", function(error, data){
			response.send(ejs.render(data, {
				loc_txt : '관리자 로그인이 필요합니다.',
				loc_url : '/admin/web'
			}));
		});
	}
}

	
