let calendar;
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendarElement");

  initializeCalendar(calendarEl);
  getAvaliablesAppointment();
});
/**
 * This method loads the FullCalendar element and configs.
 * @param {*} calendarEl html element 
 */
function initializeCalendar(calendarEl){
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    allDaySlot: false,
    locale: "es",
    nowIndicator: true,
    contentHeight: "auto",
    initialDate: Date.now(),
    slotMinTime: "00:00",
    slotMaxTime: "20:00",
    selectable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit",
      omitZeroMinute: false,
      meridiem: "short",
    },
    events: [],
    /* dateClick: function(info){
        alert("Momento")
        console.log("Recuperado:",info)
      }, */
    select: function (info) {
      showConfirmation(info);
      console.log("Recuperado:", info);
    }
    
  });
}

async function getAvaliablesAppointment() {
  let resp = await getFetch(`/appointment/byUser`)
    .then((res) => {
      res.forEach(element => {
        console.log("fecha retornada inicio:", new Date(element.dateBegin));
        calendar.addEvent({
          title: element.treatment,
          start: new Date(element.dateBegin),
          end: new Date(element.dateEnd),
          backgroundColor: element.state == 1 ? 'crimson' : 'darkcyan',
        });
      });
    })
    .then(()=>{
      calendar.render();
      //agregar alertify
    })
    .catch(err=>console.log("Error en recuperación de las citas",err));
}

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
} */

async function showConfirmation(content){
  let confirmation = document.getElementById('modalAppointment');
  confirmation.getElementsByClassName('modal-title')[0].textContent = "Confirmar Cita";
  confirmation.getElementsByClassName('m-details')[0].innerHTML = "<h5>Detalles</h5></br><p>Fecha inicio: " + content.start + "</p><p>Fecha fin: " + content.end + "</p></br>";
  let id = document.getElementById('appointmentId').innerText;
  confirmation.getElementsByClassName('m-confirm')[0].setAttribute("onclick", "confirmate(" + id + ",0,'" + content.startStr + "','" + content.endStr + "')");
  confirmation.getElementsByClassName('m-cancel')[0].setAttribute("onclick", "cancel()");
  confirmation.style.display= 'block';
}

async function confirmate(id, state, dateBegin, dateFinish){
  let confirmation = document.getElementById('modalAppointment');
  let body = {
    id: id,
    state: state,
    dateBegin: new Date(dateBegin),
    dateFinish: new Date(dateFinish)
  }
  await putFetch(`/appointment/changeState`, body)
  .then((res) => {
    if(res){
      // sendNotification(appointmentId)
      confirmation.style.display= 'none';
      location.replace('./../../home');
    }
  })
}
function cancel(){
  let confirmation = document.getElementById('modalAppointment');
  confirmation.style.display= 'none';
  console.log('cancelado');
}
// function sendNotification(appointmentIdCancel) {
//   let urlNotify = "/mail/send";
//   postFetch(urlNotify, {
//     appointmentId: appointmentIdCancel,
//   }).then((res) => {
//     return res;
//   }).catch(function () {
//     alert("Error contacte con administrador");
//   });
// }