const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


// Route for retrieving all saved notes
router.get('/notes', (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }

    // Parse the data from JSON to an array of notes
    const notes = JSON.parse(data);

    // Send the notes as a JSON response
    res.json(notes);
  });
});

// Route for saving a new note
router.post('/notes', (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }

    // Parse the data from JSON to an array of notes
    const notes = JSON.parse(data);

    // Generate a unique ID for the new note
    const newNoteId = uuidv4();

    // Create a new note object with the provided data and generated ID
    const newNote = {
      id: newNoteId,
      title: req.body.title,
      text: req.body.text,
    };

    // Add the new note to the array of notes
    notes.push(newNote);

    // Write the updated array of notes back to the db.json file
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note.' });
      }

      // Send the new note as a JSON response
      res.json(newNote);
    });
  });
});


module.exports = router;