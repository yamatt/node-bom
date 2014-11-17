var express = require('express');
var path = require('path');
var logger = require('morgan');

var getRawBody = require('raw-body')

var router = require('./routes/router');

var app = express();

// configuration
app.use(logger('dev'));

app.set("routes", {
    "meta": "/",
    "creation": "/",
    "object": "/",
});

app.set("file-dir", __dirname + "/files");

// get content somehow
app.use(function (req, res, next) {
  getRawBody(req,
    {
        length: req.headers['content-length'],
    },
    function (err, string) {
        if (!err) {
            req.body = string;
            next()
        }
        else {
          return next(new Error(err))
        }

    });
});

// set up routing
router(app);

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
