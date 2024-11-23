const fs = require('fs');
const http = require('http');
const url = require('url')
const EventEmitter = require('events')
const express = require('express')

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
// class URLEmmiter extends EventEmitter {
//     constructor() {
//         super();
//     }

//     generalEmits(url,res) {
//         console.log('url: ' + url);
//         switch (url) {
//             case '/favicon.ico' : this.emit('favicon.ico',res); break;
//             case '/home'        : this.emit('home',res); break;
//             case '/CookingACakeForMe' : this.emit('cooking-acake',res); break;
//             default             : this.emit('Unknown URL: ' + url, res); break;
//         }
//     }
// }   

// class HTTPReqEmitter extends EventEmitter {
//     constructor() {
//         super();
//     }

//     generalEmits(req, res, url) {
//         switch (req) {
//             case 'GET'  : this.emit('GET', url, res); break;
//             case 'POST' : this.emit('POST', req, res); break;
//             case 'PUT'  : this.emit('PUT', req, res); break;
//         }
//     }
// }

// const server = http.createServer();
// const urlEmitter = new URLEmmiter();
// const httpReqEmitter = new HTTPReqEmitter();
// const homePage = fs.readFileSync('./homePage.html', 'utf-8')
// const testPage = fs.readFileSync('./testPage.html', 'utf-8')

// server.on('request', (req,res) => {
//     httpReqEmitter.generalEmits(req.method, res, req.url);
//     urlEmitter.generalEmits(req.url, res)
// });

// urlEmitter.on('home', (res) => {
//     res.end(homePage)
// });

// urlEmitter.on('cooking-acake', (res) => {
//     console.log('Hehe');
//     res.end(testPage);
// });


// server.listen(8080);

////////////////////////////////////////////////////////////////////
//Rewriting the server code with express module.               /////
////////////////////////////////////////////////////////////////////
const app = express();
const homePage = fs.readFileSync('./homePage.html', 'utf-8');
const childPage = fs.readFileSync('./testPage.html', 'utf-8');
const resources = [
    {
        name: "Minh",
        age: 24
    },
    {
        name: "Tinh",
        age: 22
    },
    {
        name: "Binh",
        age: 29
    }
];

//API Handler
const getResourceAll = (req, res) => {
    console.log(req);
    res.send(JSON.stringify(resources))
};

const deleteResourceAll = (req, res) => {
    resources = [];
};

const getResourceId = (req, res) => {
    let id = req.params.id;

    if (id <= 0 && id > resources.length)
    {
        res.status(404).send("Index invalid");
    }
    else
    {
        res.status(200).send(JSON.stringify(resources.at(id)))
    }
};

const deleteResourceId = (req, res) => {
    let id = req.params.id;
    
    if (id <= 0 && id > resources.length)
    {
        res.status(404).send("Index invalid");
        return;
    }
    
    resources.delete(id);
};

app
    .route('/api/resources/all')
    .get(getResourceAll)
    .delete(deleteResourceAll);

app
    .route('/api/resources/:id')
    .get(getResourceId)
    .delete(deleteResourceId);

app.get('/', (req, res) => {
    console.log('client requesting home page');
    res.status(200).end(homePage);
});

app.get('/child', (req, res) => {
    console.log('client requesting home page');
    res.status(200).end(childPage);
});

app.listen(8080);