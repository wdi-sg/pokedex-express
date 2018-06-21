const express = require('express');
const handlebars = require('express-handlebars');
const myjsonfile = require('jsonfile');
const pokedexPath = "./pokedex.json";
let pokemonDetails = {};

myjsonfile.readFile(pokedexPath, function(errorMessage, pokedexObj) {

    pokedexObj.pokemon.forEach( pokemon => { pokemonDetails[pokemon.name.toLowerCase()] = pokemon } );

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

// route ALL requests (because of '*'), to the specified callback
app.get('*', (request, response) => {

    // remove the '/' from the string of request.path
    let requestedName = request.path.replace('/','').toLowerCase();

    // check if the requested name exists in the database
    if (Object.keys(pokemonDetails).includes(requestedName)) {

        console.log(pokemonDetails[requestedName].weight);
    } else {
        console.error(requestedName, "doesnt exist");
    }

})

// app.get('*', (request, response) => {
//   let pokeDetails = {};
//   response.render('home');
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
