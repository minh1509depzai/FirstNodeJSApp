const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const UserRoute = require('./routes/api/users/UserRoute')
const PageRoute = require('./routes/page/PageRoute')
const AuthenRoute = require('./routes/api/users/AuthenRoute')
const Path = require('path')
////////////////////////////////////////////////////////////////////
//Rewriting the server code with express module.               /////
////////////////////////////////////////////////////////////////////
const app = express();

app.use(express.json())
app.use(cors());

app.set('view engine', 'pug')
app.set('views', Path.join(__dirname, 'views'))

app.use('/api/users',UserRoute)
app.use('/api/authen',AuthenRoute)
app.use('/page',PageRoute)
app.use(express.static(Path.join(__dirname, 'public')))


app.listen(8080);