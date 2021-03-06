
/**
 * Module dependencies.
 */

require('log-timestamp')(function() { 
    var dt;
    dt = new Date();
    dt = dt.getFullYear() + "-" + ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + "-" + (dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) + " " + (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) + ":" + (dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds());

    return dt;
});
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , ejs = require('ejs')
  , JSONStream = require('JSONStream')
  , async = require('async')
  , url = require('url');

/*custom modules start*/
var db = require("./custom_module/DB_config.js").connect;
var layout = require("./function/layout.js");

//web
/* admin */
var admin_login = require("./custom_module/admin/web/admin/admin_login.js");
var admin_logout = require("./custom_module/admin/web/admin/admin_logout.js");
var admin_list = require("./custom_module/admin/web/admin/admin_list.js");
var admin_save = require("./custom_module/admin/web/admin/admin_save.js");
var admin_del = require("./custom_module/admin/web/admin/admin_del.js");
var admin_writeForm = require("./custom_module/admin/web/admin/admin_writeForm.js");
var admin_id_chk = require("./custom_module/admin/web/admin/admin_id_chk.js");
var orgm_udpateDisp = require("./custom_module/admin/web/orgmember_mngt/orgm_udpateDisp.js");
/* 2015.08.18 추가 */
var admin_addForSearch = require("./custom_module/admin/web/admin/admin_addForSearch.js");
var getAdminName = require("./custom_module/admin/web/admin/getAdminName.js");
var getRepre_number = require("./custom_module/admin/web/admin/getRepre_number.js");
var getSMS_sender = require("./custom_module/admin/web/admin/getSMS_sender.js");


/* orgmember_mngt */
var orgm_write = require("./custom_module/admin/web/orgmember_mngt/orgm_write.js");
var orgm_view = require("./custom_module/admin/web/orgmember_mngt/orgm_view.js");
var orgm_save = require("./custom_module/admin/web/orgmember_mngt/orgm_save.js");
var orgm_list = require("./custom_module/admin/web/orgmember_mngt/orgm_list.js");
var orgm_list_popup = require("./custom_module/admin/web/orgmember_mngt/orgm_list_popup.js");
var orgm_del = require("./custom_module/admin/web/orgmember_mngt/orgm_del.js");
var orgm_modify = require("./custom_module/admin/web/orgmember_mngt/orgm_modify.js");
var orgm_file_del = require("./custom_module/admin/web/orgmember_mngt/orgm_file_del.js");
var orgm_officer_del = require("./custom_module/admin/web/orgmember_mngt/orgm_officer_del.js");
var orgmemExceldown = require("./custom_module/admin/web/orgmember_mngt/orgmemExceldown.js");
var code_club = require("./custom_module/admin/web/orgmember_mngt/code_club.js");
var phoneNumChk = require("./custom_module/admin/web/orgmember_mngt/phoneNumChk.js");

/* board */
var board_list = require("./custom_module/admin/web/board/board_list.js");
var board_view = require("./custom_module/admin/web/board/board_view.js");
var board_write = require("./custom_module/admin/web/board/board_write.js");
var board_save = require("./custom_module/admin/web/board/board_save.js");
var board_del = require("./custom_module/admin/web/board/board_del.js");
var board_file_del = require("./custom_module/admin/web/board/board_file_del.js");
var comment_view = require("./custom_module/admin/web/board/comment_view.js");

var hongbo_board_list = require("./custom_module/admin/web/hongbo_board/board_list.js");
var hongbo_board_view = require("./custom_module/admin/web/hongbo_board/board_view.js");
var hongbo_board_write = require("./custom_module/admin/web/hongbo_board/board_write.js");
var hongbo_board_save = require("./custom_module/admin/web/hongbo_board/board_save.js");
var hongbo_board_del = require("./custom_module/admin/web/hongbo_board/board_del.js");
var hongbo_board_file_del = require("./custom_module/admin/web/hongbo_board/board_file_del.js");
var hongbo_comment_view = require("./custom_module/admin/web/hongbo_board/comment_view.js");


var gallery_board_list = require("./custom_module/admin/web/gallery/board_list.js");
var gallery_board_view = require("./custom_module/admin/web/gallery/board_view.js");
var gallery_board_write = require("./custom_module/admin/web/gallery/board_write.js");
var gallery_board_save = require("./custom_module/admin/web/gallery/board_save.js");
var gallery_board_del = require("./custom_module/admin/web/gallery/board_del.js");
var gallery_board_file_del = require("./custom_module/admin/web/gallery/board_file_del.js");
var gallery_comment_view = require("./custom_module/admin/web/gallery/comment_view.js");

var free_board_list = require("./custom_module/admin/web/free_board/board_list.js");
var free_board_view = require("./custom_module/admin/web/free_board/board_view.js");
var free_board_write = require("./custom_module/admin/web/free_board/board_write.js");
var free_board_save = require("./custom_module/admin/web/free_board/board_save.js");
var free_board_del = require("./custom_module/admin/web/free_board/board_del.js");
var free_board_file_del = require("./custom_module/admin/web/free_board/board_file_del.js");
var free_comment_view = require("./custom_module/admin/web/free_board/comment_view.js");

/* 행사관리 */
var event_board_list = require("./custom_module/admin/web/event_board/board_list.js");
var event_board_view = require("./custom_module/admin/web/event_board/board_view.js");
var event_board_write = require("./custom_module/admin/web/event_board/board_write.js");
var event_board_save = require("./custom_module/admin/web/event_board/board_save.js");
var event_board_del = require("./custom_module/admin/web/event_board/board_del.js");
var event_board_file_del = require("./custom_module/admin/web/event_board/board_file_del.js");
var event_comment_view = require("./custom_module/admin/web/event_board/comment_view.js");

/* 행사관리신청 */
var event_request_list = require("./custom_module/admin/web/event_request/request_list.js");
var event_request_exceldown = require("./custom_module/admin/web/event_request/request_exceldown.js");
var request_modify = require("./custom_module/admin/web/event_request/request_modify.js");



/* code */
var code_list = require("./custom_module/admin/web/code/code_list.js");
var code_write = require("./custom_module/admin/web/code/code_write.js");
var code_write_child = require("./custom_module/admin/web/code/code_write_child.js");
var code_save = require("./custom_module/admin/web/code/code_save.js");
var code_del = require("./custom_module/admin/web/code/code_del.js");
var code_chk = require("./custom_module/admin/web/code/code_chk.js");

/* 일정 */
var calendar = require("./custom_module/admin/web/calendar/calendar.js");
var calendarList = require("./custom_module/admin/web/calendar/calendarList.js");
var calendarSave = require("./custom_module/admin/web/calendar/calendarSave.js");

//app
/* 탄소계산 */
var carbon_calc = require("./custom_module/user/intro/carbon_calc.js");

/* 계산기준 */
var calc_standard = require("./custom_module/user/intro/calc_standard.js");

/* 탄소실천 */
var certification = require("./custom_module/user/intro/certification.js");

/* 탄소실천인증 */
var camera = require("./custom_module/user/intro/camera.js");

/* 챌린지 */
var challenge_main = require("./custom_module/user/intro/challenge_main.js");

/* 커뮤니티 */
var community = require("./custom_module/user/community/community.js");

/* 회원가입 */
var signUp = require("./custom_module/user/intro/signUp.js");

/* 로그인 */
var login = require("./custom_module/user/intro/login.js");

/* 미니지구 */
var miniEarth = require("./custom_module/user/intro/miniEarth.js");

/* 미니지구 댓글 모두 보기 */
var miniEarthComment = require("./custom_module/user/intro/miniEarthComment.js");

/* 챌린지 상세보기 */
var challenge_detail = require("./custom_module/user/intro/challenge_detail.js");

/* 홈 */
var main = require("./custom_module/user/main/main.js");
var greeting = require("./custom_module/user/intro/greeting.js");
var history = require("./custom_module/user/intro/history.js");
var mark = require("./custom_module/user/intro/mark.js");
var orgchart = require("./custom_module/user/intro/orgchart.js");
var advisory = require("./custom_module/user/intro/advisory.js");
var ceo_history = require("./custom_module/user/intro/ceo_history.js");
var moral = require("./custom_module/user/intro/moral.js");
var place = require("./custom_module/user/intro/place.js");
var global = require("./custom_module/user/intro/global.js");
var index_detail = require("./custom_module/user/index_detail/index_detail.js");
var bizroom = require("./custom_module/user/bizroom/bizroom.js");
var biz_comment = require("./custom_module/user/bizroom/biz_comment.js");
var biz_change = require("./custom_module/user/bizroom/biz_change.js");
var biz_write = require("./custom_module/user/bizroom/biz_write.js");
var biz_save = require("./custom_module/user/bizroom/biz_save.js");
var biz_file_del = require("./custom_module/user/bizroom/biz_file_del.js");

/* 협회소개  */
/*
var greeting = require("./custom_module/user/intro/greeting.js"); // (사용x)
var introduce = require("./custom_module/user/intro/introduce.js"); // (사용x)
*/
var roles = require("./custom_module/user/intro/roles.js");
var introduce = require("./custom_module/user/intro/introduce.js"); 
var excutive = require("./custom_module/user/intro/excutive.js"); 
/* 회원검색 */
var member_list = require("./custom_module/user/member/member_list.js");			//회원검색 list
var member_list_data = require("./custom_module/user/member/member_list_data.js");			//회원검색 list_data
var member_officer_list = require("./custom_module/user/member/member_officer_list.js");			//회원임원검색 list
var member_officer_list_data = require("./custom_module/user/member/member_officer_list_data.js");			//회원임원검색 list_data
var member_view = require("./custom_module/user/member/member_view.js");			//회원검색 view
var member_modify = require("./custom_module/user/member/member_modify.js");			// 회원정보 수정
var member_setup = require("./custom_module/user/member/member_setup.js");			// 세팅
var member_setup_save = require("./custom_module/user/member/member_setup_save.js");			// 세팅저장
var member_getCode = require("./custom_module/user/member/member_getCode.js");			// 코드 세팅
var member_officer_view = require("./custom_module/user/member/member_officer_view.js");			//회원임원검색 list
var members_list = require("./custom_module/user/member/members_list.js");			//회원검색s list
var members_list_data = require("./custom_module/user/member/members_list_data.js");	
var members_view = require("./custom_module/user/member/members_view.js");

var club_list = require("./custom_module/user/member/club_list.js");			//회원검색 list
var club_list_data = require("./custom_module/user/member/club_list_data.js");			//회원검색 list_data
var club_view = require("./custom_module/user/member/club_view.js");			//회원검색 list
var club_view_data = require("./custom_module/user/member/club_view_data.js");			//회원검색 list

/* 공지사항 */
var user_brd_list = require("./custom_module/user/board/board_list.js");
var user_brd_view = require("./custom_module/user/board/board_view.js");
var user_comment_list = require("./custom_module/user/board/comment_list.js");
var user_comment_save = require("./custom_module/user/board/comment_save.js");
var user_brd_write = require("./custom_module/user/board/board_write.js");
var user_brd_save = require("./custom_module/user/board/board_save.js");
var user_brd_file_del = require("./custom_module/user/board/board_file_del.js");
var user_brd_del = require("./custom_module/user/board/board_del.js");

/* 동문홍보 */
var user_hongbo_brd_list = require("./custom_module/user/hongbo_board/board_list.js");
var user_hongbo_brd_view = require("./custom_module/user/hongbo_board/board_view.js");
var user_hongbo_comment_list = require("./custom_module/user/hongbo_board/comment_list.js");
var user_hongbo_comment_save = require("./custom_module/user/hongbo_board/comment_save.js");
var user_hongbo_brd_del = require("./custom_module/user/hongbo_board/board_del.js");
var user_hongbo_brd_write = require("./custom_module/user/hongbo_board/board_write.js");
var user_hongbo_brd_save = require("./custom_module/user/hongbo_board/board_save.js");
var user_hongbo_brd_file_del = require("./custom_module/user/hongbo_board/board_file_del.js");


/* 갤러리 */
var user_gallery_brd_list = require("./custom_module/user/gallery/board_list.js");
var user_gallery_brd_view = require("./custom_module/user/gallery/board_view.js");
var user_gallery_comment_list = require("./custom_module/user/gallery/comment_list.js");
var user_gallery_comment_save = require("./custom_module/user/gallery/comment_save.js");
var user_gallery_brd_del = require("./custom_module/user/gallery/board_del.js");
var user_gallery_brd_write = require("./custom_module/user/gallery/board_write.js");
var user_gallery_brd_save = require("./custom_module/user/gallery/board_save.js");
var user_gallery_brd_file_del = require("./custom_module/user/gallery/board_file_del.js");

/* 자유게시판 */
var user_free_brd_list = require("./custom_module/user/free_board/board_list.js");
var user_free_brd_view = require("./custom_module/user/free_board/board_view.js");
var user_free_brd_write = require("./custom_module/user/free_board/board_write.js");
var user_free_brd_save = require("./custom_module/user/free_board/board_save.js");
var user_free_comment_list = require("./custom_module/user/free_board/comment_list.js");
var user_free_comment_save = require("./custom_module/user/free_board/comment_save.js");
var user_free_brd_del = require("./custom_module/user/free_board/board_del.js");
var user_free_member_check = require("./custom_module/user/free_board/member_check.js");

/* 행사신청 */
var user_event_brd_list = require("./custom_module/user/event_board/board_list.js");
var user_event_brd_view = require("./custom_module/user/event_board/board_view.js");
var user_event_brd_write = require("./custom_module/user/event_board/board_write.js");
var user_event_brd_save = require("./custom_module/user/event_board/board_save.js");
var user_event_comment_list = require("./custom_module/user/event_board/comment_list.js");
var user_event_comment_save = require("./custom_module/user/event_board/comment_save.js");
var user_event_brd_del = require("./custom_module/user/event_board/board_del.js");
var user_event_member_check = require("./custom_module/user/event_board/member_check.js");
var user_event_request_save = require("./custom_module/user/event_board/event_request_save.js");
var user_event_request_list = require("./custom_module/user/event_request/request_list.js");
var user_request_modify = require("./custom_module/user/event_request/request_modify.js");
var user_event_brd_file_del = require("./custom_module/user/event_board/board_file_del.js");
/* 배너관리 */
var banner_list = require("./custom_module/admin/web/banner/banner_list.js");
var banner_view = require("./custom_module/admin/web/banner/banner_view.js");
var banner_write = require("./custom_module/admin/web/banner/banner_write.js");
var banner_save = require("./custom_module/admin/web/banner/banner_save.js");
var banner_del = require("./custom_module/admin/web/banner/banner_del.js");
var banner_file_del = require("./custom_module/admin/web/banner/banner_file_del.js");

/* ios 관련 */
var ios_user_check = require("./custom_module/ios/ios_user_check.js");
var ios_user_check_sms_send = require("./custom_module/ios/ios_user_check_sms_send.js");
var ios_user_check_last_proc = require("./custom_module/ios/ios_user_check_last_proc.js");
var ios_get_info = require("./custom_module/ios/ios_get_info.js");
var ios_index = require("./custom_module/ios/ios_index.js");
var simple_login = require("./custom_module/ios/simple_login.js");


/* 일정 */
var userCalendar = require("./custom_module/user/calendar/calendar.js");
var userCalendarList = require("./custom_module/user/calendar/calendarList.js");
var userCalendarSave = require("./custom_module/user/calendar/calendarSave.js");

var excutive_data = require("./custom_module/user/intro/excutive_data.js");
/*custom modules end*/

var app = express();

/*all environments*/
app.configure(function(){ 
	app.use(express.cookieParser());
	app.use(express.session({ secret : "secret key" }));
	app.use(express.static(__dirname));
	app.use(express.bodyParser({}));
	app.use(app.router);
});

/*파일다운로드*/
app.get('/download/:id/:rid/:table', function(req, res) {
	var filename = req.params.id;
	var filerealname = req.params.rid;
	var table = req.params.table;
	var filepath = __dirname + '\/file\/'+table+'\/' + filename;

	res.download(filepath, encodeURI(filerealname));
});

//ios 인증페이지
app.get("/certify_intro", function(request, response){
	response.redirect('/certify');
});

app.get("/certify", function(request, response){
	fs.readFile('views/ios/certify_page.html', "utf-8", function(error, data){
		// fs.readFile('views/ios/simple_login.html', "utf-8", function(error, data){
		//var payload = { create : 'flash21' }, secret = 'secret_token'
		//var token = jwt.encode(payload, secret);
		//esponse.redirect('/certify?token='+token);
		//response.setHeader("page_token", token);
		response.send(layout.include("ios_index", data));
	});
});

app.post("/simple_login", simple_login.listener);

app.post("/ios_user_check", ios_user_check.listener);
app.post("/ios_user_check_sms_send", ios_user_check_sms_send.listener);
app.post("/ios_user_check_last_proc", ios_user_check_last_proc.listener);
app.post("/ios_get_info", function(request, response){
	ios_get_info.listener(request, response);
});
app.get("/ios_index", function(request, response){
	ios_index.listener(request, response);
});

//관리자web 부분 start
//사용자 index web_admin
app.get("/admin/web", function(request, response){
	if(request.session.admin_yn=='Y'){
		response.redirect('/admin/web/orgm_list');
	}else{
		fs.readFile('views/admin/web/index.html', "utf-8", function(error, data){
			response.send(layout.include("web_index", data));
		});
	}
});

var webUrl = "/admin/web";

app.get(webUrl+"/login", admin_login.listener);
app.post(webUrl+"/login", admin_login.listener);

app.get(webUrl+"/logout", admin_logout.listener);
app.post(webUrl+"/logout", admin_logout.listener);
app.post(webUrl+"/orgm_udpateDisp", orgm_udpateDisp.listener);

app.get(webUrl+"/admin_writeForm", admin_writeForm.listener);
app.post(webUrl+"/admin_writeForm", admin_writeForm.listener);

app.post(webUrl+"/admin_id_chk", admin_id_chk.listener);

app.get(webUrl+"/admin_list", admin_list.listener);
app.post(webUrl+"/admin_list", admin_list.listener);

app.get(webUrl+"/admin_save", admin_save.listener);
app.post(webUrl+"/admin_save", admin_save.listener);

app.get(webUrl+"/admin_del", admin_del.listener);
app.post(webUrl+"/admin_del", admin_del.listener);

/* 2015.08.18 추가 */
app.get(webUrl+"/admin_addForSearch", admin_addForSearch.listener);
app.post(webUrl+"/admin_addForSearch", admin_addForSearch.listener);

app.get(webUrl+"/getAdminName", getAdminName.listener);
app.post(webUrl+"/getAdminName", getAdminName.listener);

app.get(webUrl+"/getRepre_number", getRepre_number.listener);
app.post(webUrl+"/getRepre_number", getRepre_number.listener);

app.get(webUrl+"/getSMS_sender", getSMS_sender.listener);
app.post(webUrl+"/getSMS_sender", getSMS_sender.listener);

/* orgmember_mngt 시작 */
app.get(webUrl+"/orgm_write", orgm_write.listener);
app.post(webUrl+"/orgm_write", orgm_write.listener);

app.get(webUrl+"/orgm_view", orgm_view.listener);
app.post(webUrl+"/orgm_view", orgm_view.listener);

app.post(webUrl+"/orgm_save", orgm_save.listener);
app.get(webUrl+"/orgm_save", orgm_save.listener);

app.get(webUrl+"/orgm_list", orgm_list.listener);
app.post(webUrl+"/orgm_list", orgm_list.listener);

app.get(webUrl+"/orgm_list_popup", orgm_list_popup.listener);
app.post(webUrl+"/orgm_list_popup", orgm_list_popup.listener);

app.post(webUrl+"/orgm_del", orgm_del.listener);
app.get(webUrl+"/orgm_del", orgm_del.listener);
 
app.post(webUrl+"/orgm_modify", orgm_modify.listener);
app.get(webUrl+"/orgm_modify", orgm_modify.listener);

app.post(webUrl+"/orgm_file_del", orgm_file_del.listener);
app.post(webUrl+"/orgm_officer_del", orgm_officer_del.listener);

app.get(webUrl+"/phoneNumChk", phoneNumChk.listener);
app.post(webUrl+"/phoneNumChk", phoneNumChk.listener);

app.post(webUrl + "/orgmemExceldown", orgmemExceldown.listener);

app.post(webUrl + "/code_club", code_club.listener);
/* orgmember_mngt 끝 */

app.get(webUrl+"/code_list", code_list.listener);
app.post(webUrl+"/code_list", code_list.listener);
app.get(webUrl+"/code_list_child", code_list.listener);
app.post(webUrl+"/code_list_child", code_list.listener);
app.get(webUrl+"/code_write", code_write.listener);
app.post(webUrl+"/code_write", code_write.listener);
app.get(webUrl+"/code_write_child", code_write_child.listener);
app.post(webUrl+"/code_write_child", code_write_child.listener);

/* code */
app.post(webUrl+"/code_save", code_save.listener);
app.get(webUrl+"/code_del", code_del.listener);
app.post(webUrl+"/code_del", code_del.listener);
app.post(webUrl+"/code_chk", code_chk.listener);

/* board */
app.get(webUrl+"/board_list", board_list.listener);
app.post(webUrl+"/board_list", board_list.listener);
app.get(webUrl+"/board_write", board_write.listener);
app.post(webUrl+"/board_write", board_write.listener);
app.post(webUrl+"/board_del", board_del.listener);
app.get(webUrl+"/board_view", board_view.listener);
app.post(webUrl+"/board_view", board_view.listener);
app.post(webUrl+"/board_save", board_save.listener);
app.get(webUrl+"/board_file_del", board_file_del.listener);
app.post(webUrl+"/board_file_del", board_file_del.listener);
app.get(webUrl+"/comment_view", comment_view.listener);

/* hongbo board - 사용x */
app.get(webUrl+"/hongbo_board_list", hongbo_board_list.listener);
app.post(webUrl+"/hongbo_board_list", hongbo_board_list.listener);
app.get(webUrl+"/hongbo_board_write", hongbo_board_write.listener);
app.post(webUrl+"/hongbo_board_write", hongbo_board_write.listener);
app.get(webUrl+"/hongbo_board_view", hongbo_board_view.listener);
app.post(webUrl+"/hongbo_board_view", hongbo_board_view.listener);
app.post(webUrl+"/hongbo_board_save", hongbo_board_save.listener);
app.post(webUrl+"/hongbo_board_del", hongbo_board_del.listener);
app.get(webUrl+"/hongbo_board_file_del", hongbo_board_file_del.listener);
app.post(webUrl+"/hongbo_board_file_del", hongbo_board_file_del.listener);
app.get(webUrl+"/hongbo_comment_view", hongbo_comment_view.listener);


/* hongbo board - 사용x */
app.get(webUrl+"/gallery_board_list", gallery_board_list.listener);
app.post(webUrl+"/gallery_board_list", gallery_board_list.listener);
app.get(webUrl+"/gallery_board_write", gallery_board_write.listener);
app.post(webUrl+"/gallery_board_write", gallery_board_write.listener);
app.get(webUrl+"/gallery_board_view", gallery_board_view.listener);
app.post(webUrl+"/gallery_board_view", gallery_board_view.listener);
app.post(webUrl+"/gallery_board_save", gallery_board_save.listener);
app.post(webUrl+"/gallery_board_del", gallery_board_del.listener);
app.get(webUrl+"/gallery_board_file_del", gallery_board_file_del.listener);
app.post(webUrl+"/gallery_board_file_del", gallery_board_file_del.listener);
app.get(webUrl+"/gallery_comment_view", gallery_comment_view.listener);

/* free board - 사용x */
app.get(webUrl+"/free_board_list", free_board_list.listener);
app.post(webUrl+"/free_board_list", free_board_list.listener);
app.get(webUrl+"/free_board_write", free_board_write.listener);
app.post(webUrl+"/free_board_write", free_board_write.listener);
app.get(webUrl+"/free_board_view", free_board_view.listener);
app.post(webUrl+"/free_board_view", free_board_view.listener);
app.post(webUrl+"/free_board_save", free_board_save.listener);
app.post(webUrl+"/free_board_del", free_board_del.listener);
app.get(webUrl+"/free_board_file_del", free_board_file_del.listener);
app.post(webUrl+"/free_board_file_del", free_board_file_del.listener);
app.get(webUrl+"/free_comment_view", free_comment_view.listener);

/* 행사관리 */
app.get(webUrl+"/event_board_list", event_board_list.listener);
app.post(webUrl+"/event_board_list", event_board_list.listener);
app.get(webUrl+"/event_board_write", event_board_write.listener);
app.post(webUrl+"/event_board_write", event_board_write.listener);
app.get(webUrl+"/event_board_view", event_board_view.listener);
app.post(webUrl+"/event_board_view", event_board_view.listener);
app.post(webUrl+"/event_board_save", event_board_save.listener);
app.post(webUrl+"/event_board_del", event_board_del.listener);
app.get(webUrl+"/event_board_file_del", event_board_file_del.listener);
app.post(webUrl+"/event_board_file_del", event_board_file_del.listener);
app.get(webUrl+"/event_comment_view", event_comment_view.listener);

/* 행사신청관리 */
app.get(webUrl+"/event_request_list", event_request_list.listener);
app.post(webUrl+"/event_request_list", event_request_list.listener);
app.post(webUrl+"/eventExceldown", event_request_exceldown.listener);
app.post(webUrl+"/request_modify", request_modify.listener);
app.get("/event_req_list", user_event_request_list.listener);
app.post("/event_req_list", user_event_request_list.listener);
app.post("/request_modify", user_request_modify.listener);
app.post("/event_brd_file_del", user_event_brd_file_del.listener);


/* 배너관리 */
app.get(webUrl+"/banner_list", banner_list.listener);
app.post(webUrl+"/banner_list", banner_list.listener);
app.get(webUrl+"/banner_view", banner_view.listener);
app.post(webUrl+"/banner_view", banner_view.listener);
app.get(webUrl+"/banner_write", banner_write.listener);
app.post(webUrl+"/banner_write", banner_write.listener);
app.get(webUrl+"/banner_save", banner_save.listener);
app.post(webUrl+"/banner_save", banner_save.listener);
app.get(webUrl+"/banner_del", banner_del.listener);
app.post(webUrl+"/banner_del", banner_del.listener);
app.get(webUrl+"/banner_file_del", banner_file_del.listener);
app.post(webUrl+"/banner_file_del", banner_file_del.listener);

/* 일정 */
app.get(webUrl+"/calendar", calendar.listener);
app.post(webUrl+"/calendar", calendar.listener);
app.get(webUrl+"/calendarList", calendarList.listener);
app.post(webUrl+"/calendarList", calendarList.listener);
app.get(webUrl+"/calendarSave", calendarSave.listener);
app.post(webUrl+"/calendarSave", calendarSave.listener);

//관리자web 부분 end

//app부분 strat
/* 탄소계산 */
app.get("/carbon_calc", carbon_calc.listener);
app.post("/carbon_calc", carbon_calc.listener);

/* 계산기준 */
app.get("/calc_standard", calc_standard.listener);
app.post("/calc_standard", calc_standard.listener);

/* 탄소실천 */
app.get("/certification", certification.listener);
app.post("/certification", certification.listener);

/* 탄소실천인증 */
app.get("/camera", camera.listener);
app.post("/camera", camera.listener);

/* 챌린지 */
app.get("/challenge_main", challenge_main.listener);
app.post("/challenge_main", challenge_main.listener);

/* 커뮤니티 */
app.get("/community", community.listener);
app.post("/community", community.listener);

/* 회원가입 */
app.get("/signUp", signUp.listener);
app.post("/signUp", signUp.listener);

/* 로그인 */
app.get("/login", login.listener);
app.post("/login", login.listener);

/* 미니지구 */
app.get("/miniEarth", miniEarth.listener);
app.post("/miniEarth", miniEarth.listener);

/* 미니지구 댓글 모두 보기 */
app.get("/miniEarthComment", miniEarthComment.listener);
app.post("/miniEarthComment", miniEarthComment.listener);

/* 탄소계산 */
app.get("/challenge_detail", challenge_detail.listener);
app.post("/challenge_detail", challenge_detail.listener);


/* main */
app.get("/", main.listener);

/* 협회소개  */

app.get("/greeting", greeting.listener);
app.post("/greeting", greeting.listener);
app.get("/ceo_history", ceo_history.listener);
app.post("/ceo_history", ceo_history.listener);

app.get("/roles", roles.listener);
app.post("/roles", roles.listener);

app.get("/excutive", excutive.listener);
app.post("/excutive", excutive.listener);

app.get("/history", history.listener);
app.post("/history", history.listener);
app.get("/mark", mark.listener);
app.post("/mark", mark.listener);
app.get("/orgchart", orgchart.listener);
app.post("/orgchart", orgchart.listener);
app.get("/advisory", advisory.listener);
app.post("/advisory", advisory.listener);

app.get("/global", global.listener);
app.post("/global", global.listener);
app.get("/moral", moral.listener);
app.post("/moral", moral.listener);
app.get("/place", place.listener);
app.post("/place", place.listener);
app.get("/introduce", introduce.listener);
app.post("/introduce", introduce.listener);
app.get("/index_detail", index_detail.listener);
app.post("/index_detail", index_detail.listener);
app.get("/bizroom", bizroom.listener);
app.post("/bizroom", bizroom.listener);
app.post("/biz_save", biz_save.listener);
app.get("/biz_comment", biz_comment.listener);
app.post("/biz_comment", biz_comment.listener);
app.get("/biz_change", biz_change.listener);
app.post("/biz_change", biz_change.listener);
app.get("/biz_write", biz_write.listener);
app.post("/biz_write", biz_write.listener);
app.post("/biz_file_del", biz_file_del.listener);

/* 회원검색 */
app.get("/member_list", member_list.listener);				//회원검색 list
app.post("/member_list", member_list.listener);				
app.get("/member_list_data", member_list_data.listener);				//회원검색 list
app.post("/member_list_data", member_list_data.listener);
app.get("/member_officer_list", member_officer_list.listener);				//회원임원검색 list
app.post("/member_officer_list", member_officer_list.listener);				
app.get("/member_officer_list_data", member_officer_list_data.listener);				//회원임원검색 list
app.post("/member_officer_list_data", member_officer_list_data.listener);

app.get("/member_officer_view", member_officer_view.listener);				//회원임원검색 list
app.post("/member_officer_view", member_officer_view.listener);		
	
app.get("/members_list", members_list.listener);				//회원검색 list
app.post("/members_list", members_list.listener);

app.get("/members_view", members_view.listener);				//회원검색 list
app.post("/members_view", members_view.listener);

app.get("/members_list_data", members_list_data.listener);				//회원검색 list
app.post("/members_list_data", members_list_data.listener);


app.get("/club_list", club_list.listener);				//회원검색 list
app.post("/club_list", club_list.listener);

app.get("/club_view", club_view.listener);				//회원검색 list
app.post("/club_view", club_view.listener);	

app.post("/club_view_data", club_view_data.listener);	

app.get("/club_list_data", club_list_data.listener);				//회원검색 list
app.post("/club_list_data", club_list_data.listener);	

app.get("/member_view", member_view.listener);				//회원검색 view
app.post("/member_view", member_view.listener);				
app.post("/member_modify", member_modify.listener);				
app.post("/member_setup", member_setup.listener);				
app.post("/member_setup_save", member_setup_save.listener);				

app.get("/member_getCode", member_getCode.listener);				//회원코드
app.post("/member_getCode", member_getCode.listener);

/* 공지사항 */
app.get("/board_list", user_brd_list.listener);		//board list
app.post("/board_list", user_brd_list.listener);			
app.get("/board_view", user_brd_view.listener);		//board view
app.post("/board_view", user_brd_view.listener);
app.post("/comment_list", user_comment_list.listener);
app.post("/comment_save", user_comment_save.listener);
app.get("/board_write", user_brd_write.listener);		//board write
app.post("/board_write", user_brd_write.listener);
app.get("/board_save", user_brd_save.listener);		//board save
app.post("/board_save", user_brd_save.listener);
app.post("/board_del", user_brd_del.listener);
app.post("/board_file_del", user_brd_file_del.listener);

/* 동문홍보 */
app.get("/hongbo_board_list", user_hongbo_brd_list.listener);		//hongbo_board list
app.post("/hongbo_board_list", user_hongbo_brd_list.listener);			
app.get("/hongbo_board_view", user_hongbo_brd_view.listener);		//hongbo_board view
app.post("/hongbo_board_view", user_hongbo_brd_view.listener);
app.post("/hongbo_comment_list", user_hongbo_comment_list.listener);
app.post("/hongbo_comment_save", user_hongbo_comment_save.listener);
app.get("/hongbo_board_write", user_hongbo_brd_write.listener);
app.post("/hongbo_board_write", user_hongbo_brd_write.listener);
app.post("/hongbo_board_save", user_hongbo_brd_save.listener);
app.post("/hongbo_board_del", user_hongbo_brd_del.listener);
app.post("/hongbo_board_file_del", user_hongbo_brd_file_del.listener);


/* 갤러리 */
app.get("/gallery_board_list", user_gallery_brd_list.listener);		//hongbo_board list
app.post("/gallery_board_list", user_gallery_brd_list.listener);			
app.get("/gallery_board_view", user_gallery_brd_view.listener);		//hongbo_board view
app.post("/gallery_board_view", user_gallery_brd_view.listener);
app.post("/gallery_comment_list", user_gallery_comment_list.listener);
app.post("/gallery_comment_save", user_gallery_comment_save.listener);
app.get("/gallery_board_write", user_gallery_brd_write.listener);
app.post("/gallery_board_write", user_gallery_brd_write.listener);
app.post("/gallery_board_save", user_gallery_brd_save.listener);
app.post("/gallery_board_del", user_gallery_brd_del.listener);
app.post("/gallery_board_file_del", user_gallery_brd_file_del.listener);



/* 자유게시판 */
app.get("/free_board_list", user_free_brd_list.listener);		//free_board list
app.post("/free_board_list", user_free_brd_list.listener);			
app.get("/free_board_view", user_free_brd_view.listener);		//free_board view
app.post("/free_board_view", user_free_brd_view.listener);
app.get("/free_brd_write", user_free_brd_write.listener);		//user_free_brd_write
app.post("/free_brd_write", user_free_brd_write.listener);
app.get("/free_brd_save", user_free_brd_save.listener);			//user_free_brd_save
app.post("/free_brd_save", user_free_brd_save.listener);
app.get("/free_brd_del", user_free_brd_del.listener);
app.post("/free_brd_del", user_free_brd_del.listener);
app.post("/free_comment_list", user_free_comment_list.listener);
app.post("/free_comment_save", user_free_comment_save.listener);
app.post("/free_member_check", user_free_member_check.listener);	// 자유게시판 등록,수정,삭제를 위한 회원체크

/* 행사신청 */
app.get("/event_board_list", user_event_brd_list.listener);		
app.post("/event_board_list", user_event_brd_list.listener);			
app.get("/event_board_view", user_event_brd_view.listener);		
app.post("/event_board_view", user_event_brd_view.listener);
app.get("/event_brd_write", user_event_brd_write.listener);		
app.post("/event_brd_write", user_event_brd_write.listener);
app.get("/event_brd_save", user_event_brd_save.listener);		
app.post("/event_brd_save", user_event_brd_save.listener);
app.get("/event_brd_del", user_event_brd_del.listener);
app.post("/event_brd_del", user_event_brd_del.listener);
app.post("/event_comment_list", user_event_comment_list.listener);
app.post("/event_comment_save", user_event_comment_save.listener);
app.post("/event_member_check", user_event_member_check.listener);	// 행사신청을 위한 회원체크
app.get("/event_request_save", user_event_request_save.listener);
app.post("/event_request_save", user_event_request_save.listener);


/* 일정 */
app.get("/userCalendar", userCalendar.listener);
app.post("/userCalendar", userCalendar.listener);
app.get("/userCalendarList", userCalendarList.listener);
app.post("/userCalendarList", userCalendarList.listener);
app.get("/userCalendarSave", userCalendarSave.listener);
app.post("/userCalendarSave", userCalendarSave.listener);


app.get("/excutive_data", excutive_data.listener);
app.post("/excutive_data", excutive_data.listener);


app.get("/fail", function(request, response){
	fail.listener(request, response);
});

var fail = require("./custom_module/fail.js");

app.get("/fail2", function(request, response){
	fail2.listener(request, response);
});

var fail2 = require("./custom_module/fail2.js");
var andhttp = require("./custom_module/android/andhttp.js");

app.post("/insertPushData", andhttp.action);

var app_version = require("./function/app_version.js");
app.post("/app_version", app_version.action);

//db 커넥션이 끊어지는것을 막기위해
function keepalive() {
	// console.log("----------------");
	// console.log("keepalive()");
	// console.log("first:"+db.state);
	
    db.query('select 1', [], function(err, result) {
	    //if(err) return console.log(err);
		if(err) console.log(err);
// Successul keepalive

		// console.log("last:"+db.state);
		// console.log("----------------");
    });
}	

setInterval(keepalive, 5000);	

/*서버시작 & 포트*/
var server = http.createServer(app).listen(9078, function(){
	console.log("Rotary club nodeJs SERVER START~~~!! port 9078!! ");
});

process.on
(
    'uncaughtException',
    function (err)
    {
        var stack = err.stack;
        var timeout = 1;

        console.log("#######################################################################################################");
        console.log("SERVER CRASHED!");
        console.log("#######################################################################################################");
        console.log(err, stack);
        console.log("#######################################################################################################");

    }
);
