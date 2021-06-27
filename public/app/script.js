async function postUrl(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

async function renderCalendar(today = Date(), start = getMonday(Date()), end = getSunday(Date())){
    today = new Date(today)
    let dates = {
        start : start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+' 00:00:00',
        end : end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()+' 23:59:59'
    }

    const events = await postUrl(`${APP_URL}/api/calendar`, dates).then(data => {
        let events = []
        for(let i=0; i<data.events.length; i++){
            let event = {
                title: data.events[i].title,
                start: data.events[i].start,
                end: data.events[i].end,
                id: data.events[i].id,
                className: data.events[i].className,
            }
            events.push(event)
        }
        return events
    })

    var calendarEl = document.getElementById('calendar')
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        themeSystem: 'standard',
        initialView: 'timeGridWeek',
        hiddenDays: [],
        nowIndicator: true,
        selectable: true,
        editable: true,
        firstDay: 1,
        allDaySlot: false,
        dayHeaderFormat: {
            weekday: 'short',
            day: 'numeric'
        },
        initialDate: today,
        events: events,
        customButtons: {
            next: {
                click: function() {
                    nextWeek = new Date( new Date(today).setDate( new Date(today).getDate()+7))
                    renderCalendar(nextWeek, getMonday(nextWeek), getSunday(nextWeek))
                }
            },
            prev: {
                click: function() {
                    prevWeek = new Date( new Date(today).setDate( new Date(today).getDate()-7))
                    renderCalendar(prevWeek, getMonday(prevWeek), getSunday(prevWeek))
                }
            }
        },
        eventDrop: function(info) {
            updateEvent(info)
        },
        eventResize: function(info) {
            updateEvent(info)
        },
        eventClick: function(info) {
            eventDetails(info)
        },
        select: function(info) {
            eventDetails(info)
        },
    });
    calendar.render();
}

function eventDetails(info){
    if(info.hasOwnProperty('event')){
        console.log(info.event.id)
        console.log(info.event.classNames[0])
        $('#idInput').val(info.event.id)
        $('#titleInput').val(info.event.title)
        $('#eventModalLabel').html(info.event.title)
        $(`input:radio[name="color"][value="${info.event.classNames[0]}"]`).prop('checked', true);
        document.querySelector('.modal-header').className = `modal-header ${info.event.classNames[0]}`
        $('#startInput').val(info.event.startStr.substring(0, info.event.startStr.length - 6))
        $('#endInput').val(info.event.endStr.substring(0, info.event.endStr.length - 6))
        $('#deleteButton').removeClass('d-none')
    }
    else{
        $('#idInput').val(0)
        $('#titleInput').val('')
        $('#eventModalLabel').html('Event')
        $(`input:radio[name="color"][value="bg-primary"]`).prop('checked', true);
        document.querySelector('.modal-header').className = 'modal-header bg-primary'
        $('#startInput').val(info.startStr.substring(0, info.startStr.length - 6))
        $('#endInput').val(info.endStr.substring(0, info.endStr.length - 6))
        $('#deleteButton').addClass('d-none')
    }
    $('#eventModal').modal('show')
}

function storeEvent(){
    let title = $('#titleInput').val()
    let start = new Date($('#startInput').val())
    let end = new Date($('#endInput').val())
    let className = $('input[name="color"]:checked').val()
    let data = {
            title : title,
            className : className,
            start : start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+' '+start.getHours()+':'+start.getMinutes(),
            end : end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()+' '+end.getHours()+':'+end.getMinutes()
        }
    if($('#idInput').val()==0){
        postUrl(`${APP_URL}/api/calendar/store`, data).then(data => {
            showToastr(data.type,data.message)
            renderCalendar(start, getMonday(start), getSunday(start))
            $('#eventModal').modal('hide')
        })
    }
    else{
        let id = $('#idInput').val()
        postUrl(`${APP_URL}/api/calendar/${id}`, data).then(data => {
            showToastr(data.type,data.message)
            renderCalendar(start, getMonday(start), getSunday(start))
            $('#eventModal').modal('hide')
        })
    }
}

function updateEvent(info){
    let id = info.event.id
    let title = info.event.title
    let start = new Date(info.event.start)
    let end = new Date(info.event.end)
    let className = info.event.classNames[0]
    let data = {
        title : title,
        className : className,
        start : start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+' '+start.getHours()+':'+start.getMinutes(),
        end : end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()+' '+end.getHours()+':'+end.getMinutes()
    }
    postUrl(`${APP_URL}/api/calendar/${id}`, data).then(data => {
        showToastr(data.type,data.message)
        renderCalendar(start, getMonday(start), getSunday(start))
        $('#eventModal').modal('hide')
    })
}

function deleteEvent(){
    let id = $('#idInput').val()
    let start = $('#startInput').val()
    postUrl(`${APP_URL}/api/calendar/${id}/destroy`).then(data => {
        showToastr(data.type,data.message)
        renderCalendar(start, getMonday(start), getSunday(start))
        $('#eventModal').modal('hide')
    })
}

function getMonday(d) {
    d = new Date(d)
    var day = d.getDay()
    var diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
    return new Date(d.setDate(diff))
}

function getSunday(d) {
    d = new Date(d)
    var day = d.getDay()
    var diff = d.getDate() + 7 - day // adjust when day is sunday
    return new Date(d.setDate(diff))
}

function showToastr(type = 'success', message = ''){
    if(type=='success') toastr.success(message)
    if(type=='warning') toastr.warning(message)
    if(type=='error') toastr.error(message)
    if(type=='info') toastr.info(message)
}
