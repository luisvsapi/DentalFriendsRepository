const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

test('Test de finazalizar cita con id correcto', async () =>{
    await api
        .get('/user/appointments/Completed/115/')
        .expect(200)
        .expect({ message: 1})        
})

test('Test de finazalizar cita con id no existente', async () =>{
    await api
        .get('/user/appointments/Completed/12312/')
        //.expect('Content-Type', /application\/json/)
        .expect(200)
        .expect({ message: 0})        
})
