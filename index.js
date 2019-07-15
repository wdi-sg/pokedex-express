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

//----- Function for capitalizing first letter of Pokemon being searched -----//

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//----- Function for reading data.json -----//

const readDataFile = (pokemonName) => {

    let capPokemonName = capitalizeFirstLetter(pokemonName);

    console.log(capPokemonName);

    jsonfile.readFile(file, (err,obj) => {

        if(err) {
            console.log('there is an error')

        } else {

            console.log('running array check')

            for (let i = 0; i < obj['pokemon'].length; i ++) {

                if (obj['pokemon'][i].name === capPokemonName) {
                    console.log(obj['pokemon'][i].weight)
                }
            }
        }
    });
}

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

app.get("/pokedex/:name/", (request, response) => {

    let pokemonSearched = request.params.name;

    let output = readDataFile(pokemonSearched);

    response.send(output);

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));