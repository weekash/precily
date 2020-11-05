// using mongoose driver to connect to a local Mongo URI
const connectDB=async()=>{
    const mongoose = require('mongoose');
    const MONGO_URI = 'YOUR MONGO URI HERE'
try
{    mongoose.connect(MONGO_URI,{useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,})
}
catch(err)
{
    console.log(err);
}
}
module.exports=connectDB;