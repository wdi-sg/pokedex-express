const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'



/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });



app.get('/pokemon/:name', (request, response) => {
    var pokemonWeight;
    let pokemonFound = false;

    jsonfile.readFile(file, function (err, obj) {
        if (err) {
        console.error(err)
        response.send('Pokedex 404!');

        } else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                let pokemonName = obj.pokemon[i].name;
                if (pokemonName.toLowerCase() == request.params.name) {
                    console.log(request.params.name + ' weighs' + obj.pokemon[i].weight);
                    pokemonWeight = obj.pokemon[i].weight;
                    pokemonFound = true;

                    response.send(request.params.name + ' weighs ' + pokemonWeight);
                }
            }
            if (pokemonFound == false ) {
                response.send('No pokemon found');
            }
        }
    })
});

app.get('/', (request, response) => {
    response.send('welcome to pokemon world!');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));