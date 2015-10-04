require('node-jsx').install();

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var swig = require('swig');
var path = require('path');
var express = require('express');

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
