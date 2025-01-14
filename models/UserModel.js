const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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
    rawPassword  :   {
        type: String,
        required: [true, "Password must be provided"]
    },
    email  :   {
        type: String,
        required: [true, "Email must be provided"],
        lowercase: true
    }
})

Schema.pre('save', async function(next) {
    if ( !this.isModified() ) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

const Data = new mongoose.model('Data', Schema)

module.exports = Data