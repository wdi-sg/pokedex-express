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

const checkName = (param, pokedex) => {
  let status = false;
  let payload;

  Object.keys(pokedex).forEach((key) => {
    if (pokedex[key].name === param) {
      payload = pokedex[key];
      status = true;
    }
  });
  return [status, payload];
};

const checkType = (param, pokedex) => {
  const payload = [];
  Object.keys(pokedex).forEach((key) => {
    const pokemon = pokedex[key];
    Object.keys(pokemon.type).forEach((x) => {
      if (pokemon.type[x] === param) {
        payload.push(pokemon.name);
      }
    });
  });
  return payload;
};

const checkWeakness = (param, pokedex) => {
  const payload = [];
  Object.keys(pokedex).forEach((key) => {
    const pokemon = pokedex[key];
    Object.keys(pokemon.weaknesses).forEach((x) => {
      if (pokemon.weaknesses[x] === param) {
        payload.push(pokemon.name);
      }
    });
  });
  return payload;
};

const checkEvo = (param, pokedex) => {
  const payload = [];
  Object.keys(pokedex).forEach((key) => {
    const pokemon = pokedex[key];
    if (pokemon.name === param) {
      Object.keys(pokemon.prev_evolution).forEach((x) => {
        payload.push(pokemon.prev_evolution[x].name);
      });
    }
  });
  return payload;
};

const searchPokemon = (param, amt, cmp, pokedex) => {
  if (amt !== undefined && cmp === 'more') {
    const payload = [];
    Object.keys(pokedex).forEach((key) => {
      if (pokedex[key][param] > amt) payload.push(pokedex[key].name);
    });
    return payload;
  }
  if (amt !== undefined && cmp === 'less') {
    const payload = [];
    Object.keys(pokedex).forEach((key) => {
      if (pokedex[key][param] < amt) payload.push(pokedex[key].name);
    });
    return payload;
  }
  return 'This should not happen.';
};

const generateHtml = (title, pokedex) => {
  let body = '<html><body style="font-family:monospace;">';
  body += `<h1>${title}</h1>`;
  if (typeof pokedex === 'object') {
    body += '<ul style="list-style-type:none; padding:0; margin:0;">';

    Object.keys(pokedex).forEach((key) => {
      // CHANGE INDEX TO START FROM 1
      let index = key;
      if (index.match(/^[0-9]+$/) !== null) {
        index = parseInt(index, 10) + 1;
      }
      // CHECK FOR IMG ELEMENT
      if (index === 'img') {
        body += `<img src="${pokedex[key]}">`;
      } else if (key === 'next_evolution' || key === 'prev_evolution') { // CHECK FOR NEXT/PREV EVO OBJECT
        pokedex[key].forEach((item) => {
          body += `<li><strong>${capitalize(index.toString().replace('_', ' '))}</strong>: ${item.name}</li>`;
        });
      } else body += `<li><strong>${capitalize(index.toString().replace('_', ' '))}</strong>: ${pokedex[key]}</li>`;
    });
    body += '</ul>';
  } else body += pokedex;
  body += '</body></html';
  return body;
};

const generatePokemonList = (title, content) => {
  let body = '<html><body style="font-family:monospace;">';
  body += `<h1>${title}</h1><ol>`;
  Object.keys(content).forEach((key) => {
    body += `<li><a href="/${content[key]}">${content[key]}</li>`;
  });
  body += '</ol></body></html>';
  return body;
};

// MAGIC HAPPENS BELOW
jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const pokedex = obj.pokemon;

    app.get('/', (req, res) => {
      const list = [];
      Object.keys(pokedex).forEach((key) => {
        list.push(pokedex[key].name);
      });
      res.send(generatePokemonList('Pokedex', list));
    });

    app.get('/:name', (req, res) => {
      const param = capitalize(req.params.name);
      const result = checkName(param, pokedex);
      if (result[0] === true) res.send(generateHtml(param, result[1]));
      else if (!res.headersSent) {
        res.status(404).send(generateHtml('404', `Could not find information about ${req.params.name}- Is that a new pokemon? Gotta catch em' all!`));
      }
    });

    app.get('/search/:parameter', (req, res) => {
      const param = req.params.parameter;
      const amt = req.query.amount;
      const cmp = req.query.compare;
      res.send(generatePokemonList(`${capitalize(param).replace('_', ' ')} ${cmp} than ${amt}`, searchPokemon(param, amt, cmp, pokedex)));
    });

    app.get('/type/:type', (req, res) => {
      const param = capitalize(req.params.type);
      const result = checkType(param, pokedex);
      const title = `Pokemon of type: ${param}`;
      res.send(generateHtml(title, result));
    });

    app.get('/weaknesses/:weakness', (req, res) => {
      const param = capitalize(req.params.weakness);
      const result = checkWeakness(param, pokedex);
      const title = `Pokemon weak against: ${param}`;
      res.send(generateHtml(title, result));
    });

    app.get('/nextevolution/:name', (req, res) => {
      const param = capitalize(req.params.name);
      const result = checkEvo(param, pokedex);
      const title = `Pokemon evolving to ${param}`;
      res.send(generateHtml(title, result));
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
