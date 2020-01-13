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
  response.send(`<div style="text-align: center; font-size: 50px;">Welcome to the online Pokedex!<div>`)
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
      response.send(`<div style="height: 90%; font-size: 25px; display: flex; flex-direction: column; justify-content: center; align-items: center;"><img src="${pokemon.img}" style="display: block; width: 150px;"><div>This is <strong style="font-size: 60px;">${pokemon.name}</strong>. It weighs <strong>${pokemon.weight}</strong> and has a height of <strong>${pokemon.height}</strong></div><br><div><span style="color: green;">Type:</span> ${pokemon.type.join(", ")}</div><br><div><span style="color: red;">Weakness:</span> ${pokemon.weaknesses.join(", ")}</div></div>`)
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`<div style="text-align: center;">Could not find information about <strong style="font-size: 30px;">${input}</strong> - Is that a new pokemon? Gotta catch em' all!</div>`)
    }
    //end of readFile
  })
  //end of app.get
});

app.get('/type', (request, response) => {
  response.send(`<div style="text-align: center; font-size: 20px;">Please choose a Type!</div>`)
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
          pokemon.push(`<img src="${obj.pokemon[i].img}"><strong>${obj.pokemon[i].name}</strong>`)
        }
    }

    //if pokemon has content, send it
    if (pokemon.length > 0) {
      response.send(pokemon.join(` `))
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`<div style="text-align: center;">Hold your horses there Prof. Oak! <strong style="font-size: 30px;">${input}</strong> - Is that a new type? You better check again!</div>`)
    }
    //end of readFile
  })
});

app.get('/weaknesses', (request, response) => {
  response.send(`<div style="text-align: center; font-size: 20px;">Please choose a Weakness!</div>`)
});

app.get('/weaknesses/:weaknesses', (request, response) => {

  const input = request.params.weaknesses
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
          pokemon.push(`<img src="${obj.pokemon[i].img}"><strong>${obj.pokemon[i].name}</strong>`)
        }
    }

    //if pokemon has content, send it
    if (pokemon.length > 0) {
      response.send(pokemon.join(` `))
    } else {
      // if pokemon has no content, error message
      response.status(404).send(`<div style="text-align: center;">Hold your horses there Prof. Oak! <strong style="font-size: 30px;">${input}</strong> - Is that a new type? You better check again!</div>`)
    }
    //end of readFile
  })
});

app.get('/nextevolution', (request, response) => {
  response.send(`<div style="text-align: center; font-size: 20px;">Please choose a Pokemon!</div>`)
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

    //filter array for input
    let newArr = obj.pokemon.filter(function(item){
      if (item.name.toLowerCase() === input.toLowerCase()){
        return item
      }
    })
    //if no items in filter-array, send 404
    if (newArr.length === 0){
      return response.status(404).send(`<div style="text-align: center;"><strong style="font-size: 30px;">${input}</strong> is not a Pokemon!</div>`)
    }

    //loop through pokemon 
    for (let i = 0; i < obj.pokemon.length; i++) {
      //if prev_evolution exists run the loop
      if (obj.pokemon[i].prev_evolution) {
        for (let j = 0; j < obj.pokemon[i].prev_evolution.length; j++)
          //check if input matches a pokemon
          if (input.toLowerCase() === obj.pokemon[i].name.toLowerCase()) {
            evolution.push(`<div style="text-align: center; margin-bottom: 10px;">${obj.pokemon[i].prev_evolution[j].name}</div>`)
          }
      }
    }

        //if pokemon has content, send it
        if (evolution.length > 0) {
          response.send(evolution.join(` `))
        } else {
          // if pokemon has no content, error message
          response.status(404).send(`<div style="text-align: center;"><strong style="font-size: 30px;">${input}</strong> does not have a previous evolution!</div>`)
    }
    //end of readFile
  })
  //end of app.get
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));