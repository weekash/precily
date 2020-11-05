const express = require('express');
const router = express.Router();
const Second = require('../../models/second');

router.get('/',async(req,res)=>{
    try
    {
    let notes = await Second.find().sort({'posted':-1});
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
    try
   {
let instance = new Second({note});
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