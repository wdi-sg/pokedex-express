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

app.get('/pokemon/', (request, response) => {
  response.send("Welcome to the online Pokdex!")
});

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
      response.send(`This is ${pokemon.name}. It weighs ${pokemon.weight} and has a height of ${pokemon.height} - <div>Types: ${pokemon.type} - Weakness: ${pokemon.weaknesses[0]}</div>`)
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`)
    }
    //end of readFile
  })
  //end of app.get
});

app.get('/type', (request, response) => {
  response.send("Please choose a type!")
});

app.get('/type/:type', (request, response) => {

  const input = request.params.type
  let pokemon = []

  //readFile is async, so all code inside of here
  jsonfile.readFile(file, (err, obj) => {
    //check for error first
    if (err) {
      return console.log(err)
    }
    //loop through pokemon
    for (let i = 0; i < obj.pokemon.length; i++) {
      for (let j = 0; j < obj.pokemon[i].type.length; j++)
        //check if input matches a pokemon
        if (input.toLowerCase() === obj.pokemon[i].type[j].toLowerCase()) {
          pokemon.push(obj.pokemon[i].name)
        }
    }

    //if pokemon has content, send it
    if (pokemon) {
      response.send(pokemon.join(`, `))
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`)
    }
    //end of readFile
  })
});

app.get('/weaknesses', (request, response) => {
  response.send("Please choose a weakness!")
});

app.get('/weaknesses/:weakness', (request, response) => {

  const input = request.params.weakness
  let pokemon = []

  //readFile is async, so all code inside of here
  jsonfile.readFile(file, (err, obj) => {
    //check for error first
    if (err) {
      return console.log(err)
    }
    //loop through pokemon
    for (let i = 0; i < obj.pokemon.length; i++) {
      for (let j = 0; j < obj.pokemon[i].weaknesses.length; j++)
        //check if input matches a pokemon
        if (input.toLowerCase() === obj.pokemon[i].weaknesses[j].toLowerCase()) {
          pokemon.push(obj.pokemon[i].name)
        }
    }

    //if pokemon has content, send it
    if (pokemon) {
      response.send(pokemon.join(`, `))
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`)
    }
    //end of readFile
  })
});

app.get('/nextevolution', (request, response) => {
  response.send("Please choose a Pokemon!")
});

app.get('/nextevolution/:name', (request, response) => {

  const input = request.params.name
  let evolution = []

  //readFile is async, so all code inside of here
  jsonfile.readFile(file, (err, obj) => {
    //check for error first
    if (err) {
      return console.log(err)
    }
    //loop through pokemon 
    for (let i = 0; i < obj.pokemon.length; i++) {
      //if prev_evolution exists run the loop
      if (obj.pokemon[i].prev_evolution) {
        for (let j = 0; j < obj.pokemon[i].prev_evolution.length; j++)
          //check if input matches a pokemon
          if (input.toLowerCase() === obj.pokemon[i].name.toLowerCase()) {
            evolution.push(obj.pokemon[i].prev_evolution[j].name)
          } 
      }
    }

        //if pokemon has content, send it
        if (evolution.length > 0) {
          response.send(evolution.join(`, `))
        } else {
          // if pokemon has no content, error message
          response.status(404).send(`${input} does not have a previous evolution or is not a Pokemon!`)
    }

    //end of readFile
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));