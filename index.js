const express = require('express');

const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
let pokedexObj = [];

jsonfile.readFile(file, (err, obj) => {
    pokedexObj = obj["pokemon"];

})

app.get("/pokemon", (request, response) => {
    response.send("Welcome to the online Pokedex!");
})

app.get("/pokemon/nextevolution/:name", (request, response) => {
    let pokemonToFind = request.params.name.toLowerCase();
    console.log(pokemonToFind);

    let babyPokemon = null;
    let fullyEvolvedPokemon = null;


    //pokemon[4].next_evolution[0].name
    for(let i = 0; i < pokedexObj.length; i++) {
        for(let j = 0; j < pokedexObj[i].next_evolution.length; j++) {
            if(pokemonToFind === pokedexObj[i].next_evolution[j].name.toLowerCase()) {
                babyPokemon = pokedexObj[i].name;
                fullyEvolvedPokemon = pokedexObj[i].next_evolution[j].name;
            }
        }
    }

    if(pokemonToFind === fullyEvolvedPokemon) {
        response.send(fullyEvolvedPokemon + " was once actually " + babyPokemon);
    } else {
        response.send("There is no such Pokemon mate.");
    }

})

app.get("/pokemon/type/:pokeType", (request, response) => {
    let typeToFind = request.params.pokeType.toLowerCase();
    console.log(typeToFind);
    let pokemonType = null;
    let pokemon = [];

    for(let i = 0; i < pokedexObj.length; i++) {
        for(let j = 0; j < pokedexObj[i].type.length; j++) {
             if(typeToFind === pokedexObj[i].type[j].toLowerCase()) {
            pokemonType = pokedexObj[i].type[j].toLowerCase();
            pokemon.push(pokedexObj[i].name);
            console.log(pokemon);
            }
        }
    }

    if(typeToFind === pokemonType) {
        response.send("Here is a list of pokemon of the " + pokemonType + " type. " + pokemon);
    } else {
        response.send("No such type of Pokemon.");
    }

})

app.get("/pokemon/weakness/:weakness", (request, response) => {
    let weaknessToFind = request.params.weakness.toLowerCase();
    console.log(weaknessToFind + " WEAKNESS");

    let weakness = null;
    let pokemon = [];

    for(let i = 0; i < pokedexObj.length; i++) {
        for(let j = 0; j < pokedexObj[i].weaknesses.length; j++) {
            if(weaknessToFind === pokedexObj[i].weaknesses[j].toLowerCase()) {
                weakness = pokedexObj[i].weaknesses[j].toLowerCase();
                pokemon.push(pokedexObj[i].name);
                console.log(pokemon);
            }
        }
    }

    if(weaknessToFind === weakness) {
        response.send("The following Pokemon are weak against the element " + weakness + ". " + pokemon);
    } else {
        response.send("Not a recognised type of weakness.");
    }




    //pokemon[14].weaknesses

})

app.get("/pokemon/:name", (request, response) => {

    let pokemonToFind = request.params.name.toLowerCase();
    console.log(pokemonToFind);
    let pokemon = null;
    let pokemonWeight = null;
    let pokemonType = null;


    for(let i = 0; i < pokedexObj.length; i++) {
        if(pokemonToFind === pokedexObj[i].name.toLowerCase()) {
            pokemon = pokedexObj[i].name.toLowerCase();
            pokemonWeight = pokedexObj[i].weight;
            pokemonType = pokedexObj[i].type;
            console.log(pokemon + " FOUND POKEMON!");

        }
    }

//pokemon[4].type

    if(pokemonToFind === pokemon) {
        response.send(pokemon.charAt(0).toUpperCase() + pokemon.substring(1) + " has been caught! It weighs " + pokemonWeight + " and is of type " + pokemonType + ".");
    } else {
        response.send("Could not find information about " + pokemonToFind + ". Is that a new Pokemon? Gotta catch em all!");
    }

});

//pokemon[0].next_evolution[1].name





app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));