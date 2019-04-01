const express = require('express');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'

/**
 * ===================================
 * Routes
 * ===================================
 */

 // app.get('*', (request, response) => {
 //   // send response with some data (a string)
 //   response.send(request.path);
 // });

app.get('/Bulbasaur', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    // if(err){
    //   console.log("***Error found in reading file***");
    // }
      // console.log("***Reading file now***");
      // obj.pokemon[0].weight;
      response.send(obj.pokemon[0].weight);// send response with some data (a string)
      // console.log("***Done reading file***");
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
