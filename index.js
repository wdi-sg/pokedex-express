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
  let payload;

  Object.keys(p).forEach((key) => {
    if (p[key].name === param) {
      payload = p[key];
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

const generateHtml = (title, content) => {
  let body = '<html><body style="font-family:monospace;">';
  body += `<h1>${title}</h1>`;
  if (typeof content === 'object') {
    body += '<ul style="list-style-type:none; padding:0; margin:0;">';

    Object.keys(content).forEach((key) => {
      // CHANGE INDEX TO START FROM 1
      let index = key;
      if (index.match(/^[0-9]+$/) !== null) {
        index = parseInt(index, 10) + 1;
      }
      // CHECK FOR IMG ELEMENT
      if (index === 'img') {
        body += `<img src="${content[key]}">`;
      } else if (key === 'next_evolution' || key === 'prev_evolution') { // CHECK FOR NEXT/PREV EVO OBJECT
        content[key].forEach((item) => {
          body += `<li><strong>${capitalize(index.toString())}</strong>: ${item.name}</li>`;
        });
      } else body += `<li><strong>${capitalize(index.toString())}</strong>: ${content[key]}</li>`;
    });
    body += '</ul>';
  } else body += content;
  body += '</body></html';
  return body;
};

const generatePokemonList = (title, content) => {
  let body = '<html><body style="font-family:monospace;">';
  body += `<h1>${title}</h1><ol>`;
  for (let i = 0; i < content.length; i++) {
    body += `<li><a href="/${content[i].name}">${content[i].name}</li>`;
  }
  body += '</ol></body></html>';
  return body;
};

// MAGIC HAPPENS BELOW
jsonfile.readFile('pokedex.json', (err, obj) => {
  if (err) console.error(err);
  else {
    const p = obj.pokemon;

    app.get('/', (req, res) => {
      res.send(generatePokemonList('Pokedex', p));
    });

    app.get('/:name', (req, res) => {
      const param = capitalize(req.params.name);
      const result = checkName(param, p);
      if (result[0] === true) res.send(generateHtml(param, result[1]));
      res.status(404).send(generateHtml('404', `Could not find information about ${req.params.name}- Is that a new pokemon? Gotta catch em' all!`));
    });

    app.get('/type/:type', (req, res) => {
      const param = capitalize(req.params.type);
      const result = checkType(param, p);
      const title = `Pokemon of type: ${param}`;
      res.send(generateHtml(title, result));
    });

    app.get('/weaknesses/:weakness', (req, res) => {
      const param = capitalize(req.params.weakness);
      const result = checkWeakness(param, p);
      const title = `Pokemon weak against: ${param}`;
      res.send(generateHtml(title, result));
    });

    app.get('/nextevolution/:name', (req, res) => {
      const param = capitalize(req.params.name);
      const result = checkEvo(param, p);
      const title = `Pokemon evolving to ${param}`;
      res.send(generateHtml(title, result));
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
