var fs = require("fs");
var ejs = require("ejs");
var async = require("async");
var db = require("../custom_module/DB_config.js").connect;
//var session = require("../etc/session.js");


function brd_mngtData(table,whereText,callback){
	
	var qry = "";
	var data = "";
	var arry = new Array();
			
	qry += 	"select \n";
	qry += 	"	count(1) as total_cnt \n";
	qry += 	"from " + table + "  \n";
	qry +=  "where \n";
	qry +=  "1=1 \n";
	if(whereText!=''){
		qry += "and " + whereText;
	}
	
	console.log("test : ",qry);
	
	db.query(qry,function(error, results){
		
		if (error) 
            callback(error);
        else
            callback(null,results); 
	});
}

function page_tag(total, row, col, now){
	
	var txt ="";
	var total_col; // 페이징번호 수
	var col_cnt;  //페이징번호를 묶은 index 갯수
	var now_col_index_start;	//col시작
	var now_col_index_end;		//col종료
	var now_col_index;			
	var k;
	
	
	if(total>row){
		console.log("TOTAL : : : :" +  total);
		k = (total - (total % row)) / row;
		if(total % row>0){
			k+=1;	
		}
		
		total_col = Math.round(total/row)-1;
		now_col_index = Math.ceil(now/col);//올림
		
		if(now<col){
			now_col_index = 1;
			now_col_index_start = 1;
			now_col_index_end = col;
		}else{
			if(total>col)
				now_col_index_start = (now_col_index*col)-(col-1);
			else
				now_col_index_start=0;
			
			now_col_index_end = (now_col_index*col);
		}
		
		col_cnt = total_col/col;
		txt +="<ul>";
			if(!(now_col_index<=1)){
				txt +="<li class='paging_img'> <a href='#'  onclick='goPage(" + (parseInt(now)-10) +")'><img src='/images/admin/btn_first.gif'alt=''  width='19px' height='19px'/></a></li>";
				txt +="<li class='paging_img'> <a href='#'  onclick='goPage(" + (parseInt(now)-1) +")'><img src='/images/admin/btn_prev.gif'alt='' /></a></li>";
			}
			for(i=now_col_index_start; i<=now_col_index_end; i++){
				if(i<=k){
					if(i==now)
						txt += "<li class='paging_on'><a href='#' onclick='goPage(" + i +")'>"+i+"</a></li>" ;
					else
						txt += "<li><a href='#' onclick='goPage(" + i +")'>"+i+"</a></li>" ;
				}
			}
			
			
			if(total > now_col_index_end*row){
				txt +="<li class='paging_img'> <a href='#'  onclick='goPage(" + (parseInt(now)+1) +")'><img src='/images/admin/btn_next.gif'alt='' /></a></li>";
				if(( parseInt(total_col) - parseInt(now) )> 10){
					txt +="<li class='paging_img'> <a href='#'  onclick='goPage(" + (parseInt(now)+10) +")'><img src='/images/admin/btn_last.gif'alt='' width='19px' height='19px'/></a></li>";
				}
				
			}
		txt +="</ul>";
	}else{
		txt += "<ul>";
		txt += "	<li class='paging_img'><a href='#'><img src='/images/admin/btn_prev.gif'alt='' /></a></li>";
		txt += "	<li class='paging_on'><a href='#'>1</a></li>";
		txt += "	<li class='paging_img'><a href='#'><img src='/images/admin/btn_next.gif'alt='' /></a></li>";
		txt += "</ul>";
	}
	return txt;
}

function page_str(now, row, col){
	var retrun_value;
	if(now<1){
		retrun_value = 0;
	}else{
		retrun_value = (now-1)*row;
	}
	console.log("retrun_value : " + retrun_value);
	return retrun_value;
}


exports.action = function(brd_id, whereText, now_page, col_count, row_count, callback){
	var total_cnt;//총 글수
	var row_cnt;//목록수
	var col_cnt = col_count;//페이징수
	var str;//limit ㅅ
	var end;
	
	console.log(whereText);
	brd_mngtData(brd_id, whereText, function(error, result){
		if (error) 
			callback(error);
		else
			callback(null,page_tag(result[0].total_cnt, row_count, col_cnt, now_page), page_str(now_page,row_count,col_cnt), row_count, result[0].total_cnt);
	});
}



