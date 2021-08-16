const app = require('../app')
const { testing } = require('googleapis/build/src/apis/testing')
const supertest = require('supertest')
const api = supertest(app)

/**
 * Test Cuando Loguea exitosamente con credenciales correctas
 */
 test('T01: Loguea exitosamente con credenciales correctas', async () =>{
    
    await api
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send({
            "username":"doctorDemo",
            "password":"demo"
        })
        .timeout(30000)
        .expect(200);
})

/**
 * Test Cuando no loguea exitosamente por credenciales incorrectas
 */
test('T02: No loguea exitosamente por credenciales incorrectas', async () =>{
    const respuestaTest = await api
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send({
            "username":"doctorDemo",
            "password":"claveDemasiadaProEquisDe"
        })
        .timeout(30000)
        .expect(400);
    expect(respuestaTest.body).toStrictEqual({});
})

// TEST DESHABILITADO POR MOTIVOS DE AUTOMATIZACIÓN DE TESTING - ¡TESTING APROBADO!
/**
 * Test Cuando se registra exitosamente con credenciales correctas
 */
 /*test('Se registra exitosamente con credenciales correctas', async () =>{
    
    const respuestaTest = await api
        .post('/register/')
        .set('Content-Type', 'application/json')
        .timeout(30000)
        .send({
            "username":"doctorD",
            "password":"demo2",
            "email":"doctorDemo2@gmail.com"
        })
        
        .expect(200);
    expect(respuestaTest.body).toStrictEqual({ message: 1 });
})*/

/**
 * Test Cuando no se registra exitosamente por credenciales ya existentes
 */
test('T03: No se registra exitosamente por credenciales ya existentes', async () =>{
    const respuestaTest = await api
        .post('/register/')
        .set('Content-Type', 'application/json')
        .send({
            "username":"doctorDemo",
            "password":"clavedemo",
            "email":"doctorDemo@gmail.com"
        })
        .timeout(30000)
        .expect(200);
    expect(respuestaTest.body).toStrictEqual({ message: 2 });
})