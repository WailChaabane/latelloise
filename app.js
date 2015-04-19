var express = require('express');
var path = require('path');
var multer = require('multer')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compression({filter: shouldCompress}))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    dest: path.join(__dirname, 'public/img/'),
    rename: function (fieldname, filename) {
        return fieldname;
    }
    // onFileUploadData: function (file, data, req, res) {
    //   console.log(data.length + ' of ' + file.fieldname + ' arrived')
    // }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'latelloise',
    resave: false,
    saveUninitialized: true
}));
app.use('/', routes);
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
        if (err.status === 404) {
            res.status(404);
            res.render('404', {
                title: "404",
                description: err.message
            });
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if (err.status === 404) {
        res.status(404);
        res.render('404', {
            title: "404",
            description: err.message
        });
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }

});


module.exports = app;
