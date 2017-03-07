var http = require('http');
fs = require("fs");
http.createServer(function(request, response) {

    request.on('readable', function() {
        request.read(); // throw away the data
    });

    request.on('end', function() {
        //=========== CODICE VA QUI ==========//
        fs.readFile("test.txt", 'utf-8', function(error, data) {

            //=========== FINE CODICE ==========//      
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
        });
        //=========== CODICE VA QUI ==========//      
        data = parseInt(data) + 1;
        fs.writeFile('test.txt',data);
        response.end('pagina refreshata ' + data + ' volte');
    });

}).listen(8080);

