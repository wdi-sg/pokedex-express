const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = "pokedex.json";
var pokedex = [];

jsonfile.readFile(file, (err, obj) => {
    pokedex = obj.pokemon;

    app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

    app.get('/:pokemon', (request, response) => {
        response.send(getPokemonDescriptions(request.params.pokemon));
    });

    app.get('/', (request, response) => {
        response.send("Welcome to the online Pokedex!");
    });

    app.get('/type/:element', (request, response) => {
        response.send(getPokemonNamesByTypeOrWeakness(request.params.element, "type"));
    });

    app.get('/weaknesses/:weakness', (request, response) => {
        response.send(getPokemonNamesByTypeOrWeakness(request.params.weakness, "weaknesses"));
    });

    app.get('/nextevolution/:pokemon', (request, response) => {
        response.send(whosThatLowerLifeform(request.params.pokemon));
    });
});

function getPokemonByName(pokemonName){
    return pokedex.find(pokemon => {
        return pokemon.name.toLowerCase() === pokemonName.toLowerCase();
    });
}

function getPokemonDescriptions(pokemon){
    let pokemonFound = getPokemonByName(pokemon);
    if (pokemonFound){
        return `You searched for ${pokemonFound.name}.<br/>We got ye covered, brother. We found ${pokemonFound.name}. It's ${pokemonFound.weight} and ${pokemonFound.height} tall. ${pokemonFound.name} is number ${pokemonFound.num} on the Pokedex.`;
    }
    return `Could not find information about ${pokemon} - Is that a new pokemon? Gotta catch em' all!`;
}

function getPokemonNamesByTypeOrWeakness(input, searchType){
    let capitalizedSearchString = input.charAt(0).toUpperCase() + input.substring(1);
    let pokemonMatches = getPokemonByTypeOrWeakness(capitalizedSearchString, searchType);

    //Map all the names of the Pokemon objects, then join them up with ".join" in a string. The Pokemon names within the String are split with break tags.
    return pokemonMatches.map(pokemon => {
        return pokemon.name;
    }).join("<br/>");
}

function getPokemonByTypeOrWeakness(input, searchType){
    //Search through Pokedex and return all Pokemon objects that matches the searchType in the form of an array.
    return pokedex.filter(pokemon => pokemon[searchType].includes(input));
}

function whosThatLowerLifeform(pokemon){
    let pokemonToCheck = getPokemonByName(pokemon);
    let resultString = "";
    if (pokemonToCheck){
        if (pokemonToCheck.prev_evolution){
            return pokemonToCheck.prev_evolution.map(evolution => {
                return evolution.name;
            }).join("<br/>");
        } else {
            return `No previous evolutions for ${pokemonToCheck.name}, bruddah.`
        }
    } else {
        return `Couldn't find that pokemon, brudder.`
    }
}