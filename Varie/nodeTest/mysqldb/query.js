    var http = require("http");
    var express = require('express');
    var app = express();
    var mysql = require('mysql');
    var bodyParser = require('body-parser');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Tanis1982',
        database: 'WDLinks_db'
    });

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })

    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    var server = app.listen(8080, "95.85.60.126", function() {

        var host = server.address().address
        var port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)

    });

    //rest api to get all results
    app.get('/WDlinks', function(req, res) {
        console.log(req);
        connection.query('select * from WDlinks', function(error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });

    //rest api to get a single employee data
    app.get('/WDlinks/:id', function(req, res) {
        connection.query('select * from WDlinks where id=?', [req.params.id], function(error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });

    //rest api to create a new record into mysql database
    app.post('/WDlinks', function(req, res) {
        var postData = req.body;
        connection.query('INSERT INTO WDlinks SET ?', postData, function(error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });

    //rest api to update record into mysql database
    app.put('/WDlinks', function(req, res) {
        connection.query('UPDATE `WDlinks` SET `link_title`=?,`link_url`=?,`link_color`=? where `id`=?', [req.body.link_title, req.body.link_url, req.body.link_color, req.body.id], function(error, results, fields$){
            if (error) throw error; 
            res.end(JSON.stringify(results));
        });
    });

    //rest api to delete record from mysql database
    app.delete('/WDlinks', function(req, res) {
        console.log(req.body);
        connection.query('DELETE FROM `WDlinks` WHERE `id`=?', [req.body.id], function(error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
        });
    });
