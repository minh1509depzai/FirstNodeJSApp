const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://MinhNC28:minhminhminh1509@cluster0.ngtmp.mongodb.net/mongodbVSCodePlaygroundDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(() => {
    console.log('DB connection established')
})

const Schema = new mongoose.Schema({
    name :   {
        type: String,
        required: [true, "Name must be provided"]
    },
    password  :   {
        type: String,
        required: [true, "Password must be provided"]
    },
    email  :   {
        type: String,
        required: [true, "Email must be provided"],
        lowercase: true
    }
})

const Data = new mongoose.model('Data', Schema)

module.exports = Data