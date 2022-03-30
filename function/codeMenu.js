var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../custom_module/DB_config.js").connect;

function code_result (p_code, callback){
	var qry = "";
	var data = "";
	var arry = new Array();
			
	qry = "select \n"+
			"  code_group, \n"+
			"  code, \n"+
			"  code_name, \n"+
			"  code_mode, \n"+
			"  code_order \n"+
			"from code \n" + 
			"where \n" + 
			"code_mode = 'child' \n" +
			"and code_group like '"+p_code+"' \n"+
			" and code != '10000' \n";
	qry +=  "order by code_order asc, code_name asc";  
	
	console.log("test : ", qry);
	
	db.query(qry,function(error, results){
		
		if (error) 
            callback(error);
        else
            callback(null,results);
	});
}

/**
 * param: 부모코드(str), 선택자식코드(str), 사용할이름(ex: name='xxx'), return data (str)
 * */
exports.selectBoxList = function (p_code, c_code, callback){
	var arry = new Array();
	var txt ="";
	
	if(p_code == 'orgmem_cate'){
		txt += "<option value=''>회원구분</option>";
	}else{
		txt += "<option value=''>선택하세요.</option>";
	}
	
	code_result(p_code, function(err,data){
		if(err) {
            console.log("ERROR : ",err);            
        } else {
        	arry = data;
    		for(i=0; i<arry.length; i++){
    			if(arry[i].code==c_code){
    				txt += "<option value='" + arry[i].code + "' selected='selected'>" + arry[i].code_name + "</option>";
    			} else{
    				txt += "<option value='" + arry[i].code + "'>" + arry[i].code_name + "</option>";
    			}
    		}
    		if (err){
    			callback(err);
    		} else{
    			callback(null,txt);
    		}
        }
	});
}

