// src/app.js
const express = require('express');

const app = express();

// middleware
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Express is running');
});

module.exports = app;
