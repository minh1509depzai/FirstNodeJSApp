const UserModel = require('../models/UserModel');

//Performing CRUD operations on user models.
exports.getUserAll = async (req, res) => {
    try{
        console.log('Filtering =>> ' + JSON.stringify(req.query))
        //Create a deep clone of the query object to avoid modifying it during the execution.
        const query = {...req.query}
        
        //Get and them remove the sort property from the query object.
        const sort = req.query?.sort ? req.query.sort : ""
        delete query.sort

        let userLists = await UserModel.find(query).select('-__v')

        //Sorting
        userLists = userLists.sort((a , b) => {return a[sort] - b[sort]})

        res.status(200).json({
            status: 'success',
            message: userLists
        })    
    }
    catch(err){
        console.log(err)
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
        await UserModel.create(req.body)
        res.status(201);
    }
    catch(err)
    {
        res.status(400).json(err);
    }
}