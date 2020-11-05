const mongoose = require('mongoose');
// specifying a schema for our collection , steps are same for both Second and Third Schema
const FirstSchema = new mongoose.Schema({
    note:{
        type:String,
        required:true
    },
    posted:{
        type:Date,
        default:Date.now
    }
})
const First = mongoose.model('First',FirstSchema);
module.exports= First;