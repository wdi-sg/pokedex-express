const express = require('express');

const jsonfile = require('jsonfile');

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

app.get('/pokemon',(request,response) => {
    console.log('pokemon index');
});

app.get('/pokemon/:pokemon', (request, response) => {
    // retrieving pokemon type parameter
    pokemonName = request.params.pokemon;

    // // retrieve pokemon index from parameter
    // pokemonNum = parseInt(request.params.pokemon)-1;

    const file = './pokedex.json'
    // find the type of pokemon from pokedex
    jsonfile.readFile(file, (err, obj) => {
        let pokemonArray = obj.pokemon;

        let foundPokemon = false;

        for (let i = 0; i < obj.pokemon.length; i++) {
            if (pokemonArray[i].name.toLowerCase() == pokemonName){
                foundPokemon = true;
                response.send(
                    `
                    This is ${pokemonArray[i].name}, he is ${pokemonArray[i].weight} in weight and ${pokemonArray[i].height} in height.

                    `
                );
            }
        }

        if(!foundPokemon){
            response.status(404).send(`Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`);
        }
    })
})


app.get('/', (request,response) => {
   response.send('Welcome to the online pokedex');
})

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));