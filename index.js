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
    console.log('haveeeee');
    const name = request.params.name.toLowerCase();
    let pokemonWeight = "";
    let pokemonFound = false;
//read pokedex json
    jsonfile.readFile(file, (err, obj) => {
        console.log('or nottttttt');
         //read obj
         // response.send(obj);
//check through array and retrieve pokemon weight
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === name) {
                console.log(name);
                pokemonFound = true;
                pokemonWeight = obj.pokemon[i].weight;
                response.send(name + "'s weight is " + pokemonWeight);
                break;
            }
        };
//**note - this should be outside for-loop, otherwise there will be multiple responses triggered.//
        if(pokemonFound === false) {
            console.log(pokemonFound);
            response.send("Could not find information about " + name + " - Is that a new pokemon? Gotta catch em' all!");
        }
    });
});


//if nothing in the path//
app.get("/pokemon", (request, response) => {
    response.send("Welcome to the online Pokedex!");
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));