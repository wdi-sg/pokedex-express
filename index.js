const express = require('express');

// const jsonfile = require('jsonfile');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

 jsonfile.readFile(file, (err, obj) => {
    let pokedex = obj.pokemon
    let result = []
    for (var i=0; i<obj.pokemon.length; i++) {
        if (var userSearch == pokedex[i].name) {
            console.log(pokedex.[i].name + " Weight: " + pokedex[i].weight);
        }
    }
})

/**
 * ===================================
 * Routes
 * ===================================
 */
 app.get('/', (request, response) => {
   response.send("Welcome to the Pokedex!");
 });


app.get('*', (request, response) => {
  response.send(request.path);
});

app.get('/*', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let pokedex = obj.pokedex;
        let searchResult = [];
        for (i=0; i<pokedex.length; i++) {
            if (request.path == pokedex[i].name) {
                var pokeName = pokedex[i].name;
                var pokeWeight = pokedex[i].weight;
                searchResult.push("<h1>" + pokeName + "</h1><ul>Weight :" + pokeWeight + "</ul>");
            }
        }
    })
    response.send(searchResult);
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
