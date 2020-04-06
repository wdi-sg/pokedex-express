const express = require('express');
const file = 'pokedex.json';
const jsonfile = require('jsonfile');

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

app.get('/', (request, response) => {
  response.send('Hello! Go to /pokemon for more.');
});

app.get('/pokemon', (request, response) => {
  response.send("Welcome to the online Pokdex!");
});

app.get('/pokemon/:id', (request, response, obj) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err,obj) => {
    const checkPokemon = request.params.id.toLowerCase();
    const listOfPokemon = obj.pokemon.length;
    if (!isNaN(checkPokemon)) {
      response.send("This is " + obj.pokemon[checkPokemon].name + "! He is " + obj.pokemon[checkPokemon].weight + " in weight and is also " + obj.pokemon[checkPokemon].height +  " in height." );
    } else if (isNaN(checkPokemon)) {
        let pokemonName = checkPokemon.toLowerCase();
        for (i = 0; i < listOfPokemon; i++) {
        let checkPokemonName = obj.pokemon[i].name.toLowerCase();
          if (checkPokemon === checkPokemonName) {
            console.log(obj.pokemon[i].name);
            console.log(obj.pokemon[i].id);
            response.send("Name: " + obj.pokemon[i].name + "<br> Weight: " + obj.pokemon[i].weight);
          }
        }
         response.status(404).send("Could not find information about " + checkPokemon + " Is that a new pokemon? Gotta catch em' all!");
      }
  });
});

app.get('/pokemon/type/:type', (request, response) => {
  jsonfile.readFile(file, (err,obj) => {
    const checkTypes = request.params.type.toLowerCase();
    const listOfPokemon = obj.pokemon.length;
    if (isNaN(checkTypes)) {
      const searchedType = [];
      for (i = 0; i < listOfPokemon; i++) {
        let checkPokemonType = obj.pokemon[i].type;
        let listOfTypes = checkPokemonType.length;
        for (j = 0; j < listOfTypes; j++) {
          const checkNumberTypes = checkPokemonType[j].toLowerCase();
          if (checkTypes === checkNumberTypes) {
            searchedType.push(obj.pokemon[i].name);
            console.log(obj.pokemon[i].name + " " + obj.pokemon[i].type[j] + " " + obj.pokemon[i].id)
            //
          }
        }
      }
      response.send("List of <strong>" + checkTypes.toUpperCase() + "</strong> type Pokemons: " + searchedType);
    }
  });
});

app.get('/pokemon/weakness/:weakness', (request, response) => {
  jsonfile.readFile(file, (err,obj) => {
    const checkWeakness = request.params.weakness.toLowerCase();
    const listOfPokemon = obj.pokemon.length;
    if (isNaN(checkWeakness)) {
      const searchedWeakness = [];
      for (i = 0; i < listOfPokemon; i++) {
        let checkPokemonWeaknesses = obj.pokemon[i].weaknesses;
        let listOfWeaknesses = checkPokemonWeaknesses.length;
        for (j = 0; j < listOfWeaknesses; j++) {
          //console.log(checkPokemonType); // this prints
          const checkNumberWeaknesses = checkPokemonWeaknesses[j].toLowerCase();
          if (checkNumberWeaknesses === checkWeakness) {
            var displayName = obj.pokemon[i].name.toString();
            searchedWeakness.push(displayName);
            console.log(obj.pokemon[i].name + " " + obj.pokemon[i].weaknesses[j] + " " + obj.pokemon[i].id)
            //
          }
        }
      }
      response.send("List of Pokemon with <strong>" + checkWeakness.toUpperCase() + "</strong> weakness: " + searchedWeakness);
    }
  });
});


app.get('/pokemon/nextevolution/:id', (request, response, obj) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err,obj) => {
    const checkPokemon = request.params.id.toLowerCase();
    const listOfPokemon = obj.pokemon.length;
    if (isNaN(checkPokemon)) {
      const checkedPokemon = [];
      for (i = 0; i < listOfPokemon; i++) {
        console.log(obj.pokemon[i].next_evolution[i]);
      }
      //response.send("List of Pokemon with <strong>" + checkWeakness.toUpperCase() + "</strong> weakness: " + searchedWeakness);
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));