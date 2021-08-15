document.getElementById("logout").setAttribute("onclick", "resetCredentials()");
let calendar;
document.addEventListener("DOMContentLoaded", function () {
  validateCredentials();
  var calendarEl = document.getElementById("calendarElement");
  initializeCalendar(calendarEl);
  getAvaliablesAppointment();
  mostrarFecha();
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
    slotMinTime: "07:00",
    slotMaxTime: "19:00",
    selectable: true,
    selectConstraint:{
      start: Date.now(),
    },
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
    }
    
  });
}

async function getAvaliablesAppointment() {
  let resp = await getFetch(`/appointment/byUser`)
    .then((res) => {
      res.forEach(element => {
        calendar.addEvent({
          title: element.treatment,
          start: new Date(element.dateBegin),
          end: new Date(element.dateFinish),
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
  confirmation.getElementsByClassName('m-details')[0].innerHTML = "<h5>Detalles</h5></br><p>Fecha inicio: " + parseUtcDateWithHours(content.start,true) + "</p><p>Fecha fin: " + parseUtcDateWithHours(content.end,true) + "</p></br>";
  let id = document.getElementById('appointmentId').innerText;
  confirmation.getElementsByClassName('m-confirm')[0].setAttribute("onclick", "confirmate(" + id + ",0,'" + content.startStr + "','" + content.endStr + "')");
  confirmation.getElementsByClassName('close')[0].setAttribute('onclick','cancel()');
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
    if(res.message == 1){
      sendNotification(id);
      confirmation.style.display= 'none';
      location.replace('./../../home');
    }
  })
}
function cancel(){
  let confirmation = document.getElementById('modalAppointment');
  confirmation.style.display= 'none';
}
async function mostrarFecha(){
  let id = document.getElementById('appointmentId').innerText;
  let url = '/appointment/' + id.trim();
  await getFetch(url)
  .then((res) => {
    if(res){
      document.getElementById('dateRequest').innerText = parseUtcDateWithHours(res.dateBegin);
    } else{
      console.log("error");
    }
  })
}