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


/**
 * ===================================
 * Routes
 * ===================================
 */


// app.get('/pokemon/:x', (request, response) => {
//     if(request.path == "/pokemon/"+request.params.x) {
//         jsonfile.readFile(file, (err, obj) => {
//             response.send(obj.pokemon[parseInt(request.params.x)].name);
//         });
//     }
// });

var allPokemonName = [];

jsonfile.readFile(file, (err, obj) => {
    for (let i = 0; i < obj.pokemon.length; i++) {
        allPokemonName.push(obj.pokemon[i].name.toLowerCase());
    };
});

app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        if(allPokemonName.indexOf(request.params.name.toLowerCase()) === -1) {
            response.send("Status: 404. Could not find information about " +request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
        } else {
            for (let i = 0; i < obj.pokemon.length; i++){
                if (obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
                    response.send("<h2 style='color: blue'>Pokemon Chosen</h2>" +
                        "Name: " + obj.pokemon[i].name + "<br>" +
                        "Weight: " + obj.pokemon[i].weight + "<br>" +
                        "Height: " + obj.pokemon[i].height + "<br>" +
                        "<img src='" + obj.pokemon[i].img + "'>" + "<br>" +
                        "Type: " + obj.pokemon[i].type
                        );
                };
            };
        };
    });
});


app.get('*', (request, response) => {
    response.send("not found");
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));