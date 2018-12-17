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
jsonfile.readFile(pokedex, (err, obj) => {

    //further 3
    app.get("/type/:thetype", (request, response) => {
        const fakeArr = [];
        // var searchKing = obj.pokemon[i].type[j];
        var searchType = request.params.thetype;
        for (let i = 0; i < obj.pokemon.length; i++) {
            for (let j = 0; j < 2; j++) {
                if (obj.pokemon[i].type[j] !== undefined) {
                    var newStr = obj.pokemon[i].type[j];
                    newStr = newStr.toLowerCase();
                }
                if (searchType == newStr) {
                    fakeArr.push(obj.pokemon[i].name);
                }
            }
        }
        response.send("The pokemons are " + fakeArr.join(", ") + ".");
    });

    //further 2
    app.get('/', (request, response) => {
        response.send('Welcome to the online Pokedex!')
    });

    //MVP and further 1
    app.get("/:name", (request, response) => {
        let x = 1;
        var searchPoke = request.params.name.toLowerCase();
        for (var i = 0; i < obj.pokemon.length; i++) {
            var searchInput = obj.pokemon[i].name.toLowerCase();
            if (searchInput === searchPoke) {
                x = 0;
                response.send("It's weight is: " + obj.pokemon[i].weight);
                console.log(obj.pokemon[i].weight);
            }
        }
        if (x == 1) {
            response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!")
        }

    });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));