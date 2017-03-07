var http = require('http');

http.createServer(function (request, response) {

   request.on('readable', function () {
       request.read(); // throw away the data
   });

   request.on('end', function () {

      response.writeHead(200, {
         'Content-Type': 'text/plain'
      });

      response.end('Hello HTTP!');
   });

}).listen(8080);