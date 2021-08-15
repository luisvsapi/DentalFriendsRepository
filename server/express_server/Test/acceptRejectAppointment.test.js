const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest');
const api = supertest(app)

let date = new Date('2021-11-03');
date.setDate(date.getDate()+1);
const appointment = {
    idCardPacient: "2200723367",
    namePacient: "Rogwi",
    lastnamePacient: "Correa",
    agePacient: 22,
    genderPacient: "M",
    addressPacient: "av del ejercito",
    phonePacient: "0123456789",
    emailPacient: "rogwinalex2@hotmail.com",
    detailsPacient: {},
    date: date,
    treat: "Restauraciones dentales",
    doctor: 22
}

beforeEach(async () => {
    jest.setTimeout(15000);
})

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
test('La solicitud de cita se rechaza correctamente por cédula repetida', async () =>{
    await api
        .post('/appointment/setAppointment/')
        .send(appointment)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        //.expect(200)
        .expect({message: 2, infoAppointment: "Ya existe una cita a su nombre!"})
        
})
