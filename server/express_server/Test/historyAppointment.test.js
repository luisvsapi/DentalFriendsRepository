const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

/**
 * Test Cuando recupera exitosamente el historial de los pacientes por atributo
 */
test('Recupera exitosamente el historial de los pacientes por atributo', async () =>{
    
    const respuestaTest = await api
        .post('/user/medicalResume/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
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
test('No recupera el historial de los pacientes por atributo vacio', async () =>{
    const respuestaTest = await api
        .post('/user/medicalResume/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Content-Type', 'application/json')
        .send({
            "filterMedicalResume": "0"
        })
        .timeout(30000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual([]);
})
