var appointmentSelect = -1;
var appointmentAvaliable = new Map()
var calendar

$(document).ready(function () {
    startCalendar();
    fillCalendar()
});

function startCalendar() {
    calendar = new FullCalendar.Calendar(document.getElementById('calendarElement'), {
        initialView: 'timeGridWeek',
        allDaySlot: false,
        locale: 'es',
        nowIndicator: true,  
        contentHeight: 'auto', 
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        validRange: {
            start: Date.now(),
            end: modificateActualTime('day', new Date(), 15)
        },
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
        },
        slotDuration: '00:20',
        initialDate: Date.now(),
        slotMinTime: '07:00',
        slotMaxTime: '20:00',
        navLinks: true,
        selectable: true,
        selectMirror: true, 
        dateClick: function (info) {
            alertify.confirm('Agendar cita', 'Desea agendar una cita?', function () {
                alertify.success('Cita agendada exitosamente')
                createAppointment(info.dateStr) 
            }, noActionAllert).set(aceptOrNot);
        },
        eventClick: function (arg) {
            let dateStart = arg.event.start
            deleteAppointment(dateStart);
        },
        customButtons: {
            prev: {
                text: 'Prev',
                click: function () {
                    calendar.prev();
                    fillCalendar()
                }
            },
            next: {
                text: 'Next',
                click: function () {
                    calendar.next();
                    fillCalendar()
                }
            },
        },
        editable: true,
        dayMaxEvents: true,
        events: []
    });
    calendar.render();
}

function deleteAppointment(startDate = '') {
    let startDateTmp = dateToInt(startDate);
    if (appointmentAvaliable.has(startDateTmp)) {
        let appointmentSelect = appointmentAvaliable.get(startDateTmp);
        alertify.confirm('Eliminar cita', `Desea eliminar esta cita? <br>${printUserDetails(appointmentSelect)}`, function () {
            deleteFetch(`/appointment/delete`, { id: appointmentSelect.id }).then((res) => {
                alertify.success('Cita eliminada correctamente');
                fillCalendar();
            })  
        }, noActionAllert).set(aceptOrNot);
    }
} 

function printUserDetails(userDetails = {}) {
    if (userDetails.pacient) {
        return `
        <br> 
        <table class="table table-sm table-bordered table-hover">        
            <tr>
                <td>Cedula</td>
                <td>${userDetails.pacient.id_card_pacient} </td>
            </tr>
            <tr>
                <td>Celular</td>
                <td>${userDetails.pacient.phone_pacient}</td>
            </tr>
            <tr>
                <td>Correo</td>
                <td>${userDetails.pacient.email_pacient}</td>
            </tr>
        </table> 
            `
    }
    return ``
}

function createAppointment(dateIso = '') {
    postFetch(`/appointment/insert`, { id_user: document.cookie.user, date: dateIso }).then((res) => {
        fillCalendar();
    })
}

function fillCalendar() {
    clearCalendar()
    getAvaliablesAppointment()
}

function clearCalendar() {
    calendar.getEvents().forEach(element => {
        element.remove();
    });
}

function getAvaliablesAppointment() {
    appointmentAvaliable = new Map()
    getFetch(`/appointment/byUser/${document.cookie.user}`).then((res) => {
        res.forEach(element => {
            appointmentAvaliable.set(new Date(element.date).getTime(), element)
        })
        addEventsCalendar();
    })
}

function addEventsCalendar() {
    appointmentAvaliable.forEach(element => {
        calendar.addEvent({
            start: element.date,
            end: modificateActualTime('minute', element.date, 15),
            backgroundColor: element.state == 1 ? 'red' : 'blue',
        });
    });
}
 
$('button.fc-next-button').click(function (e) {
    console.log(2);
});

$('button.fc-prev-button').click(function (e) {
    console.log(1);
});
