const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

// find pokemon's details by name input
app.get("/:pokemon", (request, response) => {
    let pokemonName = request.params.pokemon;
    jsonfile.readFile(file, (err, obj) => {
        let pokemonFound = false;
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()) {
                let pokemonWeight = obj.pokemon[i].weight;
                let pokemonHeight = obj.pokemon[i].height;
                let candy = obj.pokemon[i].candy;
                let id = obj.pokemon[i].id;
                console.log(obj.pokemon[i]);
                if (candy.toLowerCase() === "none") {
                    response.send("This is " + pokemonName + ". It weighs " + pokemonWeight + " and it's height is " + pokemonHeight + ". " + pokemonName + "'s Pokedex number is " + id + ".");
                }
                else {
                    response.send("This is " + pokemonName + ", it weighs " + pokemonWeight + "! It's height is " + pokemonHeight + " and it uses " + candy + " to get stronger. " + pokemonName + "'s Pokedex number is " + id + ".");
                }

                pokemonFound = true;
            }
        }
        if (!pokemonFound) {
            response.status(404).send("Could not find information about " + pokemonName + "- is that a new pokemon? Gotta catch em' all!");
            // res.status(404).send("Could not find information about " + pokemonName + "- is that a new pokemon? Gotta catch em' all!")
        }
    });

});

// list the names of all pokemon that have the specified type
app.get("/type/:type", (request, response) => {
    let inputType = request.params.type;
    jsonfile.readFile(file, (err, obj) => {
        let typeFound = false;
        let pokemonList = [];
        for (let i = 0; i < obj.pokemon.length; i++) {
            let pokemonType = obj.pokemon[i].type.toString().toLowerCase();
            let typeInput = inputType.toLowerCase();
            if (pokemonType.includes(typeInput)) {
                pokemonList.push(obj.pokemon[i].name)
                typeFound = true;
            }
        }
        // console.log(typeFound)
        if (typeFound === true) {
            response.send("Here is a list of pokemon that are of the " + inputType + " type: " + pokemonList.join(', ') + ".");
        } else {
            response.status(404).send("Could not find information about " + inputType + "- is that a new pokemon type? Gotta catch em' all!");
        }
    });

});

// list the names of all pokemon that have the specified weakness
app.get("/weakness/:type", (request, response) => {
    let inputType = request.params.type;
    jsonfile.readFile(file, (err, obj) => {
        let pokemonFound = false;
        let pokemonList = [];
        for (let i = 0; i < obj.pokemon.length; i++) {
            let pokemonWeakness = obj.pokemon[i].weaknesses.toString().toLowerCase();
            let typeInput = inputType.toLowerCase();
            if (pokemonWeakness.includes(typeInput)) {
                pokemonList.push(obj.pokemon[i].name)
                pokemonFound = true;
            }
        }
        // console.log(typeFound)
        if (pokemonFound === true) {
            response.send("Here is a list of pokemon that have the weakness of " + inputType + " type: " + pokemonList.join(', ') + ".");
        } else {
            response.status(404).send("Could not find information about " + inputType + "- is that a new pokemon type? Gotta catch em' all!");
        }
    });
});

// list the names of all pokemon that the specified pokemon evolves from
app.get("/nextevolution/:pokemon", (request, response) => {
    let pokemonName = request.params.pokemon;
    jsonfile.readFile(file, (err, obj) => {
        let pokemonFound = false;
        let noPreEvolution = false;
        let pokemonList = [];
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()) {
                let preEvolution = obj.pokemon[i].prev_evolution;
                // console.log(PreEvolution)
                if (preEvolution === undefined) {
                    noPreEvolution = true;
                }
                else {
                    for (let pokemon of obj.pokemon[i].prev_evolution){
                        pokemonList.push(pokemon.name)
                    };
                }
                pokemonFound = true;
            }
        }
        // console.log(typeFound)
        if (pokemonFound === true) {
            if (noPreEvolution === false) {
                response.send(pokemonName + " is evolved from: " + pokemonList.join(', ') + ".");
            }
            else {
                response.send(pokemonName + " is not evolved from any other pokemon!");
            }

        } else {
            response.status(404).send("Could not find information about " + pokemonName + "- is that a new pokemon? Gotta catch em' all!");
        }
    });

});

// default response
app.get('*', (request, response) => {
    // send response with some data (a string)
    // response.send(request.path);
    response.send('<html><body><h1>Welcome to the online Pokedex!</h1></body></html>');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));