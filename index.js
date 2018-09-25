const express = require('express');
const json = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

app.get('*', (request, response) => {

  let searchTerm = request.path.toLowerCase();

  while (searchTerm.charAt(0) === '/') {
    searchTerm = searchTerm.substr(1);
  }

  json.readFile(pokedex, function(err, obj) {

    if (searchTerm === "") {
      response.send("Welcome to the online Pokedex!");
      return;
    }

    const pokemon = obj.pokemon;
    let output = [];

    if (searchTerm.startsWith("type/")) {

      let searchType = searchTerm.substr(5);

      for (let i in pokemon) {
        for (let y in pokemon[i].type) {
          if (pokemon[i].type[y].toLowerCase() === searchType) {
            output.push(pokemon[i].name);
          }
        }
      }
    } else if (searchTerm.startsWith("weakness/")) {

      let searchWeakness = searchTerm.substr(9);

      for (let i in pokemon) {
        for (let y in pokemon[i].weaknesses) {
          if (pokemon[i].weaknesses[y].toLowerCase() === searchWeakness) {
            output.push(pokemon[i].name);
          }
        }
      }
    } else if (searchTerm.startsWith("nextevolution/")) {

      let searchEvo = searchTerm.substr(14);

      for (let i in pokemon) {
        if (pokemon[i].next_evolution) {
          for (let y in pokemon[i].next_evolution) {
            if (pokemon[i].next_evolution[y].name.toLowerCase() === searchEvo) {
              output.push(pokemon[i].name);
            }
          }
        }
      }
    } else {
      for (let i in pokemon) {
        if (pokemon[i].name.toLowerCase().includes(searchTerm)) {

          let name = pokemon[i].name;
          let type = "";
          let weight = pokemon[i].weight;

          if (pokemon[i].type.length === 2) {
            type = `${pokemon[i].type[0]}/${pokemon[i].type[1]}`;
          } else {
            type = pokemon[i].type[0];
          }

          output.push(`${name} is a ${type}-type Pokemon! It weighs ${weight}.`);
        }
      }
    }

    if (output.length === 0) {
      response.send(`Search for '${searchTerm}' returned no results.`);
    } else {
      response.send(output);
    }

    if (err) {
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
