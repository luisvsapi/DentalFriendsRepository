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
        select: function (arg) { },
        eventClick: function (arg) {  
            const startDate = dateToInt(arg.event.start); 
            const appointment = appointmentAvaliable.has(startDate);
            if (appointment) {
                if(appointmentAvaliable.get(startDate).state == 0){
                    $('#modalAppointment').modal('toggle');
                    $('#idAppointment').val(appointmentAvaliable.get(startDate).id)             
                } 
            }  
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
  
function fillCalendar() { 
    getAvaliablesAppointment() 
    clearCalendar(); 
}

function clearCalendar() { 
    calendar.getEvents().forEach(element => {
        element.remove();
    });
}

function getAvaliablesAppointment() { 
    appointmentAvaliable = new Map() 
    if ($("#selectDoctor").val() !== '') {
        getFetch(`/appointment/byUser/${$("#selectDoctor").val()}`).then((res) => { 
            clearCalendar()
            res.forEach(element => {
                appointmentAvaliable.set(new Date(element.date).getTime(), element)       
            })
            addEventsCalendar()
        })      
    }  
}

function addEventsCalendar() {
    appointmentAvaliable.forEach(element => {
        calendar.addEvent({
            start: element.date,
            end: modificateActualTime('minute', element.date, 15),
            backgroundColor: element.state == 1 ? 'red' : 'blue'
        });
    })
}

async function loadDoctors() {
    let listDoctors = await getFetch('/user/allAppoinment')
    let htmlSelect = `<option value=''>Seleccione doctor</option>`
    listDoctors.forEach(element => {
        htmlSelect += `<option value=${element.id}>${element.user_name}</option>`
    })
    $('#selectDoctor').html(htmlSelect);
}

$('#selectDoctor').change(function (e) { 
    getAvaliablesAppointment()
});

$('button.fc-prev-button').click(function (e) {
    console.log(1);
});

$('#modalForm').submit(function (e) {
    e.preventDefault()  
    postFetch(`/appointment/setAppointment`, objectifyForm($(this).serializeArray())).then((res) => { 
        if(res.message==1){ 
            alertify.success('Cita reservada exitosamente'); 
            getAvaliablesAppointment()
            $('#modalAppointment').modal('toggle');
        } 
    })   
});
 
$('button.fc-next-button').click(function (e) {
    console.log(2);
});

function initPage() {
    loadDoctors()
}

/* alertify.confirm('Eliminar cita', 'Esta seguro que desea borrar la cita?', function () {
    arg.event.remove();
    alertify.success('Cita cancelada');
}, function () { }); */

initPage()