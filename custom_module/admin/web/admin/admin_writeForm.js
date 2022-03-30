var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");
exports.listener =  function(request, response){
	var ad_id = request.param("ad_id");
	var mode = request.param("mode");
	var wrk_ip = request.connection.remoteAddress;
	
	var qry = "";
	
	fs.readFile("./views/admin/web/admin/admin_writeForm.html","utf-8", function(error, data){
		if(mode == 'write'){
			response.send(ejs.render(layout.include("web_admin_popup", data), {
				mode :mode
			}));
		}else if(mode ='modify'){
			
			qry = 	"select \n"+
					"  ad_id, \n"+
					"  ad_pw, \n"+
					"  ifnull((select b.orgmem_name from orgmember b where b.orgmem_no = a.orgmem_no), '관리자') as ad_nm , \n"+
					"  ad_grant, \n"+
					"  create_id, \n"+
					"  create_date, \n"+
					"  create_host \n"+ 
					"from admin_mngt a \n" + 
					"where \n" + 
					"ad_id = '"+ad_id+"'  \n";
			console.log(qry);
			db.query(qry,function(error, results){
				response.send(ejs.render(layout.include("web_admin_popup", data), {
					mode :mode,
					data : results,
					menuNum:5
				}));
			});
		}
	});

}

	
