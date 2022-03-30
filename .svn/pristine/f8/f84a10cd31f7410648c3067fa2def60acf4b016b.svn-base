
var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var layout = require("../../../../function/layout.js");
var code = require("../../../../function/codeMngt.js");
var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){

	var orgmem_no = request.param("number");
	console.log("orgmem_no : " + orgmem_no);

	var sql1 = "select * from orgmember where orgmem_no = " + orgmem_no;
	
	fs.readFile("./views/admin/web/orgmember_mngt/orgm_writeForm.html", "utf-8", function(error, data){
		db.query(sql1, function(error, results1){
			code.selectBoxList("position",results1[0].orgmem_position, function(err,s_data3){
				code.selectBoxList("orgmem_phone1", results1[0].orgmem_phone1, function(err, s_data5){
					code.selectBoxList("branch",results1[0].orgmem_branch, function(err,s_data4){
						code.selectBoxList("committee", results1[0].orgmem_committee, function(err,s_data6){
							code.selectBoxList("composition", results1[0].orgmem_committee_position, function(err,s_data7){
								code.selectBoxList("committee", results1[0].orgmem_committee2, function(err,s_data8){
										code.selectBoxList("company_position", results1[0].organ_position, function(err,s_data10){
											code.selectBoxList("member", results1[0].orgmem_member, function(err,s_data11){
												code.selectBoxList("orgmem_area", results1[0].orgmem_area, function(err,s_data12){
													code.selectBoxList("orgmem_committee2", results1[0].orgmem_committee2, function(err,s_data13){
														code.selectBoxList("committee_position2", results1[0].orgmem_committee_position2, function(err,s_data14){
															code.selectBoxList("area_zone", results1[0].area_zone, function(err,s_data15){
																code.selectBoxList("club_position", results1[0].club_position, function(err,s_data16){
																	code.selectBoxList("club_position", results1[0].club_position_second, function(err,s_data17){
																		code.selectBoxList("orgmem_committee2", results1[0].orgmem_committee3, function(err,s_data18){
																			code.selectBoxList("committee_position2", results1[0].orgmem_committee_position3, function(err,s_data19){
																		response.send(ejs.render(layout.include("web_admin_popup", data), {
												db_data : results1,
												s_org_orgMba : s_data3,
												s_org_orgBra : s_data4,
												orgmem_phone1 : s_data5,
												s_org_orgCom : s_data6,			
												s_org_orgComp : s_data7,
												s_org_orgCom2 : s_data8,			
												s_org_orgPos : s_data10,
												s_org_orgMem : s_data11,
												s_org_area : s_data12,
												s_org_committee2 : s_data13,
												s_org_composition2 : s_data14,
												s_org_zone : s_data15,
												s_org_club_position : s_data16,
												s_org_cposition_second : s_data17,
												menuNum: 0,
												s_org_committee3 : s_data18,
												s_org_composition3 : s_data19,
											}));
											});
										});
									});
								});
							});
						});
					});
				});
			});
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