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
                response.send(`${foundPokemon.name} is a ${foundPokemon.type} type Pokemon. It is weak to ${foundPokemon.weaknesses.join(", ")} attacks.`);
                break;
            }
        }
        if (foundPokemon === null) {
            response.status(404).send(`<html><body style='text-align:center'><h1>Error 404</h1><h2>Could not find ${pokemonName}.</h2><img src='https://static.pokemonpets.com/images/monsters-images-300-300/404-Luxio.png'></body></html>`)
        }
    })
})

app.get('/', (request, response) => {
    response.send(`<html><body style='text-align:center'><h1>Welcome to the online pokedex!</h1></body><html>`)
});

// for type -- use RegExp for case insensitive search
app.get('/type/:ttype', (request, response) => {

    let i = 0;
    let foundPokemon = [];
    let pokemonType = request.params.ttype;
    console.log(`Now searching for Pokemon of ${pokemonType} type`);

    jsonfile.readFile(file, (err, obj) => {
        console.log("jenny")
        if (err) {
            console.log(`Aww jeez there's an error: ${err}`);
        }
        for (i = 0; i < obj["pokemon"].length; i++) {
            console.log("looping i:" + i);

// use RegExp here
            if (obj["pokemon"][i]["type"].includes(pokemonType)) {
                foundPokemon.push(obj["pokemon"][i]["name"]);
                console.log(foundPokemon)
                console.log(`i is ${i}`);
                response.send(`${foundPokemon}`);
            }
        }
        if (foundPokemon === null) {
            response.status(404).send(`<html><body style='text-align:center'><h1>Error 404</h1><h2>Could not find ${pokemonName}.</h2><img src='https://static.pokemonpets.com/images/monsters-images-300-300/404-Luxio.png'></body></html>`)
        }
    })
});

// app.get('/weaknesses/:some-weakness', (request, response) => {
//     response.send(`<html><body style='text-align:center'><h1>Welcome to the online pokedex!</h1></body><html>`)
// });

// app.get('/nextevolution/:some-name', (request, response) => {
//     response.send(`<html><body style='text-align:center'><h1>Welcome to the online pokedex!</h1></body><html>`)
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));