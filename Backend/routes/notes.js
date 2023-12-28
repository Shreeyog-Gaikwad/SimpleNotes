const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser'); 
const { body, validationResult } = require('express-validator');



// ROUTE 1 : Getting all notes by GET "/api/notes/fetchallnotes". No login required
router.get('/fetchallnotes', fetchuser,  async (req,res) => {
    try
    {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// ROUTE 2 : Adding all notes created by User by Post "/api/notes/addnotes". No login required
router.post('/addnotes', fetchuser, [
    body('title').isLength({min : 3}).withMessage("Title must be atlest of 3 characters."),
    body('description').isLength({min : 3}).withMessage("Description must be atlest of 3 characters."),
],async (req,res) => {
    try
    {
        const {title, description, tag} = req.body;

        // Validating all fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        //Adding new Note to the Database
        const note = new Notes ({
            title, description, tag , user:req.user.id
        });
        const savednote = await note.save();
        res.json(savednote);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// ROUTE 3 : Updating notes created by User by Put "/api/notes/updatenote/:id". No login required
router.put('/updatenote/:id', fetchuser ,async (req,res) => {
    try {
        const {title, description, tag } = req.body;
        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};
        // Finding the note to be Updated and Update it.
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return req.status(404).send("Note not found.");
        }
        if(note.user.toString() !== req.user.id)
        {
            return req.status(401).send("Access Denied!!!");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newnote}, {new:true});
        res.json({note});
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// ROUTE 4 : Deleting notes created by User by DELETE "/api/notes/deletenote/:id". No login required
router.delete('/deletenote/:id', fetchuser ,async (req,res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return req.status(404).send("Note not found.");
        }
        if(note.user.toString() !== req.user.id)
        {
            return req.status(401).send("Access Denied!!!");
        }
        note = await Notes.findOneAndDelete(req.params.id);
        res.json({"Success" : "Note has been Deleted", note:note})
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;