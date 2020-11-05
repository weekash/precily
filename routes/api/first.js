const express = require('express');
const router = express.Router();
const First = require('../../models/first');

router.get('/',async(req,res)=>{
try
{
let notes = await First.find().sort({'posted':-1});
if(notes.length==0)
res.status(404).send('Content Not Found');
else
res.send(notes[0]);
}
catch(err)
{
res.status(500).send('Server error')
}
    
})


router.post('/',async(req,res)=>{
   const {note} = req.body;
   console.log(note);
    try
   {
let instance = new First({note});
await instance.save();
res.send(instance);
   }
   catch(err)
   {
console.log(err);
res.status(500).send('server error');
   }
        
    })
    module.exports=router;