const jsonfile = require('jsonfile');
const express = require('express');

const app = express();
const file = 'pokedex.json';

app.get('/', (request, response) => {
  response.send('Welcome to the online Pokdex!');
});

app.get('/:name', (request, response) => {
  let nameRequested = request.params.name.toLowerCase();

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    let i;

    for (i = 0; i < obj.pokemon.length; i++) {
      let pokemon = obj.pokemon[i];

      if (pokemon.name.toLowerCase() === nameRequested) {
        let message = `This is ${pokemon.name}. His type is ${pokemon.type}. He is ${pokemon.height} in height, and ${pokemon.weight} in weight. His candy is ${pokemon.candy}. His candy count is ${pokemon.candy_count}. His egg is ${pokemon.egg}. His spawn chance is ${pokemon.spawn_chance}. His average spawns is ${pokemon.avg_spawns}. His spawn time is ${pokemon.spawn_time}. His multiplier is ${pokemon.multipliers}. His weakness is ${pokemon.weaknesses}. His next evolution is ${pokemon.next_evolution[0].name}.`;
        response.send(message);
        break;
      }
    }

    if (i === obj.pokemon.length) {
      response.send(`Could not find information about ${nameRequested} - Is that a new pokemon? Gotta catch em' all!`);
    }
  });
});

app.get('/type/:type', (request, response) => {
  let typeRequested = request.params.type.charAt(0).toUpperCase() +
    request.params.type.slice(1).toLowerCase();

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    let names = [];

    for (let i = 0; i < obj.pokemon.length; i++) {
      let pokemon = obj.pokemon[i];

      if (pokemon.type.includes(typeRequested)) {
        names.push(pokemon.name);
      }
    }

    response.send(`All pokemon that are ${typeRequested} type: ${names}.`);
  });
});

app.get('/weaknesses/:weakness', (request, response) => {
  let weakness = request.params.weakness.charAt(0).toUpperCase() +
    request.params.weakness.slice(1).toLowerCase();

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    let names = [];

    for (let i = 0; i < obj.pokemon.length; i++) {
      let pokemon = obj.pokemon[i];

      if (pokemon.weaknesses.includes(weakness)) {
        names.push(pokemon.name);
      }
    }

    response.send(`All pokemon that are have weakness ${weakness}: ${names}.`);
  });
});

app.get('/nextevolution/:name', (request, response) => {
  let name = request.params.name.toLowerCase();

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    for (let i = 0; i < obj.pokemon.length; i++) {
      let pokemon = obj.pokemon[i];

      if (name === pokemon.name.toLowerCase() && pokemon.prev_evolution) {
        let names = [];
        pokemon.prev_evolution.forEach(pokemonObj => {
          names.push(pokemonObj.name);
        });

        response.send(`All pokemon that evolves from ${name}: ${names}.`);
      }
    }
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
