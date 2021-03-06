var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('my secret here: hello hi bye'));
//app.use(require('express-promise')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'something really secret' // better use a long string
}));

// use these websites
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/todo', require('./routes/todo'));


app.listen(3001, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
