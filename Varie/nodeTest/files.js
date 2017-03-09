var http = require('http');
fs = require("fs");
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
        if(request.url == '/'){
        fs.readFile("test.txt", 'utf-8', function(error, data) {

            //=========== FINE CODICE ==========//      
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            //=========== CODICE VA QUI ==========//      
            data = parseInt(data) + 1;
            fs.writeFile('test.txt', data);
            response.end('pagina refreshata ' + data + ' volte');
        });
    }else{
        response.writeHead(404);
        response.end();
    }
    });
}).listen(8080);
