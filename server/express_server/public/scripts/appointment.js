$(document).ready(function () {
    //loadDoctors();
    loadTreatments();
});


async function loadDoctors() {
    let listDoctors;
    try{
        listDoctors = await getFetch('/user/allDoctors')
    }catch(error){
        console.log("Error en loadDoctors:",error)
    }
    let htmlSelect = `<option value=''>Seleccione doctor</option>`
    listDoctors.forEach(element => {
        htmlSelect += `<option value=${element.id}>${element.user_name}</option>`
    })
    $('#doctorPac').html(htmlSelect);
}

async function loadTreatments() {
    let listTreatments;
    try{
        listTreatments = await getFetch('/user/allTreatments')
    }catch(error){
        console.log("Error en loadTreatments:",error)
    }
    let htmlSelect = `<option value=''>Seleccione tratamiento</option>`
    listTreatments.forEach(element => {
        htmlSelect += `<option value=${element.id}>${element.descr}</option>`
    })
    $('#tratPac').html(htmlSelect);
}

$('#saveAppointment').submit(function (e) {
    e.preventDefault()  
    postFetch(`/appointment/setAppointment`, objectifyForm($(this).serializeArray())).then((res) => { 
        if(res.message==1){ 
            alertify.success('Cita reservada exitosamente'); 
            getAvaliablesAppointment()
        } 
    })   
});
/*function initPage() {
    loadDoctors()
}*/

//initPage()