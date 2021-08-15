const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

test('Test de cancelar cita con id correcto', async () =>{
    await api
        .get('/user/appointments/Cancel/115/')
        .expect(200)
        .expect({ message: 1})        
})

test('Test de cancelar cita con id no existente', async () =>{
    await api
        .get('/user/appointments/Cancel/12312/')
        //.expect('Content-Type', /application\/json/)
        .expect(200)
        .expect({ message: 1})        
})
