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
 * Read pokedex file
 * ===================================
 */


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:idOfPokemon', (request, response) => {
  // send response with some data (a string)
    jsonfile.readFile(file, (err, obj)=>{
        if(err === null){
            let index = parseInt(request.params.idOfPokemon)-1;
            let pokemon = obj["pokemon"][index];
            response.send(pokemon);
        }else{
            response.send(err);
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));