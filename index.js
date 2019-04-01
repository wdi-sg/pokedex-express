const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

//showing Pokemon's information
app.get("/:pokemonName", (request, response) => {

    let pokemonName = (request.params.pokemonName).toLowerCase();

    jsonfile.readFile(file, (err, obj) => {

        let isFound = false;

        for (let i=0; i<obj.pokemon.length; i++) {
            if (pokemonName === (obj.pokemon[i].name).toLowerCase()) {
                response.send("This is " + obj.pokemon[i].name + ", he is " + obj.pokemon[i].weight + " in weight! He also has a height of " + obj.pokemon[i].height +".");
                isFound = true;
            }
        };
        if (!isFound) {
            response.status(404).send("Could not find information about " + pokemonName + " - Is that a new Pokémon? Gotta catch em' all!");
        }
    });
});

//default response when nothing in path
app.get("", (request, response) => {
  response.send("Welcome to the online Pokédex!");
});

//getting list of specific pokemon type
app.get("/type/:someType", (request, response) => {

    let someType = (request.params.someType).toLowerCase();

    jsonfile.readFile(file, (err, obj) => {

        let pokeArr = [];
        let isFound = false;

        for (let i=0; i<obj.pokemon.length; i++) {

            let pokeType = (obj.pokemon[i].type).toString().toLowerCase();

            if (pokeType.includes(someType)) {
                pokeArr.push(obj.pokemon[i].name)
                isFound = true;
            }
        }
        if (isFound === true) {
            response.send("Pokémon type " + someType + ": " + pokeArr.join(', ') + ".")
        } else {
            response.status(404).send("Could not find Pokémon type " + someType + ".");
        }
    });
});

//getting list of weakness
app.get("/weakness/:someWeakness", (request, response) => {

    let someWeakness = (request.params.someWeakness).toLowerCase();

    jsonfile.readFile(file, (err, obj) => {

        let pokeArr = [];
        let isFound = false;

        for (let i=0; i<obj.pokemon.length; i++) {

            let pokeWeakness = (obj.pokemon[i].weaknesses).toString().toLowerCase();

            if (pokeWeakness.includes(someWeakness)) {
                pokeArr.push(obj.pokemon[i].name)
                isFound = true;
            }
        }
        if (isFound === true) {
            response.send("Pokémon weakness " + someWeakness + ": " + pokeArr.join(', ') + ".")
        } else {
            response.status(404).send("Could not find Pokémon weakness " + someWeakness + ".");
        }
    });
});

//getting list evolves from (not done)
//console log below shows example of evolved pokemon
// console.log(obj.pokemon[0].next_evolution[0].name);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));