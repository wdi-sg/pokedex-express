const express = require('express');

const jsonfile = require('jsonfile');

const file = "pokedex.json"

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

  var doWhenFileIsRead = function(err, obj) {
      jsonfile.readFile(file, doWhenFileIsRead);


        if (err) {
            console.log(err)
        }  else {
            pokedex = obj;
        }
  };


app.get('*', (request, response) => {
    console.log('hello');
  // send response with some data (a string)
  response.send(response.path)

    for (var i = 0; i < obj.poke.length; i++) {
        let pokemon = obj.pokemon[i];
        let pokemonRequested = request.params.name.toLowerCase();
            if (pokemon.name.toLowerCase() === namequested) {
                response.send("your pokemon's weight is: " + pokemon.weight);

    }
 }
});
/**
 * ===================================
 * Routes
 * ===================================
 */



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
