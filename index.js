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
        response.status(404);

        } else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                let pokemonName = obj.pokemon[i].name;
                if (pokemonName.toLowerCase() == request.params.name) {
                    console.log(request.params.name + ' weighs ' + obj.pokemon[i].weight);
                    pokemonWeight = obj.pokemon[i].weight;
                    pokemonFound = true;

                    response.send(request.params.name + ' weighs ' + pokemonWeight);
                }
            }
            if (pokemonFound == false ) {
                response.send('Could not find information about ' + request.params.name + '... Is that a new pokemon? Gotta catch em all!');
                response.status(404);
            }
        }
    })
});


app.get('/type/:requestType', (request, response) => {
    var pokemonType;
    let typeArr = [];
    let pokemonFound = false;

    jsonfile.readFile(file, function (err, obj) {
        if (err) {
        console.error(err)
        response.send('Pokedex 404!');
        response.status(404);

        } else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                let pokemonType = obj.pokemon[i].type[0];
                if (pokemonType.toLowerCase() == request.params.requestType) {
                    pokemonFound = true;
                    // console.log('type: ' + obj.pokemon[i].type[0] + ' name: ' + obj.pokemon[i].name);
                    typeArr.push('Type: ' + obj.pokemon[i].type[0] + ' ; Name: ' + obj.pokemon[i].name);
                }
            }
            if (pokemonFound == false ) {
                response.send('Could not find information about ' + request.params.requestType + '... Is that a new type?');
                response.status(404);
            } else {
                response.send(typeArr);
            }
        }
    })
});




app.get('/pokemon', (request, response) => {
    response.send('Which pokemon are you looking for?');
});

app.get('/', (request, response) => {
    response.send('Welcome to the online Pokdex!');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));