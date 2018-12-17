const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();



//if the user didn't put anything in the path
app.get("/", (request, response) => {
response.send("Welcome to the online Pokdex!");
})

//Return a string response with the requested pokemon's information when a request comes with matching the route /some-name
app.get("/:some_name", (request, response) => {
    let params = request.params.some_name;
    jsonfile.readFile(file, (err, obj) => {
        let pokemonArray = obj.pokemon;
        for (i = 0; i < pokemonArray.length; i ++) {
            if (pokemonArray[i].name.toLowerCase() === params.toLowerCase()) {
                response.send("<html><body><img src =" +pokemonArray[i].img + "><br><h1>This is " +params + ".</h1><p>He weighs " + pokemonArray[i].weight + " and is " + pokemonArray[i].height + " tall.</p></html>")
            }
            //an invalid pokemon name is provided
            else if (err) {
                response.sendStatus(404);
                response.send("Could not find information about " + params + " - Is that a new pokemon? Gotta catch em' all!")
            }
        }
    })
})

//Expose a new route for /type/some-type that returns a message listing the names of all pokemon that have the specified type (eg. /type/grass should show a page with names of all pokemon of grass type).
app.get("/type/:some_type", (request, response) => {
    let params = request.params.some_type;
    let pokemonsWithSameType = [];
    jsonfile.readFile(file, (err, obj) => {
        let pokemonArray = obj.pokemon;
        for (i = 0; i < pokemonArray.length; i ++) {
            for (j = 0; j < pokemonArray[i].type.length; j ++) {
                if (pokemonArray[i].type[j].toLowerCase() === params.toLowerCase()) {
                    pokemonsWithSameType.push(pokemonArray[i].name)
                }
                //an invalid pokemon type is provided
                else if (err) {
                    response.sendStatus(404);
                    response.send("Could not find information about " + params + " - Is that a new pokemon? Gotta catch em' all!")
                }
            }
        }
response.send("Pokemons of " + params + " type are as follows: " + pokemonsWithSameType.join(' , ') + ".")
    })
})

//Expose a new route for /weaknesses/some-weakness that returns a message listing the names of all pokemon that have the specified weakness (eg. /weakness/rock).
app.get("/weaknesses/:some_weakness", (request, response) => {
    let params = request.params.some_weakness;
    let pokemonsWithSameWeakness = [];
    jsonfile.readFile(file, (err, obj) => {
        let pokemonArray = obj.pokemon;
        for (i = 0; i < pokemonArray.length; i ++) {
            for (j = 0; j < pokemonArray[i].weaknesses.length; j ++) {
                if (pokemonArray[i].weaknesses[j].toLowerCase() === params.toLowerCase()) {
                    pokemonsWithSameWeakness.push(pokemonArray[i].name)
                }
                //an invalid pokemon type is provided
                else if (err) {
                    response.sendStatus(404);
                    response.send("Could not find information about " + params + " - Is that a new pokemon? Gotta catch em' all!")
                }
            }
        }
response.send("Pokemons with " + params + " weakness are as follows: " + pokemonsWithSameWeakness.join(' , ') + ".")
    })
})


// Expose a new route for /nextevolution/some-name that returns a message listing the names of all pokemon that the pokemon evolves from (eg. /nextevolution/charizard).
app.get("/nextevolution/:some_name", (request, response) => {
    let params = request.params.some_name;
    let pokemonsWithSameAncestor = [];
    jsonfile.readFile(file, (err, obj) => {
        let pokemonArray = obj.pokemon;
        for (i = 0; i < pokemonArray.length; i ++) {
            if (pokemonArray[i].next_evolution !== undefined) {
                for (j = 0; j < pokemonArray[i].next_evolution.length; j ++) {
                    if (pokemonArray[i].next_evolution[j].name.toLowerCase() === params.toLowerCase()) {
                    pokemonsWithSameAncestor.push(pokemonArray[i].name)
                    }
                //an invalid pokemon type is provided
                    else if (err) {
                        response.sendStatus(404);
                        response.send("Could not find information about " + params + " - Is that a new pokemon? Gotta catch em' all!")
                    }
                     else {
                            response.send("No pokemons evolve from " + params + ".")
                    }
                }
            }
        }
response.send("Pokemons that evolves from " + params + " are as follows: " + pokemonsWithSameAncestor.join(' , ') + ".")
    })
})


app.listen(3000);



