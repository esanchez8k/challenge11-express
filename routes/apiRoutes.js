const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// Route for retrieving all saved notes
router.get('/api/notes', (req, res) => {
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
router.post('/api/notes', (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }

    // Parse the data from JSON to an array of notes
    const notes = JSON.parse(data);

    // Generate a unique ID for the new note
    const newNoteId = generateUniqueId();

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

// Helper function to generate a unique ID for the notes
function generateUniqueId() {
  // Implementation depends on your preference, you can use a package like "uuid" or implement your own logic
  // Example: return Math.random().toString(36).substr(2, 9);
}

module.exports = router;