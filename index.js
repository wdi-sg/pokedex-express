const jsonfile = require('jsonfile');
const express = require('express');

const app = express();
const file = 'pokedex.json';

app.get('/:name', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    for (let i = 0; i < obj.pokemon.length; i++) {
      let pokemon = obj.pokemon[i];
      let nameRequested = request.params.name.toLowerCase();
      if (pokemon.name.toLowerCase() === nameRequested) {
        response.send(pokemon.weight);
      }
    }
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
