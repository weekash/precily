const mongoose = require('mongoose');
const SecondSchema = new mongoose.Schema({
    note:{
        type:String,
        required:Date.now
    },
    posted:{
        type:Date,
        default:Date.now
    }
})
const Second = mongoose.model('Second',SecondSchema);
module.exports= Second;