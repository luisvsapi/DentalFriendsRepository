const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

/**
 * Test Cuando se envia valores correctos y el paciente no tiene citas agendadas
 */
test('Recupera exitosamente el historial de los pacientes por atributo', async () =>{
    
    const respuestaTest = await api
        .post('/user/medicalResume/')
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
 * Test Cuando se envia valores correctos y el paciente  tiene citas agendadas
 */
test('No recupera el historial de los pacientes por atributo vacio', async () =>{
    const respuestaTest = await api
        .post('/user/medicalResume/')
        .set('Content-Type', 'application/json')
        .send({
            "filterMedicalResume": "0"
        })
        .timeout(30000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual([]);
})
