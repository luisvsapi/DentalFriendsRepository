var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session') 

// ENRUTADORES
/////////////////////////
/////////////////////////
//var adminRouter = require('./routes/adminRoute')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var appointmentRouter = require('./routes/appointment');
//var sendRouter = require('./routes/send');
 

/////////////////////////
/////////////////////////
/////////////////////////
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'FBC71CE36CC20790F2EEED2197898E71',
  resave: false,
  httpOnly: true,
  saveUninitialized: true,
  cookie: { secure: true }, cookie: { maxAge: 60000 }
}))
  
// ENDPOINTS
/////////////////////////
/////////////////////////

//app.use('/admin', adminRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/appointment', appointmentRouter);


/////////////////////////
/////////////////////////
/////////////////////////


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

module.exports = app;
