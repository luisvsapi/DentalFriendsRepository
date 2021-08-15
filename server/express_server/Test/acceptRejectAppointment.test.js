const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest');
const api = supertest(app)

//============================== Accept Test===========
/**
 * Test cambiar estado de 0 a 1 para una cita existente
 */
test('La cita es guardada como aprobada correctamente', async () =>{
    
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .send({
            id: 175,
            state: '0',
            dateBegin: new Date('2098-11-03'),
            dateFinish: new Date('2098-11-06')
        })
        .timeout(50000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual(
        { 
            message: 1,  
        }
    )
        
})
/**
 * Test cambiar estado con una clave de estado incorrecta a una cita existente
 */
test('La cita no es acceptada porque la clave de estado es diferente de 0,1,2,3', async () =>{
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .send({
            id: 175,
            state: '5',
            dateBegin: new Date('2098-11-03'),
            dateFinish: new Date('2098-11-06')
        })
        .timeout(50000)
        .expect(500); 
})

/**
 * Test cambiar estado a una cita inexistente
 */
 test('No se acepta cambio a una cita inexistente', async () =>{
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .send({
            id: 9999,
            state: '0',
            dateBegin: new Date('2098-11-03'),
            dateFinish: new Date('2098-11-06')
        })
        .timeout(50000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual(
            { 
                "message": 0 
            }
    )   
})
//============================== Reject Test===========

test('Se rechaza correctamente una cita', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancel/175')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(200); 
    expect(respuestaTest.body).toStrictEqual(
            { 
                message: 1 
            }
    )    
})

test('Se ignora la peticion de rechazo por cita inexistente', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancel/9999')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(200); 
    expect(respuestaTest.body).toStrictEqual(
            { 
                message: 0 
            }
    )   
})

test('Se ignora la peticion de rechazo por error en el param de accion', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancell/175')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoiMjMsbGF1emFtbGFyLGxhdXJ2dnpsQGdtYWlsLmNvbSIsInVzZXIiOiJsYXV6YW1sYXIiLCJwYXNzd29yZCI6IiQyYiQxMCRDTVMxSnVoeWpjcGxJaXUuRG5LOS4uRmRIeVNkeWdJYzFEMm1nQzltUzBFeVJtTnY1Lkp5dSIsImlhdCI6MTYyOTAxMzE1MSwiZXhwIjoxNjI5MDk5NTUxfQ.SXU0uGBiVSf4lGxYZWvf4jTj9H6Ve86FbbSWe7SEeAY')
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(400); 
    expect(respuestaTest.body).toStrictEqual(
        { 
            message: 0 
        }
    ) 
})
