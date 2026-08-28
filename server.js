const express = require('express');
const path = require('path');
require('dotenv').config();

const apiApp = require('./api/index');
const PORT = process.env.PORT || 8000;

// Mount API app
const mainApp = express();
mainApp.use(apiApp);

// Serve static frontend files
mainApp.use(express.static(path.join(__dirname)));

// Fallback routing for /admin and SPA routes
mainApp.get('/admin*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

mainApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

mainApp.listen(PORT, () => {
  console.log(`Madhuri Creation Full-Stack Server running at http://localhost:${PORT}/`);
  console.log(`Admin Panel available at http://localhost:${PORT}/admin`);
});
