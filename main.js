const express = require('express')
const dotenv = require('dotenv')
const UserRoute = require('./routes/api/users/UserRoute')
const PageRoute = require('./routes/page/PageRoute')

////////////////////////////////////////////////////////////////////
//Rewriting the server code with express module.               /////
////////////////////////////////////////////////////////////////////
const app = express();

app.use('/api/users',UserRoute)
app.use('/page',PageRoute)

app.listen(8080);