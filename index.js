const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const FILE = "pokedex.json";

// read json file into memory
const pokedex = jsonfile.readFileSync(FILE).pokemon;

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

 // const handleRequest = (request, response) => {
 //
 // }

app.get('/names/:pokemon', (request, response) => {
    let canFind = false;
    let content;

    pokedex.forEach((pokemon) => {
      // console.log(pokemon.name);
      if (pokemon.name === request.params.pokemon) {
        content = {
          message: pokemon.name,
          weight: pokemon.weight
        }
        canFind = true;
        response.render('home', content);
      }
    })

    if (canFind === false) {
      console.log("cannot fnd");
      content = {
        message: `Could not find information about ${request.params.pokemon} - Is that a new pokemon? Gotta catch em' all!`
      }
      response.render('notFound', content);
    }
  });


app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  let content = {
    message: "Welcome to the online Pokedex!",
    pokedex
  };
  response.render('home', content);
});

app.get('/types/:type', (request, response) => {
  // send response with some data (a HTML file)
  let pokemonTypes = [];
  pokedex.forEach((pokemon) => {
    (pokemon.type).forEach((pokeType) => {
      if (pokeType.toLowerCase() === request.params.type.toLowerCase()) {
        // console.log(pokeType);
        pokemonTypes.push(pokemon);
      }
    });
  });
  let content = {
    pokedex: pokemonTypes
  };
  console.log(pokemonTypes);
  response.render('home', content);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
