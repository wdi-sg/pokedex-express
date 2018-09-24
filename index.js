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
        response.send(pokemon.weight);
        break;
      }
    }

    if (i === obj.pokemon.length) {
      response.send(`Could not find information about ${nameRequested} - Is that a new pokemon? Gotta catch em' all!`);
    }
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
