var http = require("http");

function prova(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(prova).listen(8888);