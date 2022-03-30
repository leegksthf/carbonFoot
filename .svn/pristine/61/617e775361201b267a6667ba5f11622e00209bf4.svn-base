var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../../../DB_config.js").connect;
var layout = require("../../../../function/layout.js");

exports.listener =  function(request, response){
	var ad_id = request.param("ad_id");
	var ad_pw = request.param("ad_pw");
	var wrk_ip = request.connection.remoteAddress;
	
	var qry = "";
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
				"ad_id = '"+ad_id+"'  \n"+
				"and ad_pw = BASE64_ENCODE('"+ad_pw+"')  \n";
	
	console.log(qry);
	db.query(qry,function(error, results){
		if(results.length==0){
			fs.readFile('./views/location_page.html', "utf-8", function(error, data){
				response.send(ejs.render(data, {
					loc_txt : '입력하신 정보가 없습니다.',
					loc_url : '/admin/web'
				}));
			});			  
		}else{
			request.session.admin_yn = "Y";
			request.session.ad_id = results[0].ad_id;
			request.session.ad_nm = results[0].ad_nm;
			request.session.ad_grant = results[0].ad_grant;
			response.redirect('/admin/web/orgm_list');	
		}
		
	});

}

	
