const express = require('express');
const jsonfile = require('jsonfile');
const file = "pokedex.json"

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

app.get("/pokemon/:searchTerm", (request, response) => {
  let searchTerm = request.params.searchTerm;
  if (isNaN(parseInt(searchTerm))) {
    jsonfile.readFile(file, (error, data) => {
      const pokedex = data.pokemon;
      for (let i = 0; i < pokedex.length; i++) {
        if (pokedex[i].name === searchTerm) {
          response.send(`<img src="${pokedex[i].img}"><br><br>
            This is <strong>${pokedex[i].name}</strong>, it is ${pokedex[i].height} tall and ${pokedex[i].weight} in weight!<br><br>
            Type(s): ${pokedex[i].type}<br><br>
            Weaknesses: ${pokedex[i].weaknesses}<br><br>
            Previous evolution: ${pokedex[i].prev_evolution ? `<a href="/pokemon/${pokedex[i].prev_evolution[pokedex[i].prev_evolution.length - 1].name}">${pokedex[i].prev_evolution[pokedex[i].prev_evolution.length - 1].name}</a>` : "NIL"}<br><br>
            Next evolution: ${pokedex[i].next_evolution ? `<a href="/pokemon/${pokedex[i].next_evolution[0].name}">${pokedex[i].next_evolution[0].name}</a>` : "NIL"}`);
          return;
        }
      }
      response.status(404).send(`Could not find information about ${searchTerm} - Is that a new pokemon? Gotta catch em' all!`);
    })
  } else {
    jsonfile.readFile(file, (error, data) => {
      const pokemon = data.pokemon[searchTerm];
      response.send(`<img src="${pokemon.img}"><br><br>
        This is <strong>${pokemon.name}</strong>, it is ${pokemon.height} tall and ${pokemon.weight} in weight!<br><br>
        Type(s): ${pokemon.type}<br><br>
        Weaknesses: ${pokemon.weaknesses}<br><br>
        Previous evolution: ${pokemon.prev_evolution ? `<a href="${pokemon.prev_evolution[pokemon.prev_evolution.length - 1].name}">${pokemon.prev_evolution[0].name}</a>` : "NIL"}<br><br>
        Next evolution: ${pokemon.next_evolution ? `<a href="/pokemon/${pokemon.next_evolution[0].name}">${pokemon.next_evolution[0].name}</a>` : "NIL"}`);
    })
  }
});

app.get("/type/:type", (request, response) => {
  jsonfile.readFile(file, (error, data) => {
    let searchTerm = request.params.type;
    const pokedex = data.pokemon;
    let outputString = `<h2><u>Pokemon of Type: ${searchTerm}</u></h2>`;
    for (let i = 0; i < pokedex.length; i++) {
      if (pokedex[i].type.includes(searchTerm)) {
        outputString += `<a href="/pokemon/${pokedex[i].name}">${pokedex[i].name}</a>` + "<br><br>";
      }
    }
    response.send(outputString);
  })
});

app.get("/weaknesses/:weakness", (request, response) => {
  jsonfile.readFile(file, (error, data) => {
    let searchTerm = request.params.weakness;
    const pokedex = data.pokemon;
    let outputString = `<h2><u>Pokemon with Weakness: ${searchTerm}</u></h2>`;
    for (let i = 0; i < pokedex.length; i++) {
      if (pokedex[i].weaknesses.includes(searchTerm)) {
        outputString += `<a href="/pokemon/${pokedex[i].name}">${pokedex[i].name}</a>` + "<br><br>";
      }
    }
    response.send(outputString);
  })
});

app.get("/nextevolution/:name", (request, response) => {
  jsonfile.readFile(file, (error, data) => {
    let searchTerm = request.params.name;
    const pokedex = data.pokemon;
    for (let i = 0; i < pokedex.length; i++) {
      if (pokedex[i].name === searchTerm) {
        if (pokedex[i].next_evolution) {
          let outputString = `<h2><u>Pokemon that evolve from ${searchTerm}</u></h2>`;
          for (let j = 0; j < pokedex[i].next_evolution.length; j++) {
            outputString += `<a href="/pokemon/${pokedex[i].next_evolution[j].name}">${pokedex[i].next_evolution[j].name}</a>` + "<br><br>";
          }
          response.send(outputString);
        }
      }
    }
  })
})

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to the online Pokedex!")
});

/**
* ===================================
* Listen to requests on port 3000
* ===================================
*/
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));