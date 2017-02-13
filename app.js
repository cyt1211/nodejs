var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express();

//实时编译LESS的插件
var expressLess = require('express-less');
//favicon.ico
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//加载jade渲染模板
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));
app.use('/build', express.static(__dirname + '/build'));
app.set('views', './views');
app.use('/public/style', expressLess(__dirname + '/public/style', {
    compress: true
}));
//app.set('port', process.env.PORT || 3349);

//监听端口
var port = process.env.PORT || '3349';
app.listen(port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
//加载routes模块
require('./routes/base.js')(app);
require('./routes/main.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
