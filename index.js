const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const obj = require('./pokedex.json');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  // jsonfile.readFile(pokedex, (err, obj) => {
    // console.log(err);
    let pokemon = request.params.pokemon;
    let pokemons = obj.pokemon
    for (let i in pokemons) {
      if (pokemons[i].name === pokemon) {
        pokemon = pokemons[i];
        break;
      }
    }

    let context = {
      pokemon: pokemon
    };

    if (typeof (pokemon) === "string") {
      response.render("nopokemon", context);
    }
    else {
      response.render("home", context);
    }
  // })
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  // jsonfile.readFile(pokedex, (err, obj) => {
    // console.log(err);
    let pokemonArr = obj.pokemon;
    let pokemons = [];
    for (let i in pokemonArr) {
      pokemons.push(pokemonArr[i].name);
    }

    let context = {
      pokemons: pokemons
    };
    response.render('home', context);
  // })
});

app.get('/types/:type', (request, response) => {
  // jsonfile.readFile(pokedex, (err, obj) => {
    // console.log(err);
    let pokemonType = request.params.type;
    let pokemonArr = obj.pokemon;
    let pokemonsByType = {
      type: pokemonType,
      pokemons: []
    };
    for (let i in pokemonArr) {
      let currentPokemon = pokemonArr[i];
      if (currentPokemon.type.includes(pokemonType)) {
        pokemonsByType.pokemons.push(currentPokemon);
      };
    }
    let context = {
      pokemonsByType: pokemonsByType
    };
    response.render('home', context);
  // })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
