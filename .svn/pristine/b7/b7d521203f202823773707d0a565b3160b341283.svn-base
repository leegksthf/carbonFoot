var fs = require("fs");

exports.include = function(str, content){
	
	var app_bottomHtml = fs.readFileSync(__dirname + "/../include/app/bottom.html", "utf-8");
	var web_bottomHtml = fs.readFileSync(__dirname + "/../include/web/bottom.html", "utf-8");
	var bottomHtml = "";
	var headerHtml = "";
	var topHtml = "";
	if (str == "app_index") { //app_사용자_index
		topHtml = fs.readFileSync(__dirname + "/../include/app/top.html", "utf-8");
		bottomHtml = app_bottomHtml;
		// return content + app_bottomHtml;
	}else if(str == "web_index"){	//web관리자 _index
		return content;
	}else if(str == "web_admin"){	//web관리자 sub
		headerHtml = fs.readFileSync(__dirname + "/../include/web/header.html", "utf-8");
		topHtml = fs.readFileSync(__dirname + "/../include/web/top.html", "utf-8");
		bottomHtml = web_bottomHtml;
	}else if(str == "web_admin_popup"){	//web관리자 sub 팝업
		headerHtml = fs.readFileSync(__dirname + "/../include/web/popup/header.html", "utf-8");
		topHtml = fs.readFileSync(__dirname + "/../include/web/popup/top.html", "utf-8");
		bottomHtml = fs.readFileSync(__dirname + "/../include/web/popup/bottom.html", "utf-8");
	}else  if(str == "app_user"){	//app사용자 sub
		headerHtml = fs.readFileSync(__dirname + "/../include/app/header.html", "utf-8");
		topHtml = fs.readFileSync(__dirname + "/../include/app/top.html", "utf-8");
		bottomHtml = app_bottomHtml;
	} else if (str == "app_user_blank") {	//app사용자 헤더 푸터 X
		topHtml = fs.readFileSync(__dirname + "/../include/app/top.html", "utf-8");
	} else if (str == "app_user_footer") {	//app사용자 헤더 X
		topHtml = fs.readFileSync(__dirname + "/../include/app/top.html", "utf-8");
		bottomHtml = app_bottomHtml;
	}else if(str == "ios_index"){	//ios용
		headerHtml = fs.readFileSync(__dirname + "/../include/ios/header.html", "utf-8");
		topHtml = fs.readFileSync(__dirname + "/../include/ios/top.html", "utf-8");
		bottomHtml = fs.readFileSync(__dirname + "/../include/ios/bottom.html", "utf-8");
	}
	
	return   topHtml + headerHtml + content + bottomHtml;
}