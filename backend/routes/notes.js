const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/NotesSchema');
const {body , validationResult} = require('express-validator');

//ROUTE 1 : Get All the Notes using GET "/api/notes/getuser"  Login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{

    try {
        const notes = await Notes.find({user: req.user.id})//finds all notes with that user
        res.json(notes);
        
    } catch (error) {
        res.status(500).send("Internal Server Error occured");
    console.log(error.message);
        
    }

})
//ROUTE 2 : Add a NEW note using POST "/api/notes/addnote"  Login required
router.post('/addnote',fetchuser,[ //validation of input
    body('title','Enter a valid Title').isLength({min:3}),
    body('description','Description must be atleast 5 chars').isLength({min:5})
], async (req,res)=>{

    try {
        const {title,description, tag} = req.body;
        //if there are errors return Bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()}); 
        }
    
        const note = new Notes({  //creating new notes
            title,description,tag, user : req.user.id
    
        })
        const savedNote = await note.save() //saving notes
        
        res.json(savedNote);  //sending response of saved note
        
    } catch (error) {
        res.status(500).send("Internal Server Error occured");
    console.log(error.message);
        
    }


})

//ROUTE 3 : Update an existing Note using PUT "/api/notes/updatenote"  Login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{

    const {title, description,tag}= req.body;

    try {
    //Create a newnote object
    const newNote = {};
    if(title){
        newNote.title = title
    };
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    }

    //Find the note to be Updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }

        //if the person entering the details and the person who owns the note does not match it shows not allowed
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note})
} catch (error) {
    res.status(500).send("Internal Server Error occured");
    console.log(error.message);
        
}

})


//ROUTE 4 : Delete an existing Note using DELETE "/api/notes/deletenote"  Login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{

    try {
        
    
    //Find the note to be Deleted and delete it

    //if note not found then send 404
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }

        //if the person deleting the note and the person who owns the note does not match it shows not allowed
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been Deleted", note})
} catch (error) {
    res.status(500).send("Internal Server Error occured");
    console.log(error.message);
}

})







module.exports=router;