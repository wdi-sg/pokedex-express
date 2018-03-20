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
app.get('/names/:pokemon', (request, response) => {
  let context = {
    pokemon_name: request.params.pokemon,
    pokemon_weight: "0kg"
  }
  // Read the pokedex json file
	jsonfile.readFile(POKEDEX_FILE, function(err, obj) {
		// deal with the request
    console.log("Name of the pokemon is => " + context.pokemon_name);

    for (var i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].name === context.pokemon_name) {
        context.pokemon_weight = obj.pokemon[i].weight;
        console.log("Weight of the pokemon is => " + context.pokemon_weight);
      }
    }
	});
  // Render html based on the keys specified in home.handlebars
  response.render('home', context);
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  response.render('home');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
