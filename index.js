const express = require('express');
const jsonfile = require('jsonfile');

//Configurations and set up

// Init express app
const app = express();

//JSON file name
const file = 'pokedex.json';


//Functions
const capitalize = (str) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getPokemon = (request,response) => {
    let input = request.params.pokemon;
    let info = "";
    let pokemonFound = false;
    jsonfile.readFile(file,(err,obj) => {
        if (err) {
            info = "Cant find Pokemon file";
        }
        else {
            obj.pokemon.forEach(function(pokemon) {
                if (input.toLowerCase() === pokemon.name.toLowerCase()){
                    info = `This is ${capitalize(input)}! He is ${pokemon.weight} in weight.`;
                    response.send(info);
                    pokemonFound = true;
                }
            });
            if (!pokemonFound) {
                info = `Could not find information about ${capitalize(input)} - Is that a new pokemon? Gotta catch em' all!`;
                response.status(404).send(info);
            }
        }
    });
}
const getPokemonByType = (request, response) => {
    let input = request.params.type;
    let info = "";
    let pokemonFound = false;
    jsonfile.readFile(file,(err,obj) => {
        if (err) {
            info = "Cant find Pokemon file";
        }
        else {
            info = `<h2>List of ${capitalize(input)} Pokemon:</h2>`;
            obj.pokemon.forEach(function(pokemon) {
                pokemon.type.forEach(function(type){
                    if (input.toLowerCase() === type.toLowerCase()) {
                        info += pokemon.name+"<br>";
                        pokemonFound = true;
                    }
                });
            });
            if (pokemonFound) {
                response.send(info);
            }
            else {
                info = `Could not find information about ${capitalize(input)} - Is that a new type? Gotta catch em' all!`;
                response.status(404).send(info);
            }
        }
    });
}

const getPokemonByWeakness = (request, response) => {
    let input = request.params.weakness;
    let info = "";
    let pokemonFound = false;
    jsonfile.readFile(file,(err,obj) => {
        if (err) {
            info = "Cant find Pokemon file";
        }
        else {
            info = `<h2>List of Pokemon with ${capitalize(input)} weakness:</h2>`;
            obj.pokemon.forEach(function(pokemon) {
                pokemon.weaknesses.forEach(function(weaknesses){
                    if (input.toLowerCase() === weaknesses.toLowerCase()) {
                        info += pokemon.name+"<br>";
                        pokemonFound = true;
                    }
                });
            });
            if (pokemonFound){
                response.send(info);
            }
            else {
                info = `Could not find information about ${capitalize(input)} - Is that a new weakness? Gotta catch em' all!`;
                response.status(404).send(info);
            }
        }
    });
}

const getPrevEvolution = (request, response) => {
    let input = request.params.pokemon;
    let info = "";
    let pokemonFound = false;
    jsonfile.readFile(file,(err,obj) => {
        if (err) {
            info = "Cant find Pokemon file";
        }
        else {
            info = `<h2>${capitalize(input)} evolved from the following Pokemon:</h2>`;
            obj.pokemon.forEach(function(pokemon) {
                if (input.toLowerCase() === pokemon.name.toLowerCase()){
                    pokemonFound = true;
                    if (pokemon.prev_evolution) {
                        pokemon.prev_evolution.forEach(function(prev_evolution){
                            info += prev_evolution.name+"<br>";
                        });
                    }
                    else {
                        info = `<h2>${capitalize(input)} does not evolve from any Pokemon!</h2>`;
                    }
                }
            });
            if (pokemonFound) {
                response.send(info);
            }
            else {
                info = `Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`;
                response.status(404).send(info);
            }
        }
    });
}

//Routes
app.get('/pokemon/:pokemon', getPokemon);

app.get('/type/:type', getPokemonByType);

app.get('/weakness/:weakness', getPokemonByWeakness);

app.get('/nextevolution/:pokemon', getPrevEvolution);

app.get('*',(request, response) => {
    let info = "Welcome to the online Pokdex!";
    response.send(info)
})



// Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));