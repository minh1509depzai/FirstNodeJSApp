const UserModel = require('../models/UserModel');

exports.createUser = async (req, res) => {
    try{
        await UserModel.create(req.body)
        res.status(201);
    }
    catch(err)
    {
        console.log('Error ' + err.message)
        res.status(400).json(err);
    }
}