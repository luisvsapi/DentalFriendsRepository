const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

//cross-env NODE_ENV=test jest --verbose
test.skip('La solicitud de cita se agenda correctamente', async () =>{
    const newRequest = {
        idCardPacient: "1900077777",
        namePacient: "Test Name 1",
        lastnamePacient: "Test Lastname 2",
        agePacient: 22,
        genderPacient: "M",
        addressPacient: "",
        phonePacient: "09",
        emailPacient: "rogwinalex2@hotmail.com",
        detailsPacient: {},
        date: '30/12/2021',
        treat: "Restauraciones dentales",
        doctor: "22"
    }
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
