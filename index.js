const express = require('express');
const json = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

app.get('*', (request, response) => {

  let output = [];

  let searchTerm = request.path.toLowerCase();

  while (searchTerm.charAt(0) === '/') {
    searchTerm = searchTerm.substr(1);
  }

  if (searchTerm === "") {
    response.send("Welcome to the online Pokedex!");
    return;
  }

  json.readFile(pokedex, function(err, obj) {

    const pokemon = obj.pokemon;

    for (let i in pokemon) {
      if (pokemon[i].name.toLowerCase().includes(searchTerm)) {
        output.push(pokemon[i]);
      }
    }

    if (output.length > 0) {
      response.send(output);
    } else {
      response.send (`Search for '${searchTerm}' returned no results.`);
    }

    if (err) {
      output = err;
      console.log(err);
    }
  })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
