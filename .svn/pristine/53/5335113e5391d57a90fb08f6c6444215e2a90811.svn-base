/* ****************
 *  일정 편집
 * ************** */
var editEvent = function (event, element, view) {

    $('.popover.fade.top').remove();
    $(element).popover("hide");

    if (event.allDay === true) {
        editAllDay.prop('checked', true);
    } else {
        editAllDay.prop('checked', false);
    }

    if (event.end === null) {
        event.end = event.start;
    }

 

    // modalTitle.html(event.start.format('YYYY-MM-DD HH:mm'));
    editTitle.text(event.title);
    editStart.text(event.start.format('YYYY-MM-DD HH:mm'));
    editDesc.text(event.description);
    if ( event.description == null || event.description == undefined || event.description == ''  || event.description == 'null') {
        $("#edit-desc-css").css("display", "none");
    }else{
        $("#edit-desc-css").css("display", "block");
    }
    
    editColor.val(event.backgroundColor).css('color', event.backgroundColor);
    if (event.allDay === true && event.end !== event.start) {
        if(event.start.format('YYYY년 MM월 DD일') == moment(event.end).subtract(1, 'days').format('YYYY년 MM월 DD일')){
            modalTitle.html(event.start.format('YYYY년 MM월 DD일'));
        }else {
            modalTitle.html(event.start.format('YYYY년 MM월 DD일')+' ~ '+moment(event.end).subtract(1, 'days').format('YYYY년 MM월 DD일'));
        }
        
        // editEnd.text(moment(event.end).subtract(1, 'days').format('YYYY-MM-DD HH:mm'))
    } else {
        if(event.start.format('YYYY년 MM월 DD일') == event.end.format('YYYY년 MM월 DD일')){
            modalTitle.html(event.start.format('YYYY년 MM월 DD일'));
        }else{
            modalTitle.html(event.start.format('YYYY년 MM월 DD일')+'~'+event.end.format('YYYY년 MM월 DD일'));
        }
        // modalTitle.html(event.start.format('YYYY년MM월DD일')+'~'+event.end.format('YYYY년MM월DD일'));
        // editEnd.text(event.end.format('YYYY-MM-DD HH:mm'));
    }
    addBtnContainer.hide();
    modifyBtnContainer.show();
    eventModal.modal('show');
    
    //업데이트 버튼 클릭시
    $('#updateEvent').unbind();
    $('#updateEvent').on('click', function () {
    	var statusAllDay;
        var startDate;
        var endDate;
        var displayDate;

        if (editAllDay.is(':checked')) {
            statusAllDay = true;
            startDate = moment(editStart.val()).format('YYYY-MM-DD');
            endDate = moment(editEnd.val()).format('YYYY-MM-DD');
            displayDate = moment(editEnd.val()).add(1, 'days').format('YYYY-MM-DD');
        } else {
            statusAllDay = false;
            startDate = editStart.val();
            endDate = editEnd.val();
            displayDate = endDate;
        }
        
        event.allDay = statusAllDay;
        event.title = editTitle.val();
        event.start = startDate;
        event.end = displayDate;
        event.backgroundColor = editColor.val();
        event.description = editDesc.val();
    	
    	var eventData = {
			status: "U",
	    	cal_id: event.cal_id,
	        title: editTitle.val(),
	        start: startDate,
	        end: displayDate,
	        backgroundColor: editColor.val(),
	        textColor: '#ffffff',
	        description: editDesc.val(),
	        allDay: statusAllDay
	    };
    	

        if (eventData.start > eventData.end) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (eventData.title == '') {
            alert('일정명은 필수입니다.')
            return false;
        }

        $("#calendar").fullCalendar('updateEvent', event);
        eventModal.modal('hide');
        
        //일정 업데이트
        $.ajax({
            type: "post",
            url: "/userCalendarSave",
            data: {
                "eventData" : eventData
            },
            success: function (response) {
                alert("수정되었습니다.");
            }
        });
    });

    // 삭제버튼
    $('#deleteEvent').on('click', function () {
        $('#deleteEvent').unbind();
        $("#calendar").fullCalendar('removeEvents', [event._id]);
        eventModal.modal('hide');
        
        var eventData = {
    		status: "D",
	    	cal_id: event.cal_id
	    };

        //삭제시
        $.ajax({
            type: "post",
            url: "/userCalendarSave",
            data: {
                "eventData" : eventData
            },
            success: function (response) {
                alert("수정되었습니다.");
            }
        });
    });
};