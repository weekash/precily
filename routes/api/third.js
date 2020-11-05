const express = require('express');
const router = express.Router();
const Third = require('../../models/third');

router.get('/',async(req,res)=>{
    try
    {
    let notes = await Third.find().sort({'posted':-1});
    if(notes.length==0)
    res.send(404).send('Content Not Found');
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
let instance = new Third({note});
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