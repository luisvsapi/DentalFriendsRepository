const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

const appointment = {
    idCardPacient: "1111111226",
    namePacient: "Test Name",
    lastnamePacient: "Test Lastname",
    agePacient: 22,
    genderPacient: "M",
    addressPacient: "",
    phonePacient: "09",
    emailPacient: "rogwinalex2@hotmail.com",
    detailsPacient: {},
    date: '2021/12/03',
    treat: "Restauraciones dentales",
    doctor: "22"
}
/**
 * Test Cuando se envia valores incorrectos
 */
/*
 test('La solicitud de cita se rechaza por fecha igual o anterior', async () =>{
    const incorrect = appointment;
    incorrect.date = "2020/12/03"
    await api
        .post('/appointment/setAppointment/')
        .send(appointment)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        //.expect(200)
        .expect({ message: 1, infoAppointment: "Ok" })
        
})
*/
/**
 * Test Cuando se envia valores correctos y el paciente no tiene citas agendadas
 */
test('La solicitud de cita se agenda correctamente', async () =>{
    
    await api
        .post('/appointment/setAppointment/')
        .send(appointment)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        //.expect(200)
        .expect({ message: 1, infoAppointment: "Ok" })
        
})
/**
 * Test Cuando se envia valores correctos y el paciente  tiene citas agendadas
 */
test('La solicitud de cita se rechaza correctamente ', async () =>{
    await api
        .post('/appointment/setAppointment/')
        .send(appointment)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        //.expect(200)
        .expect({message: 2, infoAppointment: "Ya existe una cita a su nombre!"})
        
})

//test para borrar una solicitud de cita
//test para aceptar una solicitud de cita

//test 
