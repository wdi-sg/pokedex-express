/**
 * ===================================
 * Import libraries
 * ===================================
 */
 // Express Library
const express = require('express');

// Express Handlebar Library
const handlebars = require('express-handlebars');

// Jsonfile Library
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();

// Pokedex Json File
const POKEDEX_FILE = 'pokedex.json';

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/names/:name', (request, response) => {
  let context = {
    pokemon_name: "",
    pokemon: "",
    invalid_pokemon: "NIL"
  }
  // Read the pokedex json file
	jsonfile.readFile(POKEDEX_FILE, function(err, obj) {
		// Check whether bulbasaur exist in the request parameter
    for (var i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].name === request.params.name) {
        console.log(Object.entries(obj.pokemon[i]));
        context.pokemon_name = request.params.name;
        context.pokemon = Object.entries(obj.pokemon[i]);
        break;
      }
      // Invalid pokemon requested, populate cannot find text
      else{
        console.log("Invalid pokemon found");
        context.invalid_pokemon = request.params.name;
        break;
      }
    }
    // Render html based on the keys specified in home.handlebars
    response.render('home', context);
	});
});

app.get('/types/:type', (request, response) => {
  let context = {
    type: request.params.type.toLowerCase(),
    pokemon: []
  }
  jsonfile.readFile(POKEDEX_FILE, function(err, obj) {
    for (var i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].type.includes(request.params.type)) {
        context.pokemon.push(obj.pokemon[i].name);
      }
    }
    // Render html based on the keys specified in home.handlebars
    response.render('type', context);
  });
});

app.get('/', (request, response) => {
  let context = {
    pokemon: []
  }
  jsonfile.readFile(POKEDEX_FILE, function(err, obj) {
    for (var i = 0; i < obj.pokemon.length; i++) {
      context.pokemon.push(obj.pokemon[i].name);
    }
    // Render html based on the keys specified in home.handlebars
    response.render('homepage', context);
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
