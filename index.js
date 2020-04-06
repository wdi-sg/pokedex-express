const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

jsonfile.readFile(file, (err, obj) => {
});
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

app.get("/pokemon/:name", (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    for (i = 0; i < obj.pokemon.length; i++) {
      if (request.params.name === obj.pokemon[i].name) {
        // send response with some data (a string)
        response.send(obj.pokemon[i].weight);
      }
      // if (request.params.name != obj.pokemon[i].name) {
      //   // response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
      // }
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
