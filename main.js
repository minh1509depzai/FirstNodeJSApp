const fs = require('fs');
const http = require('http');

//////////////////////SERVER////////////////////
const server = http.createServer((req, res) =>{
    res.end('Hello from server');
});

server.listen(8080);