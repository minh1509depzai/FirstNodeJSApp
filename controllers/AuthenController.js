const UserModel = require('../models/UserModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkPassword = (encryptedPassword, rawPassword) => {
    console.log('Before Bcrypt ' + encryptedPassword + ' ' + rawPassword);
    return bcrypt.compareSync(rawPassword, encryptedPassword);
}

exports.createUser = async (req, res) => {
    try{
        await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            rawPassword: req.body.password,
        })
        res.status(201);
    }
    catch(err)
    {
        console.log('Error ' + err.message)
        res.status(400).json(err);
    }
}

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const {email, password} = req.body;
        console.log(email + ' ' + password);

        //Check if email and password are provided
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }

        const user = await UserModel.find({email: email});
        console.log(user);
        //Check if user exists
        if (user.length === 0) {
            throw new Error('Cant find user with specified email');
        }

        //Check if password is correct
        if (!checkPassword(user[0].password, password)) {
            throw new Error('Wrong password');
        }

        //Create a token from user's id
        const token = JWT.sign(
            {id: user[0]._id}, 
            'my-ultra-long-and-secure-string',
            {expiresIn: '90d'}
        );

        //Send the newly created token back to the user.
        res.status(201).send({
            message: 'Loging successfully',
            token: token
        });
    }
    catch(err)
    {
        console.log("Failed to login user: " + err.message);
        res.status(404).send(err.message);
    }
}

exports.protect = async (req, res) => {
    try {
        //Check if the token exists
        if (!req.token)
        {
            throw new Error('No token exists');
        }

        //Verify if the token is valid.
        const decoded = await JWT.verify(req.token, 'my-ultra-long-and-secure-string');
        const user = UserModel.find({_id: decoded.id});

        //Check if token's owner still presents.
        if (!user) 
        {
            throw new Error('The user that owns this token no longer exists');
        }
    }
    catch(err) {
        console.log(err.message);
        res.status(401).send(err.message);
    }
}