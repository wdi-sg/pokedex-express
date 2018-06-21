const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const pokedex = 'pokedex.json'

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  response.send('Welcome to the online Pokedex!');
});

app.get('/homepage', (req, res) => {
  jsonfile.readFile(pokedex, (err, obj) => {
    let result = [];
    let h1Tag = '<h1>Welcome to the online Pokdex!</h1>';
    let openingUL = '<ul>';
    let closingUL = '</ul>';

    result.push(h1Tag, openingUL);

    let pokemons = obj.pokemon;

    for (let i = 0; i < pokemons.length; i++) {
      let currentPokemon = pokemons[i];
      let pokemonName = currentPokemon.name;

      result.push('<li>' + pokemonName + '</li>');
    }

    result.push(closingUL);
    res.send(result.join(''));
  })
});

app.get('*', (req, res) => {
  const PATH_NAME = req.path;
  let splitPath = PATH_NAME.split('/');
  let lastParam = splitPath[splitPath.length - 1];

  jsonfile.readFile(pokedex, (err, obj) => {
    let result = [];
    let openingUL = '<ul>';
    let closingUL = '</ul>';

    result.push(openingUL);

    const pokemons = obj.pokemon;

    for (let i = 0; i < pokemons.length; i++) {
      let currentPokemon = pokemons[i];
      let pokemonType = currentPokemon.type;
      let pokemonName = currentPokemon.name.toLowerCase();

      if (lastParam === pokemonName) {
          for (let keys in currentPokemon) {
            if (keys === 'prev_evolution' || keys === 'next_evolution') {
                for (let j = 0; j < currentPokemon[keys].length; j++) {
                  for (let subKeys in currentPokemon[keys][j]) {
                    result.push('<li>' + keys + " - " + subKeys + ": " + currentPokemon[keys][j][subKeys] + '</li>');
                  }
                }
            } else {
                result.push('<li>' + keys + ": " + currentPokemon[keys] + '</li>');
            }
          }

          result.push(closingUL);
          res.send(result.join(''));
          return;
      }

      for (let j = 0; j < pokemonType.length; j++) {
        if (lastParam === pokemonType[j].toLowerCase()) {
            result.push('<li>' + pokemonName + '</li>')
        }
      }
    }

    if (result.length > 2) {
        result.unshift('<h1>Pokemons of Type: ' + lastParam + '</h1>')
        result.push(closingUL);
        res.send(result.join(''));
        return;
    }

    res.send("<p>Could not find information about " + req.path.substring(1) + " - Is that a new pokemon? Gotta catch em' all!</p>")
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
