const fs = require('fs');
const http = require('http');
const url = require('url')
const EventEmitter = require('events')


// /* Reading JSON file and parsing it into object */
// const testJsonFile = fs.readFileSync('./data.json', 'utf-8')
// const dataObj = JSON.parse(testJsonFile)
// console.log(dataObj[0].name)

// /* Reading HTML home page */
// const homePage = fs.readFileSync('./homePage.html', 'utf-8')
// //////////////////////SERVER////////////////////
// const server = http.createServer((req, res) =>{
//     switch (req.url)
//     {
//         case '/MinhNC28' :
//             res.end(homePage)
//             console.log('Someone is calling MinhNC');
//             break;
//         case '/favicon.ico':
//             //This case to rude out the /favicon.ico URL that the browser always send.
//             break;
//         default :
//             console.log('Someone is at the default state of the page');
//             res.end('Hello from server');
//             break;
//     }
        
    
// });

////////////////////////////////////////////////////////////////////
//Rewriting the server code with event-based programming style./////
////////////////////////////////////////////////////////////////////
class URLEmmiter extends EventEmitter {
    constructor() {
        super();
    }

    generalEmits(url,res) {
        switch (url) {
            case '/favicon.ico' : this.emit('favicon.ico',res); break;
            case '/home'        : this.emit('home',res); break;
            default             : this.emit('Unknown URL: ' + url, res); break;
        }
    }
}   

class HTTPReqEmitter extends EventEmitter {
    constructor() {
        super();
    }

    generalEmits(req, res) {
        switch (req) {
            case 'GET'  : this.emit('req',res); break;
            case 'POST' : this.emit('post',res); break;
            case 'PUT'  : this.emit('put',res); break;
        }
    }
}

const server = http.createServer();
const urlEmitter = new URLEmmiter();
const httpReqEmitter = new HTTPReqEmitter();
const homePage = fs.readFileSync('./homePage.html', 'utf-8')

server.on('connection', () => {
    console.log('Oh shit, client is trying to connect');
});

server.on('request', (req,res) => {
    httpReqEmitter.generalEmits(req.method, res);
    urlEmitter.generalEmits(req.url, res)
});

urlEmitter.on('home', (res) => {
    res.end(homePage)
});

server.listen(8080);