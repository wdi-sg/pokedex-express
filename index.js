const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const pokeFile = 'pokedex.json';

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  let {pokemon} = request.params;
  jsonfile.readFile(pokeFile, (err, obj) => {
    // filter and return pokemon if name matches
    let requestedPokemon = obj.pokemon.filter(poke => {
      return poke.name.toLowerCase() === pokemon.toLowerCase()
    });
    if (!requestedPokemon[0]) {
      response.render('404', {pokemon: pokemon});
    }
    else {
      let context = requestedPokemon[0];
      response.render('pokemon', context);
    }
  });
});


app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  jsonfile.readFile(pokeFile, (err, obj) => {
    let pokemonArr = obj.pokemon.map(poke => {
      return poke.name;
    });
    console.log(pokemonArr);
    response.render('home', {pokemonArr: pokemonArr});
  });
});


app.get('/types/:type', (request, response) => {
  let {type} = request.params;
  jsonfile.readFile(pokeFile, (err, obj) => {
    let pokemonArr = obj.pokemon.filter(poke => {
      return poke.type.includes(type);
    }).map(poke => {
      return poke.name;
    });
    console.log(pokemonArr);
    response.render('types', {pokemonArr: pokemonArr, type: type});
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
