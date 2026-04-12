const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'contacts.txt');

// Middleware
app.use(cors()); // Allows your HTML page to call this API
app.use(express.json());

// Make sure the contacts.txt file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, 'ICT Career Guide - Contact Submissions \n\n');
  console.log('contacts.txt created.');
}

// POST /submit — Save form data to contacts.txt
app.post('/submit', (req, res) => {
  const { username, email, comment } = req.body;

  // Basic validation
  if (!username || !email || !comment) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const timestamp = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });

  const entry = [
    `--------------------------------------------------`,
    `Date     : ${timestamp}`,
    `Username : ${username}`,
    `Email    : ${email}`,
    `Comment  : ${comment}`,
    `--------------------------------------------------\n`,
  ].join('\n');

  // Append to contacts.txt
  fs.appendFile(DATA_FILE, entry + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ success: false, message: 'Failed to save data.' });
    }

    console.log(`New submission saved from: ${username} (${email})`);
    res.json({ success: true, message: 'Submission saved successfully!' });
  });
});

// GET /submissions — View all saved submissions (optional, useful for testing)
app.get('/submissions', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not read file.' });
    }
    res.type('text/plain').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`\n ICT Career Guide API running at http://localhost:${PORT}`);
  console.log(` Saving submissions to: ${DATA_FILE}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST http://localhost:${PORT}/submit      → Save a new submission`);
  console.log(`  GET  http://localhost:${PORT}/submissions → View all saved submissions\n`);
});