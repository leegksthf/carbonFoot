var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");

var db = require("../../DB_config.js").connect;
var layout = require("../../../function/layout.js");
var session = require("../../../function/session.js");
var code = require("../../../function/codeMenu.js");

exports.listener=function(request, response){
	
	var sql ="select 1 from dual";
	code.selectBoxList("branch", "", function (err, branch) {
		code.selectBoxList("composition", "", function (err, composition) {
				code.selectBoxList("committee", "", function (err, committee) {
						code.selectBoxList("member", "", function (err, member) {
							code.selectBoxList("position", "", function (err, position) {
								code.selectBoxList("company_position", "", function (err, company_position) {
									code.selectBoxList("company_position", "", function (err, organ_position) {
										db.query(sql, function(error, results){
											response.send({
												branch : branch,
												composition : composition,
												committee : committee,
												member : member,
												position : position,
												company_position : company_position
											}); 
										});
								});
							});
						});
					});
				});
			});
		});
};
