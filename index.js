const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// const jsonfile = require('jsonfile');

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


app.get('/pokemon/:pokename', (request, response) => {

    let i = 0;
    let foundPokemon = null;
    let pokemonName = request.params.pokename;
    console.log(`Now searching for ${pokemonName}`);

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(`Aww shucks there's an error: ${err}`);
        }
        for (i = 0; i < obj["pokemon"].length; i++) {
            console.log("looping i:" + i);
            if (obj["pokemon"][i].name.toLowerCase() === pokemonName.toLowerCase()) {
                console.log('OMG')
                foundPokemon = obj["pokemon"][i];
                console.log(foundPokemon)
                console.log(`i is ${i}`);
                response.send(foundPokemon);
                break;
            }
        }
        if (foundPokemon === null) {
            response.status(404).send(`<html><body style='text-align:center'><h1>Error 404</h1><h2>Could not find ${pokemonName}.</h2><img src='https://static.pokemonpets.com/images/monsters-images-300-300/404-Luxio.png'></body></html>`)
        }
    })
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));