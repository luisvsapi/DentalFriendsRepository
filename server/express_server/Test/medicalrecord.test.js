const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

//cross-env NODE_ENV=test jest --verbose

test.skip('Test de medical record', async () =>{
    const newRequest = {
        idCardPacient: "1234567890",
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
        frecuenciac: 120,
        frecuenciar: 120,
        temperatura: 37,
        diagnostico: 'false',
        tratamiento:'false'
          };
    await api
        .post('/user/setRecord/')
        .send(newRequest)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /application\json/)
        .expect(200)
        //.expect({ message: 0})
        
})