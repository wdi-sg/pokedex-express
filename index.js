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
        for( var i = 0 ; i < data.pokemon.length; i++){
          var pokemonName = (data.pokemon[i].name).toLowerCase();
          if( request.params.name === pokemonName){
            response.send(`The pokemon is ${data.pokemon[i].name}. His weight is ${data.pokemon[i].weight}.`);
          }
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
