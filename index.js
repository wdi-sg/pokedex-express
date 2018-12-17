const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = "pokedex.json";
var pokedex = [];

jsonfile.readFile(file, (err, obj) => {
    pokedex = obj.pokemon;

    app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

    app.get('/:pokemon', (request, response) => {
        let pokemonSearched = request.params.pokemon;
        let pokemonFound = whosThatPokemon(request.params.pokemon);
        if (typeof pokemonFound !== 'undefined'){
            response.send(`You searched for ${pokemonSearched}. <br/>We got ye covered, brother. We found ${pokemonFound.name}. It's ${pokemonFound.weight} and ${pokemonFound.height} tall. ${pokemonFound.name} is number ${pokemonFound.num} on the Pokedex.`);
        } else {
            response.send(`Could not find information about ${pokemonSearched} - Is that a new pokemon? Gotta catch em' all!`)
        }
    });

    app.get('/', (request, response) => {
        response.send("Welcome to the online Pokedex!");
    });

    app.get('/type/:element', (request, response) => {
        let resultString = "";
        let typeArray = whosThatType(request.params.element);
        for (let pokemon of typeArray){
            resultString += pokemon.name + "<br/>"
        }
        response.send(resultString);
    });

    app.get('/weaknesses/:weakness', (request, response) => {
        let resultString = "";
        let weaknessArray = whosThatWeakness(request.params.weakness);
        for (let pokemon of weaknessArray){
            resultString += pokemon.name + "<br/>"
        }
        response.send(resultString);
    });

    app.get('/nextevolution/:pokemon', (request, response) => {
        response.send(whosThatLowerLifeform(request.params.pokemon));
    });
});

function whosThatPokemon(pokemonSearched){
    return pokedex.find(pokemon => {
        return pokemon.name.toLowerCase() === pokemonSearched.toLowerCase();
    });
}

function whosThatType(type){
    let modifiedType = type.charAt(0).toUpperCase() + type.substring(1);
    return pokedex.filter(pokemon => pokemon.type.includes(modifiedType));
}

function whosThatWeakness(weakness){
    let modifiedWeakness = weakness.charAt(0).toUpperCase() + weakness.substring(1);
    return pokedex.filter(pokemon => pokemon.weaknesses.includes(modifiedWeakness));
}

function whosThatLowerLifeform(pokemon){
    let pokemonToCheck = whosThatPokemon(pokemon);
    let resultString = "";
    if (pokemonToCheck){
        if (pokemonToCheck.prev_evolution){
            let pokemonEvolutions = pokemonToCheck.prev_evolution;
            for (let evolution of pokemonEvolutions){
                resultString += evolution.name + "<br/>";
            }
        } else {
            resultString += "No evolutions, bruddah."
        }
    } else {
        resultString += "Couldn't find that pokemon, brudder."
    }
    return resultString;
}