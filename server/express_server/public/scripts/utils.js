function resetCredentials() {
    sessionStorage.setItem("username", null);
    sessionStorage.setItem("token", null);
}

async function postFileFetch(url = "", form) {
    var formData = new FormData(form);
    let response = await fetch(
        url,
        {
            method: "POST",
            body: formData,
        }
    )
    console.log(formData);
    var data = await response.json()
    return data
}

async function postFetch(url = "", objectSend = {}) {
    let response = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(objectSend),
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        }
    )
    var data = await response.json()
    return data
}
  
async function getFetch(url = "", objeto = {}) {
    let parametros = objeto
    let query = Object.keys(parametros).map(k => encodeURIComponent(k) + '=' +
        encodeURIComponent(parametros[k])).join('&')
    let urlEnviar = url + '?' + query
    let respuesta = await fetch(urlEnviar, { method: "GET", headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") } })
    var data = await respuesta.json()
    return data;
}
  
async function putFetch(url = "", objectoEnviar = {}) {
    let response = await fetch(
        url,
        {
            method: "PUT",
            body: JSON.stringify(objectoEnviar),
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        }
    )
    var data = await response.json()
    return data
}

async function deleteFetch(url = "", objectoEnviar = {}) {
    let response = await fetch(
        url,
        {
            method: "DELETE",
            body: JSON.stringify(objectoEnviar),
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        }
    )
    var data = await response.json()
    return data
}

function objectifyForm(formArray) { 
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function dateToInt(arg) {
    return new Date(arg).getTime();
}

function modificateActualTime(mode = 'minute', date = '', value = 1) {
    var dateTmp = (new Date(date)).getTime()  
    switch (mode) {
        case 'day':
            dateTmp += (value * 1000 * 60 * 60 * 24)
            break;
        case 'hour':
            dateTmp += (value * 1000 * 60 * 60)
            break;
        case 'minute':
            dateTmp += (value * 1000 * 60)
            break; 
        case 'second':
            dateTmp += (value * 1000)
            break;    
        default:            
            break;
    }   
    return new Date(dateTmp)
}

