var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
exports.listener =  function(request, response){
	var code_group = request.param("code_group");
	var code = request.param("code");
	var mode = request.param("mode");
	var wrk_ip = request.connection.remoteAddress;
	
	var qry = "";
	
	fs.readFile("./views/admin/web/code/code_write.html","utf-8", function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				mode :mode,
				code_group :code_group
			}));
		}else if(mode ='modify'){
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
					"code_group = '"+code_group+"' \n" +       
					"and code_mode = 'parent' " ;
			
			console.log(qry);
			db.query(qry,function(error, results){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					mode :mode,
					data : results,
					code_group : code_group,
					menuNum:6
				}));
			});
		}
	});

}

	
