const express = require('express');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/:name/:type", (request, response) => {
  // send response with some data (a string)
  console.log(request.params);
  console.log(request.params.name + " " + request.params.type)
  response.send('listening!');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = 3000;
app.listen(PORT);
console.log("listening to "+PORT);