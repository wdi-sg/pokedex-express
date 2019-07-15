const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const file = 'pokedex.json';



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */


/**
 * ===================================
 * Routes
 * ===================================
 */
 app.get('/', (request, response) => {
   response.send('Welcome to the online Pokedex!');
 });

 app.get("/pokemon/:name", (request, response) => {
   // response.send("The pokemon is: " + request.params.name);

   jsonfile.readFile(file, function (err, data) {
      if (err){
        console.error(err);
      } else {
        let found = false;
        let message = '';
        for( var i = 0 ; i < data.pokemon.length; i++){
          var pokemonName = (data.pokemon[i].name).toLowerCase();
          if( request.params.name === pokemonName){
            message = `The pokemon is ${data.pokemon[i].name}. His weight is ${data.pokemon[i].weight}.`
            response.send(200, message);
            found = true;
          }
        }
        if(found === false){
          message = `Could not find information about ${request.params.name} - Is that a new pokemon? Gotta catch em' all!`;
          response.send(404, message);
        }
      }
    })
 });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
