//var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var session = require("express-session");
const constants = require("./scripts/constants");

// ENRUTADORES
//var adminRouter = require('./routes/adminRoute')
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var appointmentRouter = require("./routes/appointment");
var sendRouter = require("./routes/mail");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
 
app.use(logger('common', { skip: function(req, res) { return res.statusCode != 400 || res.statusCode != 200 }, stream: __dirname + './logs/api.log' }));
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

//httpOnly: true,
app.use(
  session({
    secret: "FBC71CE36CC20790F2EEED2197898E71",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: constants.MAX_AGE_COOKIE },
  })
);

// ENDPOINTS
//app.use('/admin', adminRouter)
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/appointment", appointmentRouter);
app.use("/mail", sendRouter);

// catch 404 and forward to error handler
/*
app.use(function (req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
