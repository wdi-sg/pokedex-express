const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const pokedex = obj.pokemon;

    app.get('*', (request, response) => {
      const param = request.path.substring(1); // Remove '/' from request
      const payload = [];
      Object.keys(pokedex).forEach((key) => {
        // DELIVERABLE
        if (pokedex[key].name === param) {
          payload.push(pokedex[key].name);
          payload.push(pokedex[key].weight);
          response.send(payload);
        }
      });
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
