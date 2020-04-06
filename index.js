const express = require('express');
const jsonfile = require('jsonfile');
const allPokemon = 'pokedex.json';

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

app.get('/pokemon', (request, response) =>{
  response.send("Welcome to the online Pokedex!");
});

app.get('/pokemon/type/:sometype', (request, response) => {
  jsonfile.readFile(allPokemon, (err, obj) => {
    let allPokemonType = [];
    for(let i = 0; i < obj.pokemon.length; i++){
      for(let j = 0; j < obj.pokemon[i].type.length; j++){
        if(obj.pokemon[i].type[j].toLowerCase() === request.params.sometype){
          allPokemonType.push(obj.pokemon[i].name);
        }
      }
    }
    response.send(`All pokemon with ${request.params.sometype} type: ${allPokemonType}`);
  });
});

app.get('/pokemon/weaknesses/:someweaknesses', (request, response) => {
  jsonfile.readFile(allPokemon, (err, obj) => {
    let allPokemonWithWeakness = [];
    for(let i = 0; i < obj.pokemon.length; i++){
      for(let j = 0; j < obj.pokemon[i].weaknesses.length; j++){
        if(obj.pokemon[i].weaknesses[j].toLowerCase() === request.params.someweaknesses){
          allPokemonWithWeakness.push(obj.pokemon[i].name);
        }
      }
    }
    response.send(`All pokemon with ${request.params.someweaknesses} weakness: ${allPokemonWithWeakness}`);
  });
});

app.get('/pokemon/nextevolution/:somename', (request, response) => {
  jsonfile.readFile(allPokemon, (err, obj) => {
    let allPreviousEvolution = [];
    for(let i = 0; i < obj.pokemon.length; i++){
      if(obj.pokemon[i].name.toLowerCase() === request.params.somename){
        if(obj.pokemon[i].prev_evolution !== undefined){
          for(let j = 0; j < obj.pokemon[i].prev_evolution.length; j++){
            allPreviousEvolution.push(obj.pokemon[i].prev_evolution[j].name);
          }
          response.send(allPreviousEvolution);
        }else if(obj.pokemon[i].prev_evolution === undefined){
          response.status(404).send("Could not find information about " + request.params.somename + "'s pre-evolution");
        }
      }
    }
  });
});

app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(allPokemon, (err, obj) => {
    let i = 0;
    let pokemonWeight;
    let pokemonType = [];
    while(i < obj.pokemon.length){
      if(obj.pokemon[i].name.toLowerCase() === request.params.name){
        pokemonWeight = obj.pokemon[i].weight;
        pokemonType = obj.pokemon[i].type;
      }
      i++
    }
    if(pokemonWeight === undefined){
      response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
    }else {
      response.send(`This is ${request.params.name}!, he weighs ${pokemonWeight} in weight! He has a type of ${pokemonType}`);
    }
  });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));