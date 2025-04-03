// Import the express library
const express = require('express');

// Create an instance of an Express app
const app = express();

// Define a port number
const PORT = 3000;

// Define a GET route for the root URL ('/')
app.get('/', (req, res) => {
  res.send('Welcome to your sample Node.js server!');
});

// Define another GET route for a "hello" endpoint
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});