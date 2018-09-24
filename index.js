const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

// FUNCTIONS

// MAGIC HAPPENS BELOW
jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const p = obj.pokemon;

    app.get('*', (req, res) => {
      const param = req.path.substring(1); // Remove '/' from req
      let found = false;
      Object.keys(p).forEach((key) => {
        // DELIVERABLE
        if (p[key].name === param) {
          // const payload = [];
          // payload.push(pokedex[key].name);
          // payload.push(pokedex[key].weight);
          // FURTHER 2.2
          const types = p[key].type.toString().replace(',', ' & ');
          res.send(`This is ${p[key].name}, it weighs ${p[key].weight}. It is ${p[key].height} tall. It is of ${types} type.`);
          found = true;
        }
      });
      // FURTHER 1
      if (found === false && param.length > 0) {
        res.status(404).send(`Could not find information about ${param}- Is that a new pokemon? Gotta catch em' all!`);
      } else {
        // FURTHER 2.1
        res.send('Welcome to the online pokedex.');
      }
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
