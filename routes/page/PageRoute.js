const express   = require('express');
const router    = express.Router();
const fs        = require('fs');
const homePage  = fs.readFileSync(__dirname + '\\' + 'HomePage.html', 'utf8');
router
    .route('/home')
    .get((req,res) =>{
        res.status(200).end(homePage);
    });

module.exports = router;