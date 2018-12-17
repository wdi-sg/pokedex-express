const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

var pokemon = jsonfile.readFileSync(file, (err, poke) => {
  if (err) console.error(err)
});

pokemon = pokemon.pokemon;

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

// app.get("/:name/:lastname", (request, response) => {
//   response.send("Hello " + request.params.name + " " + request.params.lastname)
// });

function getPokemnoDetail(rec) {

  var result = "";
  
 
  for (var i = 0; i < rec.length; i++) {
   
    var weaknesses="";
    
    if (rec[i].weaknesses.length > 0) {
      for (var j = 0; j < rec[i].weaknesses.length; j++) {
        weaknesses += rec[i].weaknesses[j]
        if (j < rec[i].weaknesses.length - 1) {
          weaknesses += ", "
        }
      }
    }
  
    var pokemonType = "";

    if (rec[i].type.length > 0) {
      for (var j = 0; j < rec[i].type.length; j++) {
        pokemonType += rec[i].type[j]
        if (j < rec[i].type.length - 1) {
          pokemonType += ", "
        }
      }
    }

    var nextEvolution = "";

    if (rec[i].hasOwnProperty('next_evolution')) {
      if (rec[i].next_evolution.length > 0) {
        for (var j = 0; j < rec[i].next_evolution.length; j++) {
          nextEvolution += rec[i].next_evolution[j].name
          if (j < rec[i].next_evolution.length - 1) {
            nextEvolution += ", "
          }
        }
      }
    }

    result = result + 
      `<h1 style="width: 420px; text-align: center;">${rec[i].name}</h1>
      <div>
      <div style="display:inline-block; width=300px;">
      <img src='${rec[i].img}' alt='${rec[i].name} width: 200px; height: 200px;'>
      </div>
      <div style="display:inline-block; margin-left: 20px; width=200px;">
      <p>Candy : ${rec[i].candy}</p>
      <p>Height : ${rec[i].height}</p>
      <p>Weight : ${rec[i].weight}</p>
      <p>Type : ${pokemonType} </p>
      <p>Weaknesses : ${weaknesses}</p>
      <p>Next Evolution : ${nextEvolution}</p>
      </div>
      </div>
      `
  }
  
  return result
}


function findPokemonByName(req, pokemon) {
  
  var rec = [];
  var found = false;

  for (var i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name.toUpperCase() === req.toUpperCase()) {
      rec.push(JSON.parse(JSON.stringify(pokemon[i])));
      found = true;
    }
  }

  return rec
}

function findPokemonByType(req, pokemon) {
  
  var rec = [];
  var userReq = req.charAt(0).toUpperCase() + req.slice(1).toLowerCase();

  for (var i = 0; i < pokemon.length; i++) {
    
    if (pokemon[i].type.includes(userReq)) {
      rec.push(JSON.parse(JSON.stringify(pokemon[i])));
    }
  }

  return rec
}

function findPokemonByWeaknesses(req, pokemon) {
  
  var rec = [];
  var userReq = req.charAt(0).toUpperCase() + req.slice(1).toLowerCase();

  for (var i = 0; i < pokemon.length; i++) {
    
    if (pokemon[i].weaknesses.includes(userReq)) {
      rec.push(JSON.parse(JSON.stringify(pokemon[i])));
    }
  }

  return rec
}

function findPokemonByRevolution(req, pokemon) {
  
  var rec = [];
  for (var i = 0; i < pokemon.length; i++) {
    
    if (pokemon[i].hasOwnProperty('next_evolution')) {
      for (var j = 0; j < pokemon[i].next_evolution.length; j++) { 
        if (pokemon[i].next_evolution[j].name.toUpperCase() === req.toUpperCase()) {
          rec.push(JSON.parse(JSON.stringify(pokemon[i])));
        }
      }
    }
  }
 

  return rec
}

app.get('/type/*', (request, response) => {
  let req = request.params[0].split("/")[0]

  if (req.length < 1) {
    response.status(404).send(`<h2>Please enter the pokemon type after the link</h2>`)
  } else {
    var rec;
    rec = findPokemonByType(req, pokemon);
    if (rec.length < 1) {
      response.status(404).send(`<h2>Could not find information about ${req} - Is that a new pokemon type ${req}? Gotta catch em' all!</h2>`)
    } else {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.send(getPokemnoDetail(rec))
    }
  }
});

app.get('/weaknesses/*', (request, response) => {
  let req = request.params[0].split("/")[0]

  if (req.length < 1) {
    response.status(404).send(`<h2>Please enter the pokemon weakness after the link</h2>`)
  } else {
    var rec;
    rec = findPokemonByWeaknesses(req, pokemon);
    if (rec.length < 1) {
      response.status(404).send(`<h2>Could not find information about ${req}- Is that a new pokemon weakness ${req}? Gotta catch em' all!</h2>`)
    } else {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.send(getPokemnoDetail(rec))
    }
  }
});

app.get('/nextevolution/*', (request, response) => {
  let req = request.params[0].split("/")[0]

  if (req.length < 1) {
    response.status(404).send(`<h2>Please enter the pokemon next eevolution after the link</h2>`)
  } else {
    var rec;
    rec = findPokemonByRevolution(req, pokemon);
    if (rec.length < 1) {
      response.status(404).send(`<h2>Could not find information about ${req}- Is that a new pokemon evolution ${req}? Gotta catch em' all!</h2>`)
    } else {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.send(getPokemnoDetail(rec))
    }
  }
});

app.get('*', (request, response) => {
  // send response with some data (a string)
  var req = request.path.split("/")[1];
 
  if (req.length < 1) {
    response.status(404).send(`<h2>Please enter the pokemon name after the link</h2>`)
  } else {
    var rec = [];
    rec = findPokemonByName(req, pokemon);
  if (rec.length < 1) {
    response.status(404).send(`<h2>Could not find information about <pokemon_name> - Is that a new pokemon ${req}? Gotta catch em' all!</h2>`)
  } else {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.send(getPokemnoDetail(rec))
    }
  }
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Server is listening at port 3000 ~~~'));
