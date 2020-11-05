const mongoose = require('mongoose');
const ThirdSchema = new mongoose.Schema({
    note:{
        type:String,
        required:Date.now
    },
    posted:{
        type:Date,
        default:Date.now
    }
})
const Third = mongoose.model('Third',ThirdSchema);
module.exports= Third;