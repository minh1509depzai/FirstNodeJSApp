const fs = require('fs');
const http = require('http');
const url = require('url')



/* Reading JSON file and parsing it into object */
const testJsonFile = fs.readFileSync('./data.json', 'utf-8')
const dataObj = JSON.parse(testJsonFile)
console.log(dataObj[0].name)

/* Reading HTML home page */
const homePage = fs.readFileSync('./homePage.html', 'utf-8')
//////////////////////SERVER////////////////////
const server = http.createServer((req, res) =>{
    switch (req.url)
    {
        case '/MinhNC28' :
            res.end(homePage)
            console.log('Someone is calling MinhNC');
            break;
        case '/favicon.ico':
            //This case to rude out the /favicon.ico URL that the browser always send.
            break;
        default :
            console.log('Someone is at the default state of the page');
            res.end('Hello from server');
            break;
    }
        
    
});

server.listen(8080);