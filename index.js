
const express = require('express');
const jsonfile = require('jsonfile');

//getting the data from the json file
const pokedex = './pokedex.json'
var object;

// always remember to read and then write
jsonfile.readFile(pokedex, (err, obj) => {
  object = obj;
});


// getting the name for all the pokemon
function getPokeName (name) {
  let allPokemon = object.pokemon;

  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].name.toLowerCase() == name.toLowerCase()) {
      // remember to RETURNNNNN!
      return allPokemon[i];
    }
  }
};


// no html file so create one to make the damn list
function createTags (pokemon) {
  console.log(pokemon);

  let text = '<html>';
  
// identify the key of each pokemon
  for (let key in pokemon) {
    text += key + ': ' + pokemon[key] + '<br>'
  }

  text += '</html>'
  return text;
};

// stuff typed in not found
function errMsg (name) {
  let params = '<p>Could not find information about ' +  name  + " - Is that a new pokemon? Gotta catch em' all!</p>";
  let text = '<html>' + params + '</html>';
  return text;
};

function welcomeMsg() {
  let allPokemon = object.pokemon;

  let text = '<h1>Welcome to the online Pokedex!</h1>'
  // show all the pokemon available
  let poke = '';
  for (let i = 0; i < allPokemon.length; i++) {
    let name = allPokemon[i].name;
    console.log(allPokemon[i].name);
    poke += '<li>' + name + '</li>';
  }
  let pokeData = '<ul>' + poke + '</ul>';

  return text + pokeData;
};

function getPokeType(type) {
  let allPokemon = object.pokemon;
  let pokeTypeArr = [];

  for (let i = 0; i < allPokemon.length; i++) {
    for (let j = 0; j < allPokemon[i].type.length; j++) {
      if (allPokemon[i].type[j].toLowerCase() == type.toLowerCase()) {
        pokeTypeArr.push(allPokemon[i]);
      }
    }
  };

  let namelist = '<html><ul>';
  for (let i = 0; i < pokeTypeArr.length; i++) {
    namelist += "<li>" + pokeTypeArr[i].name + '</li>';
  }
  namelist += '</ul></html>';
  return namelist;
};


// Init express app
const app = express();

// sabrina you doll

app.get('*', (req, res) => {
  // send response with some data (a string)
  // response.send(request.path);
  let pathName = req.path.split('/');
  console.log(pathName);
  if(pathName[1] == 'type') {
    let type = pathName[2];
    res.send(getPokeType(type));
  } else {
    // dont want that /
    let pokeName = req.path.replace('/','');
    // console.log('name; ', pokeName);

    if(pokeName == '') {
      res.send(welcomeMsg());
      // if someone typed pokemon name incorrectly or doesnt exist
    } else if (getPokeName(pokeName) == null) {
      res.status(404);
      res.send(errMsg(pokeName));
    } else {
      let pokemon = getPokeName(pokeName);
      console.log(pokemon);
      let page = createTags(pokemon);
      res.send(page);
    }
  } 

});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
