
//Global Declarations
const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

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



app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
