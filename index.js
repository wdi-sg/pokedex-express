const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

jsonfile.readFile(file, (err, obj) => {
    //const pokemonName = obj.pokemon[i].name;
    //const pokemonWeight = obj.pokemon[i].weight;

    let pokemonName = "";
    let pokemonWeight = "";
    app.get('/pokemon/:x', (request, response) => {
    //takes user input and assign it to variable i
    let i = request.params.x;
    pokemonName = obj.pokemon[i].name;
    pokemonWeight = obj.pokemon[i].weight;

    if( err ){
      console.log("ERROR!!!", err );
    }

     response.send(`Pokemon Name: ${pokemonName} Weight: ${pokemonWeight}`);
});
});

   /* app.get("/pokemon/:name", (request, response) => {
    let pokeNum = null;

     for (let i=0; i<obj.pokemon.length; i++){
        request.params.name = obj.pokemon[i].name;
        i = pokeNum;
        return pokeNum;
    }
    pokemonWeight = obj.pokemon[pokeNum].weight;
    response.send(`Pokemon Name: ${request.params.name} Weight:  ${pokemonWeight}`)
});*/


//});

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