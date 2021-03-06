const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_m9p1z8qs:qssaft3ovcjh0eqst6eautp7bv@ds163410.mlab.com:63410/heroku_m9p1z8qs');

var app = express();
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cs5610-angular-kdelsener.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);
// app.get('/api/session/get', getSessionAll);
// app.get('/api/session/reset', resetSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var userService = require('./services/user.service.server');
userService(app);
var sectionService = require('./services/section.service.server')
sectionService(app);

app.listen(process.env.PORT || 4000);

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })
//
// app.get('/message/:theMessage', function (req, res) {
//     var theMessage = req.params['theMessage'];
//     res.send(theMessage);
// })