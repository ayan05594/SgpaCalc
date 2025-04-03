const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname)));

// File path for storing records
const recordsFilePath = path.join(__dirname, 'records.json');

// Load existing records or initialize an empty array
let records = [];
if (fs.existsSync(recordsFilePath)) {
  records = JSON.parse(fs.readFileSync(recordsFilePath, 'utf-8'));
}

// Endpoint to save a record
app.post('/save-record', (req, res) => {
  const record = req.body;

  if (!record.name || !record.email || !record.sgpa || !record.timestamp) {
    return res.status(400).json({ error: 'Invalid record data' });
  }

  // Add the new record
  records.push(record);

  // Save records to file
  fs.writeFileSync(recordsFilePath, JSON.stringify(records, null, 2));

  res.status(201).json({ message: 'Record saved successfully' });
});

// Endpoint to fetch all records
app.get('/get-records', (req, res) => {
  res.status(200).json(records);
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});