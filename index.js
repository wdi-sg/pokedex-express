const jsonfile = require('jsonfile');
const express = require('express');

const app = express();
const file = 'pokedex.json';

const getHtmlPage = content => {
  let html = '';
  html += '<html>';
  html += '<head>';
  html += '<title>Pokemon</title>';
  html += '</head>';
  html += '<body>';
  html += content;
  html += '</body>';
  html += '</html>';
  return html;
};

const getHtmlList = arr => {
  let html = '';
  html += '<ul>';
  arr.forEach(item => {
    html += '<li>' + item + '</li>';
  });
  html += '</ul>';
  return html;
};

const getAllInfo = pokemon => {
  let content = '';

  content += '<h1>' + pokemon.name + '</h1>';
  content += '<img src="' + pokemon.img + '">';
  content += '<h2>Type</h2>';
  content += '<ul>';
  pokemon.type.forEach(type => {
    content += '<li>' + type + '</li>';
  });

  content += '</ul>';
  content += '<h2>Height</h2>';
  content += '<p>' + pokemon.height + '</p>';
  content += '<h2>Weight</h2>';
  content += '<p>' + pokemon.weight + '</p>';
  content += '<h2>Candy</h2>';
  content += '<p>' + pokemon.candy + '</p>';
  content += '<h2>Candy Count</h2>';
  content += '<p>' + pokemon.candy_count + '</p>';
  content += '<h2>Egg</h2>';
  content += '<p>' + pokemon.egg + '</p>';
  content += '<h2>Spawn Chance</h2>';
  content += '<p>' + pokemon.spawn_chance + '</p>';
  content += '<h2>Average Spawns</h2>';
  content += '<p>' + pokemon.avg_spawns + '</p>';
  content += '<h2>Spawn Time</h2>';
  content += '<p>' + pokemon.spawn_time + '</p>';
  content += '<h2>Multippliers</h2>';
  content += '<ul>';
  pokemon.multipliers.forEach(multiplier => {
    content += '<li>' + multiplier + '</li>';
  });

  content += '</ul>';
  content += '<h2>Weaknesses</h2>';
  content += '<ul>';
  pokemon.weaknesses.forEach(weakness => {
    content += '<li>' + weakness + '</li>';
  });

  content += '</ul>';
  content += '<h2>Previous Evolution</h2>';
  if (pokemon.prev_evolution) {
    content += '<ul>';
    pokemon.prev_evolution.forEach(prev => {
      content += '<li>' + prev.name + '</li>';
    });
    content += '</ul>';
  } else {
    content += '<p>Null</p>';
  }

  content += '<h2>Next Evolution</h2>';
  if (pokemon.next_evolution) {
    content += '<ul>';
    pokemon.next_evolution.forEach(next => {
      content += '<li>' + next.name + '</li>';
    });
    content += '</ul>';
  } else {
    content += '<p>Null</p>';
  }

  return content;
};

app.get('/', (request, response) => {
  let content = '<p>Welcome to the online Pokdex!</p>';
  response.send(getHtmlPage(content));
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
        let content = getAllInfo(pokemon);
        response.send(getHtmlPage(content));
        break;
      }
    }

    if (i === obj.pokemon.length) {
      let content = `<p>Could not find information about ${nameRequested} - Is that a new pokemon? Gotta catch em' all!</p>`;
      response.status(404);
      response.send(getHtmlPage(content));
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

    response.send(getHtmlPage(getHtmlList(names)));
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

    response.send(getHtmlPage(getHtmlList(names)));
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

        response.send(getHtmlPage(getHtmlList(names)));
      }
    }
  });
});

app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
