var fs = require("fs");
var ejs = require("ejs");
var async = require("async");

exports.listener =  function(request, response){
	var ad_nm = request.session.ad_nm;
	response.send(ad_nm);
}