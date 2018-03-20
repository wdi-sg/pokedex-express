const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const pokedex = "./pokedex.json";

// const jsonfile = require('jsonfile');

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
  jsonfile.readFile(pokedex, (err, obj) => {
      console.log(err);
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

      response.render("home", context);
  })
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  let context = {};
  response.render('home');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
