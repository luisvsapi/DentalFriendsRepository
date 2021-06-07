var appointmentSelect = -1;
var appointmentAvaliable = new Map();
var calendar;

$(document).ready(function () {
    startCalendar();
    fillCalendar()
});

function momentoCargarxD(){
    let data = [
        {
          title: 'All Day Event',
          start: '2021-06-01'
        },
        {
          title: 'Long Event',
          start: '2021-06-07',
          end: '2021-06-10'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2021-06-09T16:00:00'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2021-06-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2021-06-11',
          end: '2021-06-13'
        },
        {
          title: 'Meeting',
          start: '2021-06-12T10:30:00',
          end: '2021-06-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2021-06-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2021-06-12T14:30:00'
        },
        {
          title: 'Birthday Party',
          start: '2021-06-13T07:00:00'
        },
        {
          title: 'Click for Google',
          start: '2021-06-28'
        }
      ];
      return data;
}


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendarElement');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      locale: 'es',
      nowIndicator: true,  
      contentHeight: 'auto',
      initialDate: Date.now(),
      slotMinTime: '07:00',
      slotMaxTime: '20:00',
      selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
      events: momentoCargarxD(),
      /* dateClick: function(info){
        alert("Momento")
        console.log("Recuperado:",info)
      }, */
      select: function(info){
        alert("Momento insertar rango")
        console.log("Recuperado:",info)
        //Agregar a la Base De Datos nueva cita con estado ACEPTADO
        //reenderizar el /user/home
      },
      editable: true,
    });
  
    calendar.render();
  });

/* function deleteAppointment(startDate = '') {
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
} */