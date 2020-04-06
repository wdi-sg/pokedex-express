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

app.get("/pokemon/:id", (request, response) => {
    const editStuff = (err, obj) => {
        var pokeId = parseInt(request.params.id) - 1;
        var pokemon = obj.pokemon[pokeId].name;
        response.send('Your chosen pokemon is ' + pokemon)
        const doneReading = (err) => {
            console.log('done editing')
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, editStuff);
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