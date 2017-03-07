var http = require('http');
mysql = require("mysql");

// Create the connection. 
// Data is default to new mysql installation and should be changed according to your configuration. 
var connection = mysql.createConnection({
    user: "root",
    password: "",
    database: "db_name"
});

http.createServer(function(request, response) {
    //=========== NUOVO NODE END ==========//
    //=========== NUOVO NODE END ==========//
    //=========== NUOVO NODE END ==========//    
    request.on('readable', function() {
        request.read(); // throw away the data
    });
    //=========== FINE NUOVO NODE END ==========//
    //=========== FINE NUOVO NODE END ==========//
    //=========== FINE NUOVO NODE END ==========//
    request.on('end', function() {
        //=========== CODICE VA QUI ==========//
        connection.query('SELECT * FROM your_table;', function(error, rows, fields) {
            response.writeHead(200, {
                'Content-Type': 'x-application/json'
            });
            // Send data as JSON string. 
            // Rows variable holds the result of the query. 
            response.end(JSON.stringify(rows));
        });
    });
}).listen(8080);
