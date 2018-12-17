const express = require('express');

const jsonfile = require('jsonfile');

const pokedex = "pokedex.json";

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

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send("<html><body><strong>Hi</strong></body></html>");
// });

app.get('/:name', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => { //iterate thru the location of where all the pokemon data is stored - the pokedex.json file
        for (let i=0; i < obj.pokemon.length; i++) { //iterate thru the pokemon object
            Object.keys(obj.pokemon[i]).find( (key) => { //Object.keys() returns an array of the object's PROPERTY NAMES, find() returns the VALUE of the FIRST element in the array which satisfies the testing function
                if ( request.params.name == obj.pokemon[i][key] ) {
                    response.send("Weight of " + request.params.name + ": " + obj.pokemon[i].weight);
                }
            })
        }
    })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
