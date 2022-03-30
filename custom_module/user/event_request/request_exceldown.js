/**
 * New node file
 */

var nodeExcel = require('excel-export');

var db = require("../../DB_config.js").connect;

exports.listener=function(request, response){
// app.get('/Excel', function(req, res){

    var board_no = request.param("board_no")==undefined ? "" : request.param("board_no");

	var search_text = request.param("search_text")==undefined ? "" : request.param("search_text");
	/*
	 * var search_position = request.param("search_position")==undefined ? "" :
	 * request.param("search_position"); var order_type =
	 * request.param("order_type")==undefined ? "no" :
	 * request.param("order_type");
	 */
	
	var sql = "";	
	
    var conf ={};   
    
	// a=[i+1, mem_name, mem_phone, mem_position, mem_birth, mem_join,
	// mem_ness_name, mem_ness_phone, mem_work_duty, mem_work_phone,
	// mem_address_work, mem_home_phone, mem_address_home];
    conf.cols = [{
        caption:'번호',
        type:'number',
        width:8
    },{
        caption:'신청자 소속',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:30
    },{
        caption:'신청자 직위',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:30
    },{
        caption:'신청자명',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:20
    },{
        caption:'신청자전화번호',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:40
    },{
        caption:'신청자이메일',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:40
    }/*,{
        caption:'신청일',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:20
    }*/
    ];

    sql = "select	\n"+
		" @RNUM := @RNUM +1 as num, \n" +
            " b.orgmem_company_name,	\n" +
            " b.organ_position,	\n" +
			" b.orgmem_name,	\n" +
            " b.orgmem_phone1,	\n" +
            " b.orgmem_phone2,	\n" +
            " b.orgmem_phone3,	\n" +			
			" b.orgmem_email,	\n" +											
			" a.create_date,	\n" +
			" a.create_host	\n" +
			" from event_request a left join orgmember b ON a.orgmem_no=b.orgmem_no , (SELECT @RNUM := 0 ) r \r";
	sql += " where \n";
    sql += " 1=1 \n";
    sql += " and a.board_no = '"+board_no+"' and a.request_state='y'";
    
	/*
	 * if(search_position != ''){ sql += " and orgmem_position = '" +
	 * search_position +"' \n"; }
	 */
		
	 /*
		 * if(order_type=='no'){ sql += "order by orgmem_no desc "; }else
		 * if(order_type=='name'){ sql += "order by orgmem_name asc "; }
		 */
	
	console.log(sql);
	
	db.query(sql, function(error, results){
		 if(error){
			 // response.send(error);
		 }else{
			var arr = [];
			
			for(i=0; i<results.length; i++){
                var orgmem_company_name = "";   // 소속
                var organ_position = "";   // 직위
				var orgmem_name = "";	 // 신청자명				
				var orgmem_phone = "";	// 전화번호
                var orgmem_email = "";	// 이메일								                

                orgmem_company_name = results[i].orgmem_company_name;
                organ_position = results[i].organ_position;
                orgmem_name = results[i].orgmem_name;
                orgmem_phone = results[i].orgmem_phone1 +"-"+ results[i].orgmem_phone2 + "-" + results[i].orgmem_phone3;
                orgmem_email = results[i].orgmem_email;													

				a=[i+1, orgmem_company_name, organ_position, orgmem_name, orgmem_phone, orgmem_email];
			
				arr.push(a);
			}
			
			conf.rows = arr;
			
			var result = nodeExcel.execute(conf);

		    response.setHeader('Content-Type', 'application/vnd.openxmlformats');

		    response.setHeader("Content-Disposition", "attachment; filename=" + "event_request.xlsx");

		    response.end(result, 'binary');
		 }		 
		 
	});
}