const jwt = require('jsonwebtoken') 
const keySecret = "FBC71CE36CC20790F2EEED2197898E71"

const authenticateJWT = (req, res, next) => {
    const token = req.headers.token;  
    if (token) { 
        jwt.verify(token, keySecret, (err, user) => {
            if (err) 
                return res.sendStatus(403)
            req.user = user;
            next();
        }); 
    } 
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, keySecret, (err, user) => {
            if (err) {
                res.locals.message = 'Forbidden';
                res.locals.error = { status: '403', stack: 'Acceso no permitido' }
                res.render('error') 
            }else{
                req.user = user;
                next();
            }     
        })
    } 
    res.locals.message = 'Forbidden';
    res.locals.error = { status: '403', stack: 'Acceso no permitido' }
    res.render('error') 
}
/*
const authenticateJWT = (req, res, next) => {
    const token = req.headers.token;  
    if (token) { 
        jwt.verify(token, keySecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } 
            req.user = user;
            next();
        }); 
    } else { 
        res.sendStatus(401);
	} 
};
*/
const sign = (user, password) => {
    var payload = {
        user: user,
        password: password
    } 
    return jwt.sign(payload, keySecret, { expiresIn: 60 * 10 });
}

module.exports = {authenticateJWT, jwt, keySecret, sign}