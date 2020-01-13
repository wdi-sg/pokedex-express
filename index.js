const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';
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

app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(file, (err, obj) => {

    for (let i=0; i<obj.pokemon.length; i++ ){
        console.log('pokemon name is: ' + obj.pokemon[i].name);
        if (obj.pokemon[i].name === request.params.name) {//why isn't there a need for request.params[0].split("/")
            response.send(`poke name is: ${obj.pokemon[i].name}, poke weight is: ${obj.pokemon[i].weight}`);//${} means
        }
        else if (obj.pokemon[i].name!== request.params.name) {//defaults to else statement
          response.status(404).send("Could not find information about " + (request.params.name) + "- Is that a new pokemon? Gotta catch em' all!" );;
        }
    }
  });
});
  // send response with some data (a string)

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
