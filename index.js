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

    for (let i=0; i<pokemon.length; i++ ){
        
        if (pokemon[i].name === request.params.name) {//why isn't there a need for request.params[0].split("/")
            console.log('pokemon name is: ' + pokemon[i].name);
            response.send(`poke name is: ${pokemon[i].name}, poke weight is: ${pokemon[i].weight}`);//${} means?
        }
        else if (pokemon[i].name!== request.params.name) {//defaults to else statement
          response.status(404).send("Could not find information about " + (request.params.name) + "- Is that a new pokemon? Gotta catch em' all!" );;
        }
    }
  });
});
  // send response with some data (a string)
  app.get('/', (request, response) => {
    response.send('Welcome to the online pokedex!')
  });
  
 /* ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
