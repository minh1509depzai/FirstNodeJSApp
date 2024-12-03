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
    age  :   {
        type: Number,
        required: [true, "Age must be provided"]
    },
    job  :   {
        type: String,
        required: [true, "Job must be provided"]
    },
    male :   {
        type: Boolean,
        required: [true, "Gender must be provided"]
    }
})

const Data = new mongoose.model('Data', Schema)

module.exports = Data