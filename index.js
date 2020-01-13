const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json'

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

app.get('/pokemon/:name', (request, response) => {

  const input = request.params.name
  let pokemon

  //readFile is async, so all code inside of here
  jsonfile.readFile(file, (err, obj) => {
    //check for error first
    if (err) {
      return console.log(err)
    }
    //loop through pokemon
    for (let i = 0; i < obj.pokemon.length; i++) {
      //check if input matches a pokemon
      if (input.toLowerCase() === obj.pokemon[i].name.toLowerCase()) {
        pokemon = obj.pokemon[i]
        break
      }
    }
    //if pokemon has content, send it
    if (pokemon) {
      response.send(pokemon)
    } else {
      // if pokemon has no content, error message
      response.status(404)
      response.send(`Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`)
    }

  })

});

app.get('/pokemon/', (request, response) => {
  response.send("Welcome to the online Pokdex!")
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));