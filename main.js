const fs = require('fs');
const http = require('http');
// const url = require('url')

//////////////////////SERVER////////////////////
const server = http.createServer((req, res) =>{
    console.log(req.url);
    switch (req.url)
    {
        case '/MinhNC28' :
            console.log('Someone is calling MinhNC');
            break;
        case '/favicon.ico':
            //This case to rude out the /favicon.ico URL that the browser always send.
            break;
        default :
            console.log('Someone is at the default state of the page');
            break;
    }
        
    res.end('Hello from server');
});

server.listen(8080);