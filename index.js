const express = require('express');

const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json';
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
app.get('/', (request, response) => {
    response.send('Hello! Go to ../pokemon for more.');
});

app.get('/pokemon', (request, response) => {
    response.send("Welcome to the Pokedex!\n Start by entering a number like so : pokemon/2");
});

app.get("/pokemon/:name", (request, response) => {
    const readPokedex = (err, obj) => {
        var pokemonCount = obj.pokemon.length;
        var pokeName = request.params.name;
        pokeName = pokeName.substring(0,1).toUpperCase() + pokeName.substring(1).toLowerCase();
        for(let i = 0; i < pokemonCount; i++){
          if(obj.pokemon[i].name == pokeName){
            var pokeWeight = obj.pokemon[i].weight;
            response.send(`You have chosen ${pokeName} and it weighs ${pokeWeight}`)
          }
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`Could not find information about ${pokeName} - Is that a new pokemon? Gotta catch em' all!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readPokedex);
    console.log("file read called");
});

// app.get('*', (request, response) => {
// send response with some data (a string)
//     response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));