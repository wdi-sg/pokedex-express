const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'
// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

//listen to request for pokemon name to get weight
app.get("/pokemon/:name", (request, response) => {
    const name = request.params.name
    let pokemonWeight = "";
    let noMatch = false;
//read pokedex json
    jsonfile.readFile(file, (err, obj) => {
         //read obj
         // response.send(obj);
//check through array and retrieve pokemon weight
        for (i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name === name) {
                console.log(name);
                pokemonWeight = obj.pokemon[i].weight;
                response.send(name + "'s weight is " + pokemonWeight);
            }
            if (obj.pokemon[i].name !== name) {
                noMatch === true;
                console.log('not found');
                response.send("Could not find information about " + name + " - Is that a new pokemon? Gotta catch em' all!");
            }
        }
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));