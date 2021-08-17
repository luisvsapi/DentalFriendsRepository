const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest');
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

//============================== Accept Test===========

/**
 * Test cambiar estado de 0 a 1 para una cita existente
 */
test('T01: La cita es guardada como aprobada correctamente', async () =>{
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token', token)
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
test('T02: La cita no es acceptada porque la clave de estado es diferente de 0,1,2,3', async () =>{
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token', token)
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
 test('T03: No se acepta cambio a una cita inexistente', async () =>{
    const respuestaTest = await api
        .put('/appointment/changeState/')
        .set('token', token)
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

test('T04: Se rechaza correctamente una cita', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancel/175')
        .set('token', token)
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(200); 
    expect(respuestaTest.body).toStrictEqual(
            { 
                message: 1 
            }
    )    
})

test('T05: Se ignora la peticion de rechazo por cita inexistente', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancel/9999')
        .set('token', token)
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(200); 
    expect(respuestaTest.body).toStrictEqual(
            { 
                message: 0 
            }
    )   
})

test('T06: Se ignora la peticion de rechazo por error en el param de accion', async () =>{
    const respuestaTest = await api
        .get('/user/appointments/Cancell/175')
        .set('token', token)
        .set('Accept', 'application/json')
        .timeout(50000)
        .expect(400); 
    expect(respuestaTest.body).toStrictEqual(
        { 
            message: 0 
        }
    ) 
})
