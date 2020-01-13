const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const dataFile = 'pokedex.json';

/**
 * ===================================
 * Functions
 * ===================================
 */

const displayPokemon = (request, response) => {
  console.log('displaying pokemon ' + request.params.name);
  jsonfile.readFile(dataFile, (err, obj) => {
    if (err) {
      response.status(500).send('Error: ' + err);
      return;
    }
    const pokemonArray = obj.pokemon;

    // using for ... of loops. Much nicer than index search for this sort of thing.
    for (const pokemon of pokemonArray) {
      // console.log(`name: ${pokemon.name}, weight ${pokemon.weight}`);
      if (pokemon.name.toLowerCase() === request.params.name.toLowerCase()) {
        console.log
        response.send(returnPokemonByName(pokemon));
        break;
      }
    }

  })
}

const returnPokemonByName = (pokemon) => {
  const name = pokemon.name;
  const weight = pokemon.weight;
  let responseString = `pokemon name: ${name} weight: ${weight}`
  return responseString;
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:name', displayPokemon)

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(`received something I don't understand: ${request}`);
});

// Making a change

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
