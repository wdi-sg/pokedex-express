const jsonfile = require('jsonfile');
const express = require('express');

const app = express();
const file = 'pokedex.json';

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getHtmlPage = content => {
  let html = '';
  html += '<html>';
  html += '<head>';
  html += '<title>Pokemon</title>';
  html += '<style>* {padding: 0; margin: 0; box-sizing: border-box;} body {padding: 2rem; text-align: center; font-family: sans-serif;} h1 {padding-bottom: 1rem;} h3 {padding: .5rem;} ul {display: inline-block; color: grey;} p {color: grey;} a {text-decoration: none; color: grey; display: inline-block; margin-bottom: .5rem;}</style>';
  html += '</head>';
  html += '<body>';
  html += content;
  html += '</body>';
  html += '</html>';
  return html;
};

const getHtmlList = arr => {
  let html = '';
  if (arr) {
    html += '<ul>';
    arr.forEach(item => {
      html += '<li>' + item + '</li>';
    });
    html += '</ul>';
  } else {
    html += '<p>Null</p>';
  }
  return html;
};

const getPokemonLinks = arrOfPokemons => {
  content = '<ul>';
  arrOfPokemons.forEach(pokemon => {
    content += '<li><a href="/' + pokemon.name + '">' +
      pokemon.name + '</a></li>';
  });

  content += '</ul>';
  return content;
};

const getAllInfo = pokemon => {
  let content = '';

  content += '<h1>' + pokemon.name + '</h1>';
  content += '<img src="' + pokemon.img + '">';
  Object.entries(pokemon).forEach(([key, value]) => {
    if (key !== 'name' && key !== 'img') {
      let title = capitalizeFirstLetter(key).replace('_', ' ');
      content += '<h3>' + title + '</h3>';
      if (key === 'type' || key === 'weaknesses' || key === 'multipliers') {
        content += getHtmlList(value);
      } else if (key === 'prev_evolution' || key === 'next_evolution') {
        content += getPokemonLinks(value);
      } else {
        content += '<p>' + value + '</p>';
      }
    }
  });

  return content;
};

app.get('/', (request, response) => {
  let content = '<h1>Welcome to the online Pokdex!</h1>';
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    content += getPokemonLinks(obj.pokemon);
    response.send(getHtmlPage(content));
  });
});

app.get('/:name', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    const nameRequested = request.params.name.toLowerCase();
    const result = obj.pokemon.filter(pokemon => {
      return pokemon.name.toLowerCase() === nameRequested;
    });

    if (result.length > 0) {
      response.send(getHtmlPage(getAllInfo(result[0])));
    } else {
      response.status(303).redirect('/');
    }
  });
});

app.get('/type/:type', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    const typeRequested = capitalizeFirstLetter(request.params.type);
    const result = obj.pokemon.filter(pokemon => {
      return pokemon.type.includes(typeRequested);
    });

    if (result.length > 0) {
      response.send(getHtmlPage(getPokemonLinks(result)));
    } else {
      response.status(303).redirect('/');
    }
  });
});

app.get('/weaknesses/:weakness', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    const weakness = capitalizeFirstLetter(request.params.weakness);
    const result = obj.pokemon.filter(pokemon => {
      return pokemon.weaknesses.includes(weakness);
    });

    if (result.length > 0) {
      response.send(getHtmlPage(getPokemonLinks(result)));
    } else {
      response.status(303).redirect('/');
    }
  });
});

app.get('/nextevolution/:name', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    const name = request.params.name.toLowerCase();
    const result = obj.pokemon.filter(pokemon => {
      return pokemon.name.toLowerCase() === name && pokemon.prev_evolution;
    });

    if (result.length > 0) {
      response.send(getHtmlPage(getPokemonLinks(result[0].prev_evolution)));
    } else {
      response.status(303).redirect('/');
    }
  });
});

/**
 * /search/spawn_chance?amount=1&compare=less
 * /search/avg_spawns?amount=1&compare=more
 * /search/spawn_time?amount=11:00&compare=less
 * /search/height?amount=3&compare=more
 * /search/weight?amount=2&compare=less
 */
app.get('/search/:searchBy', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      response.send(getHtmlPage('<p>' + err + '</p>'));
      return;
    }

    const searchBy = request.params.searchBy.toLowerCase();
    const compare = request.query.compare.toLowerCase();
    const pokemons = obj.pokemon.filter(pokemon => {
      let amount;
      let value;
      if (searchBy === 'spawn_time') {
        amount = request.query.amount;
        value = pokemon[searchBy];
      } else {
        amount = parseFloat(request.query.amount);
        value = parseFloat(pokemon[searchBy]);
      }

      if (compare === 'less') {
        return value < amount;
      } else if (compare === 'more') {
        return value > amount;
      } else {
        response.status(303).redirect('/');
      }
    });

    response.send(getHtmlPage(getPokemonLinks(pokemons)));
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
