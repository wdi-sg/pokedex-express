const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

// FUNCTIONS

const capitalize = (word) => {
  let capitalized = word.charAt(0).toUpperCase();
  return capitalized += word.substring(1);
};

const checkType = (param, p) => {
  const payload = [];
  Object.keys(p).forEach((key) => {
    const pokemon = p[key];
    Object.keys(pokemon.type).forEach((x) => {
      if (pokemon.type[x] === param) {
        payload.push(pokemon.name);
      }
    });
  });
  return payload;
};

const checkWeakness = (param, p) => {
  const payload = [];
  Object.keys(p).forEach((key) => {
    const pokemon = p[key];
    Object.keys(pokemon.weaknesses).forEach((x) => {
      if (pokemon.weaknesses[x] === param) {
        payload.push(pokemon.name);
      }
    });
  });
  return payload;
};

const checkEvo = (param, p) => {
  const payload = [];
  Object.keys(p).forEach((key) => {
    const pokemon = p[key];
    if (pokemon.name === param) {
      Object.keys(pokemon.prev_evolution).forEach((x) => {
        payload.push(pokemon.prev_evolution[x].name);
      });
    }
  });
  return payload;
};

// MAGIC HAPPENS BELOW
jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const p = obj.pokemon;

    app.get('*', (req, res) => {
      // FURTHER 2.3
      if (req.path.slice(0, 6) === '/type/') {
        return res.send(checkType(capitalize(req.path.substring(6)), p));
      }
      // FURTHER 2.4
      if (req.path.slice(0, 12) === '/weaknesses/') {
        return res.send(checkWeakness(capitalize(req.path.substring(12)), p));
      }
      // FURTHER 2.5
      if (req.path.slice(0, 15) === '/nextevolution/') {
        return res.send(checkEvo(capitalize(req.path.substring(15)), p));
      }

      const param = capitalize(req.path.substring(1)); // Remove '/' from req
      let found = false;

      Object.keys(p).forEach((key) => {
        // DELIVERABLE
        if (p[key].name === param) {
          // FURTHER 2.2
          const types = p[key].type.toString().replace(',', ' & ');
          found = true;
          return res.send(`This is ${p[key].name}, it weighs ${p[key].weight}. It is ${p[key].height} tall. It is of ${types} type.`);
        }
        return console.log('No match');
      });
      // FURTHER 1
      if (found === false && param.length > 0) {
        return res.status(404).send(`Could not find information about ${param}- Is that a new pokemon? Gotta catch em' all!`);
      }
      // FURTHER 2.1
      return res.send('Welcome to the online pokedex.');
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
