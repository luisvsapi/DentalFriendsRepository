
$(document).ready(function() {
    let url ="http://localhost:3000/appointment/PENDING";
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
    for(let appointment of data){
        let tr = document.createElement('tr');

        let date = document.createElement('td');
        date.innerText = appointment.date;
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
        let decline = document.createElement('button');
        decline.className = "btn btn-secondary";
        decline.type = "button";
        decline.innerText = "Rechazar";
        buttons.appendChild(accept);
        buttons.appendChild(decline);
        
        tr.appendChild(date);
        tr.appendChild(name);
        tr.appendChild(treatment);
        tr.appendChild(buttons);
        table.appendChild(tr);
    }
}
//AGREGAR FUNCION ACEPTAR RECHZAR