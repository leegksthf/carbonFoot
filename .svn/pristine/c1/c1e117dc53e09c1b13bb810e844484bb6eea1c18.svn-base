/**
 * New node file
 */

var nodeExcel = require('excel-export');

var db = require("../../../DB_config.js").connect;

exports.listener=function(request, response){
//app.get('/Excel', function(req, res){

    var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
    var search_type2  = request.param("search_type2 ")==undefined ? "" : request.param("search_type2");
    var search_type  = request.param("search_type")==undefined ? "" : request.param("search_type");
    /*var search_position = request.param("search_position")==undefined ? "" : request.param("search_position");
	var order_type = request.param("order_type")==undefined ? "no" : request.param("order_type");*/
	
	var sql = "";	
	
    var conf ={};   
    
	//a=[i+1, mem_name, mem_phone, mem_position, mem_birth, mem_join, mem_ness_name, mem_ness_phone, mem_work_duty, mem_work_phone, mem_address_work, mem_home_phone, mem_address_home];
    conf.cols = [{
        caption:'번호',
        type:'number',
        width:8
    },{
        caption:'휴대폰',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'소속클럽',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15    
    },{
        caption:'이름',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15    
    },{
        caption:'회사명',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'전화번호',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'이메일',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:25
    },{
        caption:'주소',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:25
    },{
        caption:'앱 설치여부',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
                         if(cellData==null)
             return '';
            else
             return cellData.toUpperCase();
        }
        , width:15
    }];

    sql = "select	\n"+
		" @RNUM := @RNUM +1 as num, \n" +
//			" orgmem_no,	\n" +
            " area_club,    \n" +
			" orgmem_name,	\n" +         
            " orgmem_company_name,	\n" +
            " organ_position,	\n" +
            " orgmem_work_duty,	\n" +			
            " orgmem_tel1,	\n" +
            " orgmem_tel2,	\n" +
            " orgmem_tel3,	\n" +
			" orgmem_phone1,	\n" +
			" orgmem_phone2,	\n" +
            " orgmem_phone3,	\n" +		
            " orgmem_email,	\n" +
            " orgmem_address,	\n" +			
			" if((select count(*) as cnt from push b where a.orgmem_no = b.orgmem_no) = '1' , 'Y', 'N') as app_install,\n" +
			" create_id,	\n" +
			" create_date,	\n" +
			" create_host	\n" +
			" from orgmember a, (SELECT @RNUM := 0 ) r \r";
	sql += " where \n";
	sql += " 1=1  \n";
	/*if(search_position != ''){
		sql += " and orgmem_position = '" + search_position +"' \n";
    }*/
	if(search_text != ''){
           if(search_type != '' && search_type == 'orgmem_name'){
            sql += 'and (';
            sql += "orgmem_name like'%" + search_text  + "%' \n" ;
            sql += ')';
            } 
           if(search_type != '' && search_type == 'orgmem_phone'){
            sql += 'and (';
            sql += "concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n" ;
            sql += ')';
             } 
           if(search_type != '' && search_type == 'orgmem_company_name'){
            sql += 'and (';
            sql += "area_club like '%" + search_text +  "%' \n" ;
            sql += ')';
           }
        // if(search_type2 == 'orgmem_phone'){
        //     sql += "and concat(orgmem_phone1, orgmem_phone2, orgmem_phone3) like  concat('%',replace('" + search_text + "','-',''),'%') \n";
        // }
        // if(search_type2 == 'orgmem_company_name'){
        //     sql += " and area_club like '%" + search_text +  "%' \n" ;
        // }

    }
	
	
	console.log(sql);
	
	db.query(sql, function(error, results){
		 if(error){
			 //response.send(error);
		 }else{
			var arr = [];
			
			for(i=0; i<results.length; i++){
                var area_club = results[i].area_club;
				var orgmem_name = results[i].orgmem_name;
                var orgmem_company_name = results[i].orgmem_company_name;
                var organ_position = results[i].organ_position;
                var orgmem_work_duty = results[i].orgmem_work_duty;
                var orgmem_tel = "";
                if(results[i].orgmem_tel1 !=null && results[i].orgmem_tel1 != '' && results[i].orgmem_tel1 != 'null'){
					orgmem_tel = results[i].orgmem_tel1 +"-"+ results[i].orgmem_tel2 +"-"+ results[i].orgmem_tel3;
                }	
                var orgmem_phone = "";
				if(results[i].orgmem_phone1 !=null && results[i].orgmem_phone1 !='' && results[i].orgmem_phone1 != 'null'){
					orgmem_phone = results[i].orgmem_phone1 +"-"+ results[i].orgmem_phone2 +"-"+ results[i].orgmem_phone3;
				}	
				var orgmem_email = results[i].orgmem_email;									
				var orgmem_address = results[i].orgmem_address;									
				var app_install = results[i].app_install;

				/*if(results[i].orgmem_birth_year !=null && results[i].orgmem_birth_year !=''){
					mem_birth = results[i].orgmem_birth_year +"년"+ results[i].orgmem_birth_month +"월"+ results[i].orgmem_birth_day + "일";
				}*/		

				a=[i+1, orgmem_phone, area_club, orgmem_name, orgmem_company_name, orgmem_tel, orgmem_email, orgmem_address, app_install];
			
				arr.push(a);
			}
			
			conf.rows = arr;
			
			var result = nodeExcel.execute(conf);

		    response.setHeader('Content-Type', 'application/vnd.openxmlformats');

		    response.setHeader("Content-Disposition", "attachment; filename=" + "member_export.xlsx");

		    response.end(result, 'binary');
		 }		 
		 
	});
}