const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

let newRequest = {
    idCardPacient: "0912345612",
    reason: "isolis12",
    enfermedad: 'false',
    embarazo: 'false',
    alergiaAntibiotico: 'false',
    alergiaAnestesia: 'false',
    hemorragias: 'false',
    SIDA: 'false',
    asma: 'false',
    diabetes: 'false',
    hipertension: 'false',
    enfermedadCardiaca: 'false',
    tuberculosis: 'false',
    otraenfermdad: 'false',
    presion: 120,
    frecuenciac: 30,
    frecuenciar: 30,
    temperatura: 37,
    diagnostico: 'false',
    tratamiento:'false'
      };

test('Test de medical record con datos correctos', async () =>{
    await api
        .post('/user/setRecord/')
        .send(newRequest)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        .expect(200)
        .expect({ message: 1})
        
})

test.skip('Test de medical record con id vacio', async () =>{
    newRequest.idCardPacient = ""
    await api
        .post('/user/setRecord/')
        .send(newRequest)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        .expect(200)
        .expect({ message: 0})
        
})

test.skip('Test de medical record con id no existente', async () =>{
    newRequest.idCardPacient = "1231231231"
    await api
        .post('/user/setRecord/')
        .send(newRequest)
        .set('Accept', 'application/json')
        //.expect('Contexxnt-Type', /application\json/)
        .expect(200)
        .expect({ message: 0})
        
})