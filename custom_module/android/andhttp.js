var fs = require("fs");
var http = require("http");
var ejs = require("ejs");
var async = require("async");
var db = require("../DB_config.js").connect;

exports.action=function(request, response){
	
	
	var phone = request.param("phone").replace("+82", "0");
	phone = phone.replace("-","");
	var device = request.param("device");
	var version = request.param("version");
	var type = request.param("type");
	var key_num = request.param("key_num");
	var no = request.param("no");
	
	var first = "";
	var rest = "";
	var second = "";
	var third = "";

	first = phone.substring(0, 3); // (시작인덱스 , 마지막인덱스-1까지) >>010
	rest = phone.substring(3, phone.length); //>>92418974

	if(rest.length == 8){ 
		second = rest.substring(0, 4); //>> 9241
		third = rest.substring(4, rest.length); //>> 8974
	}else{
		second = rest.substring(0, 3); // >> 중간 세자리
		third = rest.substring(3, rest.length); //>> 나머지자리
	}
	
	//phone = first + "-" + second + "-" + third; //>>010-9241-8974
	phone = first + "" + second + "" + third; //>>01092418974
	
	
	console.log(phone);
	var phone_arr = phone.split("-"); //>>phone_arr[0]=010, phone_arr[1]=9241, phone_arr[2]=8974 
	
	var sql1="select * from orgmember where orgmem_phone1=? and orgmem_phone2=? and orgmem_phone3=?";
	
	db.query(sql1, [first, second, third], function(error, results1){
		
		if(error){
			response.send("fail");
		}
		
		else{
			
			if(results1.length > 0){
				console.log(results1); //[{{orgmem_no:1},{orgmem_name:박아영},{orgmem_phone1:010},{orgmem_phone2:9241},{orgmem_phone3:8974}}]
				// 쿠키에 이름 번호 폰 저장
				response.cookie("no", results1[0].orgmem_no);
				response.cookie("name", results1[0].orgmem_name);
				response.cookie("image", results1[0].orgmem_img);
				response.cookie("phone", results1[0].orgmem_phone1 + "-" + results1[0].orgmem_phone2 + "-" + results1[0].orgmem_phone3);
				response.cookie("division", results1[0].orgmem_division);
				response.cookie("disp_yn", results1[0].orgmem_disp_yn);
				var sql2 = "select phone_num from push where replace(phone_num, '-', '')=?" ; 
				
				db.query(sql2, [phone], function(error, results2){ //[{{phone_num:010-9241-8974}}]
					if(results2.length>0){
						var sql3="update push set final_date=now(), key_num=?, phone_num = ?, device = ?,version = ?,type = ? where replace(phone_num, '-', '') = ?";
						db.query(sql3,[key_num, phone,device,version,type,phone],function(error, results3){
							if(error){
								console.log('안드로이드 앱정보 update 에러');
							} else {
								console.log('안드로이드 앱정보 update 성공');
							}
						});
					}
					else{
						var sql4="insert into push(phone_num,device,version,type,first_date,final_date,key_num,orgmem_no) values(?,?,?,?,now(),now(),?,?)";
						db.query(sql4,[phone,device,version,type,key_num,results1[0].orgmem_no],function(error, results4){ 
							if(error){
								console.log('안드로이드 앱정보 insert 에러');
							} else {
								console.log('안드로이드 앱정보 insert 성공');
							}
						});
					}  
					
				});
				var text = ""
				if (results1[0].orgmem_division == 'admin') {
					text += "(관리자)"
				}
				text += results1[0].orgmem_name;
				response.send(text);
			}else{
				response.send("fail");
			}
		}
	});
};
