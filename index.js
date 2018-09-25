const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

// FUNCTIONS

const capitalize = (word) => {
  let capitalized = word.charAt(0).toUpperCase();
  capitalized += word.substring(1);
  return capitalized;
};

const checkName = (param, p) => {
  let status = false;
  let payload = '';

  Object.keys(p).forEach((key) => {
    if (p[key].name === param) {
      const types = p[key].type.toString().replace(',', ' & ');
      payload = `This is ${p[key].name}, it weighs ${p[key].weight}. It is ${p[key].height} tall. It is of ${types} type.`;
      status = true;
    }
  });
  return [status, payload];
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

    app.get('/', (req, res) => {
      res.send('Welcome to the online pokedex.');
    });

    app.get('/:name', (req, res) => {
      const result = checkName(capitalize(req.params.name), p);
      if (result[0] === true) res.send(result[1]);
      res.status(404).send(`Could not find information about ${req.params.name}- Is that a new pokemon? Gotta catch em' all!`);
    });

    app.get('/type/:type', (req, res) => {
      res.send(checkType(capitalize(req.params.type), p));
    });

    app.get('/weaknesses/:weakness', (req, res) => {
      res.send(checkWeakness(capitalize(req.params.weakness), p));
    });

    app.get('/nextevolution/:name', (req, res) => {
      res.send(checkEvo(capitalize(req.params.name), p));
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
