const UserModel = require('../models/UserModel');

//Performing CRUD operations on user models.
exports.getUserAll = async (req, res) => {
    try{
        const userLists = await UserModel.find()
        res.status(200).json({
            status: 'success',
            message: userLists
        })    
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        })
    }
};  

exports.deleteAllUser = async (req, res) => {
    try{
        await UserModel.deleteMany()
        res.status(200).json({
            status: 'success',
            message: 'All users info have been deleted'
        })    
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        })
    }
};

exports.getUserByID = async (req, res) => {
    try{
        const user = await UserModel.findOne({id : req.params.id})
        res.status(200).json({
            status: 'success',
            message: user
        })    
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        })
    }
};

exports.deleteUserByID = async (req, res) => {
    try{
        const user = await UserModel.findOneAndDelete({id : req.params.id})
        res.status(200).json({
            status: 'success',
            message: user
        })    
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        })
    }
};

exports.createUser = async (req, res) => {
    try{
        let newUser = await UserModel.create(req.body)
        res.status(201);
    }
    catch(err)
    {
        res.status(400).json(err);
    }
}