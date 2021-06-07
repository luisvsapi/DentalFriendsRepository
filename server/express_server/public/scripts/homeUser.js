$(document).ready(function() {
    let url = "../appointment/state/1";
    getFetch(url, {}).then((res) => {
        if (res) {
            loadAppointment(res);
            alertify.success('Solicitudes cargadas');
        } else {
            alertify.error('Error al cargar la información, recarge la página!!');
        }
    }).catch(err=>{
        console.log(err.message);
    })
});

let loadAppointment = (data) => {
    let table = document.getElementById('homeUserTable');
    console.log("Datos recuperados desde BD:",data)
    for(let appointment of data){
        let tr = document.createElement('tr');
        let date = document.createElement('td');
        date.innerText = appointment.dateBegin;
        let name = document.createElement('td');
        name.innerText = appointment.id_pacient;
        let treatment = document.createElement('td');
        treatment.innerText = appointment.treatment;

        let buttons = document.createElement('td');
        buttons.className = "d-flex justify-content-around"
        let accept = document.createElement('button');
        accept.className = "btn btn-info";
        accept.type = "button";
        accept.innerText = "Aceptar";
        accept.setAttribute('onclick','acceptRequest('+appointment.id+')')
        let decline = document.createElement('button');
        decline.className = "btn btn-secondary";
        decline.type = "button";
        decline.innerText = "Rechazar";
        decline.setAttribute('onclick','cancellRequest('+appointment.id+')')
        buttons.appendChild(accept);
        buttons.appendChild(decline);
        
        tr.appendChild(date);
        tr.appendChild(name);
        tr.appendChild(treatment);
        tr.appendChild(buttons);
        table.appendChild(tr);
    }
}
/**
 * This method uses the appointment's id to request  it to be accepted.
 * @param {*} appointmentId 
 */
function acceptRequest (appointmentId) {
    let url = "./appointments/" + "Accept/" + appointmentId; 
    location.replace(url);
}
/**
 * This method uses the appointment's id to request it to be cancelled.
 * @param {*} appointmentId 
 */
function cancellRequest (appointmentId)  {
    let url = "./appointments/" + "Cancel/" + appointmentId; 
    getFetch(url, {}).then((res) => {
        if (res.message) {
            location.reload();
        } else {
            alertify.error('Error al eliminar solicitud');
        }
    }).catch(err=>{
        console.log(err.message);
    })
}