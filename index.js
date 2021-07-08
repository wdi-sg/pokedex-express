const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json'
const app = express();

//Find pokemon by name
app.get('/pokedex/:name', (request, response)=> {

  // get data from the file
    var pokemonFound = false
    jsonfile.readFile( pokedex, ( err, obj ) => {

    for (let i = 0; i < obj['pokemon'].length; i++) {

        if (request.params.name === obj['pokemon'][i].name.toLowerCase()) {

            pokemonFound = true;
            response.send("You have requested " + obj['pokemon'][i].name + ". " + "It is " + obj['pokemon'][i].weight);
        }

    }
        if (pokemonFound === false) {
            response.status(404);
            response.send("Could not find information about '" + request.params.name + "'. Is that a new pokemon? Gotta catch em' all!" + " Status 404");
        }
    })
});

//Find pokemon by type
app.get('/pokedex/type/:name', (request, response) => {
  // get data from the file
    var pokemonFound = false;
    var found = [];
    jsonfile.readFile( pokedex, ( err, obj ) => {

        for (let i = 0; i < obj['pokemon'].length; i++) {

            let pokemonArray = (obj['pokemon'][i].type.toString().toLowerCase())
            let requestedWord = (request.params.name)

            if (pokemonArray.includes(requestedWord)) {

                found.push(obj['pokemon'][i].name);
                console.log(found);
            }

        }

            if (found.length < 0) {
                response.status(404);
                response.send("Could not find information about '" + request.params.name + "'. Is that a new pokemon? Gotta catch em' all!" + " Status 404");
    }
            else {
                let here = found.join(", ")
                response.send("Here are all the pokemons with " + request.params.name + " type: " + here);
    }
    });

});

//Find pokemon by weakness
app.get('/pokedex/weaknesses/:name', (request, response) => {
  // get data from the file
    c
    var found = [];
    jsonfile.readFile( pokedex, ( err, obj ) => {

        for (let i = 0; i < obj['pokemon'].length; i++) {

            let pokemonArray = (obj['pokemon'][i].type.toString().toLowerCase())
            let requestedWord = (request.params.name)

            if (pokemonArray.includes(requestedWord)) {

                // console.log(obj['pokemon'][i].type)
                // pokeFound = true;
                found.push(obj['pokemon'][i].name);
                console.log(found);
                // response.send("Here are all the pokemons with" + request.params.name + "type" + obj['pokemon'][i].name);
                }

        }

            if (found.length < 0) {
                response.status(404);
                response.send("Could not find information about '" + request.params.name + "'. Is that a new pokemon? Gotta catch em' all!");
                            }

            else {
                let here = found.join(", ")
                response.send("Here are all the pokemons with " + request.params.name + " weaknesses: " + here);
            }

    });

});

//Find pokemon by their next evolution
app.get('/pokedex/nextevolution/:name', (request, response) => {

    var pokemonFound = false;
    var evolution = false;
    var found = [];
    jsonfile.readFile( pokedex, ( err, obj ) => {

        for (let i = 0; i < obj['pokemon'].length; i++) {

            // console.log(obj['pokemon'][i].prev_evolution);
            // console.log(obj['pokemon'][i].next_evolution);

            if (request.params.name.toLowerCase() === obj['pokemon'][i].name.toLowerCase()) {
                pokemonFound = true;

                if (obj['pokemon'][i].next_evolution != undefined){

                    evolution = true;
                    // console.log(obj['pokemon'][i].next_evolution);

                    strNext = JSON.stringify(obj['pokemon'][i].next_evolution);
                    strPrev = JSON.stringify(obj['pokemon'][i].prev_evolution);

                    // console.log(strPrev);
                    // console.log(strNext);

                    response.send(request.params.name + "'s previous evolutions are " + strPrev + " and " + request.params.name + " 's next evolutions are " + strNext);

                }

                    if (!pokemonFound) {

                        response.status(404).send("Could not find information about '" + request.params.name + "'. Is that a new pokemon? Gotta catch em' all!");
                    }

                    else if (pokemonFound && !evolution) {

                        response.status(404).send("No further evolutions for '" + request.params.name + "' has been found. " + "And " + request.params.name + "'s previous evolutions are " + JSON.stringify(obj['pokemon'][i].prev_evolution));

                    }

            }
        }

    });

});


// default / last matcher at bottom
app.get('/pokedex/', (request, response)=> {

  response.send("Welcome to the online Pokedex!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));
