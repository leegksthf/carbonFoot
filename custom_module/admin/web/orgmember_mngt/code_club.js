var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var sql =  "";
var db = require("../../../DB_config.js").connect;

exports.listener = function(request, response){

	var s_area = request.param("s_area");
	var s_zone = request.param("s_zone") == "" ? '1지대' : request.param("s_zone") == undefined ? '1지대' : request.param("s_zone");
    var division = request.param("division");
	
	console.log("s_area==" + s_area);
	console.log("s_zone==" + s_zone);
    console.log("division" + division);
    if(division == 'admin'){
        var sql = "select \n"+
        "  club_name \n"+
        "from code_club \n" + 
        "where \n" + 
        "code1 = '"+s_area+"' \n" +
    "order by club_date asc";    
    }else{
        var sql = "select \n"+
        "  club_name \n"+
        "from code_club \n" + 
        "where \n" + 
        "code1 = '"+s_area+"' \n" +
    "order by club_date asc";  
    }
    

    var sql2 = "select \n"+
    "DISTINCT  code2 \n"+
    "from code_club \n" + 
    "where \n" + 
    "code1 = '"+s_area+"' \n";


    console.log(sql);

    db.query(sql, function(error, results){
        db.query(sql2, function(error, results2){
        response.send({
           db_data:results,
           code_data:results2
        }); 
    });
});

}