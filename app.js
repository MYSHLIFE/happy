var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('happy');
var http = require("http");
var colors = require("colors");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

var router = express.Router();
// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



//mysql environment configure
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'test',
    port: 3306
});
conn.connect();
// conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });
var createSQL = 'CREATE TABLE t_user (name VARCHAR(20), sex CHAR(1));'
var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
var selectSQL = 'select * from t_user limit 10';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update"  where name="conan"';

//delete
// conn.query(createSQL, function(err, res) {
//     conn.query(deleteSQL, function(err0, res0) {
//         if (err0) console.log(err0);
//         console.log("DELETE Return ==> ");
//         console.log(res0);

//         //insert
//         conn.query(insertSQL, function(err1, res1) {
//             if (err1) console.log(err1);
//             console.log("INSERT Return ==> ");
//             console.log(res1);

//             //query
//             conn.query(selectSQL, function(err2, rows) {
//                 if (err2) console.log(err2);

//                 console.log("SELECT ==> ");
//                 for (var i in rows) {
//                     console.log(rows[i]);
//                 }

//                 //update
//                 conn.query(updateSQL, function(err3, res3) {
//                     if (err3) console.log(err3);
//                     console.log("UPDATE Return ==> ");
//                     console.log(res3);

//                     //query
//                     conn.query(selectSQL, function(err4, rows2) {
//                         if (err4) console.log(err4);

//                         console.log("SELECT ==> ");
//                         for (var i in rows2) {
//                             console.log(rows2[i]);
//                         }
//                     });
//                 });
//             });
//         });
//     });
// })


// conn.end();


// Handle 404
require('./routes/activity')(app);
require('./routes/personal')(app);

router.use(function(req, res) {
    //console.log('message in 404');
    res.status(404);
    res.render('404.jade', {
        title: '404: File Not Found'
    });
});

// Handle 500
router.use(function(error, req, res, next) {
    // throw error;
    console.log(util.inspect(error, {
        depth: null
    }));
    res.status(500);
    res.render('500.jade', {
        title: '500: Internal Server Error',
        error: error
    });
});

app.set('port', process.env.PORT || 3000);
var server = http.createServer(app).listen(app.get('port'), function() {
    var env_msg = (app.get('env') == 'development') ? colors.green(app.get('env')) : colors.red(app.get('env'));
    console.log("Express server listening on port " + colors.green(app.get('port')) + ' in ' + env_msg + ' mode.');
}).on('close', function() {
    console.log(colors.red('terminating server'));

});
// var server = app.listen(app.get('port'), function() {
//     debug('Express server listening on port ' + server.address().port);
//     console.log('Express server listening on port ' + server.address().port);
// }).on('close', function() {
//     console.log(colors.red('terminating server'));

// });
module.exports = conn;