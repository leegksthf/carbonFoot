var FCM = require('fcm-push');
exports.push = function (type, pushId, senderName, message, sender, roomNum, roomName, popup_yn){
	var apiKey = 'AAAAgJcnfVA:APA91bFBgaPN2WzSweE24VlA5PhQE5O-MzVjAVLAdJhEcw-Au2CvChphnoW3Vl3ooqRTR1vqce-QhI1Y2Q3FKgw1Yx-7oPFV1LrWMqBW1uLols7CUX1UVLDG6bsxUmR4wlXDK22TkRqx'; //서버키 넣는 곳

	var token = pushId; //푸쉬 알림 보낼 클라이언트 토큰 넣는 곳
	
	var bodyMsg = "게시판에 새글이 등록되었습니다.";
	if(type == "notice"){
		bodyMsg = "공지사항 "+bodyMsg; 
	}else if(type == "free"){
		bodyMsg = "경조사 "+bodyMsg;
	}else if(type == "event"){
		bodyMsg = "행사참석 " +bodyMsg
	}else if(type == "hongbo"){
		bodyMsg = "갤러리 " + bodyMsg
	}
	console.log("function type"  + type);
	console.log("function roomNum"  + roomNum);
	var message = {
	    to: token,
	    //notification을 지우면 안드로이드 FCM에 onMessageReceived 메서드를 타서 화면을깨우고 푸시알림, 있으면 화면 안깨우고 푸시알림만 
		/*notification: {
		    title: "국제라이온즈협회(대구회)알림",
		    body: bodyMsg
			//sound: "default"
		},*/
		data: {
		    title: "로타리클럽",
		    body: bodyMsg,			
		    board_id: type,
		    board_no: roomNum
		}
	};

	// 푸시알림 보내는 곳
	var fcm = new FCM(apiKey);

	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("push메시지 발송 실패");
	        console.error(err);
	        return;
	    } else {
	        console.log("push메세지 발송 성공");
	        console.log(response);
	    }
	});	
}