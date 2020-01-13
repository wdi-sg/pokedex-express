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
    const requestName = request.params.name
    
    // If input is a number, display the pokemon by its number;
    if (parseInt(requestName)) {
      if (requestName >= 0 && requestName < pokemonArray.length ) {
        response.send(returnPokemon(pokemonArray[requestName-1]))
        return;
      }
    }

    // using for ... of loops. Much nicer than index search for this sort of thing.
    for (const pokemon of pokemonArray) {
      // console.log(`name: ${pokemon.name}, weight ${pokemon.weight}`);
      if (pokemon.name.toLowerCase() === requestName.toLowerCase()) {
        console.log
        response.send(returnPokemon(pokemon));
        return;
      }
    }
    response.status(404).send(`Could not find information about ${requestName} - Is that a new pokemon? Gotta catch em' all!`)
  })
}

const returnPokemon = (pokemon) => {
  const name = pokemon.name;
  const weight = pokemon.weight;
  const height = pokemon.height;
  let types = "";
  for (let i = 0; i < pokemon.type.length; i++) {
    console.log(pokemon.type[i]);
    if (i === pokemon.type.length - 1) {
      types += pokemon.type[i];
    } else {
      types += pokemon.type[i] + ", ";  
    }
  }
  let responseString = `This is ${name}, they weigh ${weight} and stand ${height} tall. They are ${types} type.`
  return responseString;
}

const displayIndexPage = () => {
  let responseString = `Welcome to the online Pokedex!`;
  return responseString;
}

/**
 * ===================================
 * Routes
 * ===================================
 */


// Display pokemon by name
app.get('/pokemon/:name', displayPokemon)

// Display index page
app.get('/pokemon/', (request, response) => {
  console.log('sending index page');
  response.send(displayIndexPage());
})

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
