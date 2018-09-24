const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const pokedex = obj.pokemon;

    app.get('*', (req, res) => {
      const param = req.path.substring(1); // Remove '/' from req
      const payload = [];
      let found = false;
      Object.keys(pokedex).forEach((key) => {
        // DELIVERABLE
        if (pokedex[key].name === param) {
          payload.push(pokedex[key].name);
          payload.push(pokedex[key].weight);
          res.send(payload);
          found = true;
        }
      });
      // FURTHER 1
      if (found === false) res.status(404).send(`Could not find information about ${param}- Is that a new pokemon? Gotta catch em' all!`);
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
