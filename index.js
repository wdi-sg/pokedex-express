const express = require('express');
const jsonfile = require('jsonfile');

//getting the data from the json file
var file = './pokedex.json'
var object;
jsonfile.readFile(file, function(err, obj) {
  object = obj;
})


function getPokemonName (name) {
  let pokemons = object.pokemon;

  for(let i=0; i<pokemons.length; i++) {
    if(pokemons[i].name.toLowerCase() == name.toLowerCase()) {
      return pokemons[i];
    }
  }
}

function createHTML (pokemon) {
  console.log(pokemon);
  // let name = 'Name: ' + pokemon.name + '<br>';
  let html = '<html>';
  
  for(let key in pokemon) {
    html += key + ': ' + pokemon[key] + '<br>'
  }

  html += '</html>'
  return html;
}


function errorMessage (name) {
  let para = '<p>Could not find information about ' +  name  + " - Is that a new pokemon? Gotta catch em' all!</p>";
  let html = '<html>' + para + '</html>';
  return html;
}

function welcome() {
  let pokemons = object.pokemon;

  let html = '<h1>Welcome to the online Pokedex!</h1>'
  let poke = '';
  for(let i=0; i<pokemons.length; i++) {
    let name = pokemons[i].name;
    console.log(pokemons[i].name);
    poke += '<li>' + name + '</li><br>';
  }
  let data = '<ul>' + poke + '</ul>';

  return  html + data;
}

function returnType(type) {
  let pokemons = object.pokemon;
  let typeList = [];

  for(let i=0; i<pokemons.length; i++) {
    for(let a=0; a<pokemons[i].type.length; a++) {
      if(pokemons[i].type[a].toLowerCase() == type.toLowerCase()) {
        typeList.push(pokemons[i]);
      }
    }
  }

  let names = '<html><ul>';
  for(let i=0; i<typeList.length; i++) {
    names += "<li>" + typeList[i].name + '</li>';
  }
  names+= '</ul></html>';
  return names;
}

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */



app.get('*', (request, response) => {
  // send response with some data (a string)
  // response.send(request.path);
  let path = request.path.split('/');
  console.log(path);
  if(path[1] == 'type') {
    let type = path[2];
    response.send(returnType(type));
  } else {
    let pokeName = request.path.replace('/','');
    // console.log('name; ', pokeName);

    if(pokeName == '') {
      response.send(welcome());
    } else if (getPokemonName(pokeName) == null) {
      response.status(404);
      response.send(errorMessage(pokeName));
    } else {
      let pokemon = getPokemonName(pokeName);
      console.log(pokemon);
      let page = createHTML(pokemon);
      response.send(page);
    }
  }

  

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
