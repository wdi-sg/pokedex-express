const express = require('express');
const handlebars = require('express-handlebars');
const myjsonfile = require('jsonfile');
const pokedexPath = "./pokedex.json";
let pokemonDetails = {};
let pokemonArray;

myjsonfile.readFile(pokedexPath, function(errorMessage, pokedexObj) {

    pokemonArray = pokedexObj.pokemon;
    pokedexObj.pokemon.forEach( pokemon => { pokemonDetails[pokemon.name.toLowerCase()] = pokemon } );

});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.set('view engine', 'jade');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {

    let context = { "names": Object.keys(pokemonDetails).map( name => pokemonDetails[name].name ) };
    response.render('home', context);
})

app.get('/type/:type', (request, response) => {

    const originalRequest = request.params.type;
    let requestedType = originalRequest.toLowerCase();

    let filteredPokemonArray = pokemonArray.filter( currentPokemon => currentPokemon.type.map( element => element.toLowerCase() ).includes(requestedType) );

    let context = { "descriptions": filteredPokemonArray };
    response.render('type', context);

})

// route ALL requests (because of '*'), to the specified callback
app.get('/pokemon/:name', (request, response) => {

    const originalRequest = request.params.name;
    let requestedName = originalRequest.toLowerCase();

    // check if the requested name exists in the database
    if (Object.keys(pokemonDetails).includes(requestedName)) {

        let context = { "descriptions": pokemonDetails[requestedName], "name": pokemonDetails[requestedName].name };
        response.render('description', context);

    } else if (!Object.keys(pokemonDetails).includes(requestedName)) {

        let context = { "name": originalRequest };
        response.status(404);
        response.render('error', context);

    }

})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
