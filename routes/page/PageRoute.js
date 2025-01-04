const express   = require('express');
const router    = express.Router();
const fs        = require('fs');
const homePage  = fs.readFileSync(__dirname + '..\\..\\..\\public\\html\\HomePage.html', 'utf8');
const buyPage   = fs.readFileSync(__dirname + '..\\..\\..\\public\\html\\BuyingPage.html', 'utf8');
const regPage   = fs.readFileSync(__dirname + '..\\..\\..\\public\\html\\LoginPage.html', 'utf8');
const userListPage  = fs.readFileSync(__dirname + '..\\..\\..\\public\\html\\UserList.html', 'utf8');
router.route('/home').get((req,res) =>{
    res.status(200).end(homePage);
});
router.route('/buy').get((req,res) =>{
    res.status(200).end(buyPage);
});

router.route('/register').get((req,res) =>{
    res.status(200).end(regPage);
});

router.route('/user-list').get((req,res) =>{
    res.status(200).end(userListPage);
});
module.exports = router;