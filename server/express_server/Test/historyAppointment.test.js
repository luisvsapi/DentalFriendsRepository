const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

let token;

beforeAll( (done) => {
    api.post('/login')
    .send({username: 'doctorDemo' , password: 'demo'})
    .end((err, response) => {
        token = response.body.token;
        done();
    })
} )
/**
 * Test Cuando recupera exitosamente el historial de los pacientes por atributo
 */
test('T01: Recupera exitosamente el historial de los pacientes por atributo', async () =>{
    
    const respuestaTest = await api
        .post('/user/medicalResume/')
        .set('token', token)
        .set('Content-Type', 'application/json')
        .send({
            "filterMedicalResume": "2200723338"
        })
        .timeout(30000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual(
        [
            {
                "id": 154,
                "dateBegin": "2021-11-04T00:00:00.000Z",
                "state": "2",
                "pacient": {
                    "namePacient": "Test Name",
                    "lastnamePacient": "Test Lastname"
                }
            }
        ]
    );
})

/**
 * Test Cuando no recupera el historial de los pacientes por atributo vacio
 */
test('T01: No recupera el historial de los pacientes por atributo vacio', async () =>{
    const respuestaTest = await api
        .post('/user/medicalResume/')
        .set('token', token)
        .set('Content-Type', 'application/json')
        .send({
            "filterMedicalResume": "0"
        })
        .timeout(30000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual([]);
})
