const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'

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
//   response.send(request.path);
// });

app.get("/:pokemon", (request, response) => {
    let pokemonName = request.params.pokemon.toLowerCase();
    jsonfile.readFile(file, (err,obj) => {
        let found = false;
        for (let i = 0; i < obj.pokemon.length; i++) {
           if (pokemonName === obj.pokemon[i].name.toLowerCase()) {
                let pokemonWeight = obj.pokemon[i].weight;
                let pokemonHeight = obj.pokemon[i].height;
                console.log(obj.pokemon[i]);
                response.send("This is " + pokemonName + ", he is " + pokemonWeight + " in weight! He also has a height of " + pokemonHeight + ".");
           }
            if (!found) {
                response.status(404).send("Couldn't find info about " + pokemonName + " - is this a new Pokemon? Gotta catch em' all!");
            }
        }
    })

})

app.get("/:type", (request, response) => {
    let input = request.params.pokemon.type.toLowerCase();
    jsonfile.readFile(file, (err,obj) => {
        let found = false;
        let pList = [];
        for (let i=0; obj.pokemon.length; i++) {
            let pType = obj.pokemon[i].type.toLowerCase();
            if(pType.includes(input)) {
                pList.push(obj.pokemon[i].name);
                found = true;
            }
        }
        if (found === true) {
            response.send("Here are pokemon's that are of the " + input + " type: " + pList.join(',') + ".");
            } else {
                response.status(404).send("Couldn't find info about " + obj.pokemon[i].name + " - is this a new Pokemon? Gotta catch em' all!");
            }
    })
})

app.get("", (request,response)=> {
    response.send("Welcome to the online Pokedex!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));