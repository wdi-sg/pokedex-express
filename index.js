const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

const getPokemon = (request, response) => {
  console.log("Getting Pokemon data");

  const file = 'pokedex.json';

  let tofind = request.params.name.toLowerCase();
  console.log(tofind);

  jsonfile.readFile(file, (err, obj) => { //obj is only defined within this function
    if (err) {
    console.log(obj);
    }

    let found = false;

    for ( let i=0; i<obj["pokemon"].length; i++) {
        if ( tofind === (obj["pokemon"][i].name).toLowerCase() ) {
            found = true;
            let pokeMatched = obj["pokemon"][i];
            let keys = Object.keys(pokeMatched);
            console.log(keys);
            let description = "";
            for ( let j=0; j<keys.length; j++) {
                description += `${pokeMatched.name}'s ${keys[j]} is ${pokeMatched[keys[j]]}.\n`;
            }
            response.send( description );
        }
    }

    if ( found === false ) { //have to be outside nested loop
            response.status(404).send(`Could not find information about ${tofind} - Is that a new pokemon? Gotta catch em' all!`);
    }

  })
  //response.send(request.path);
};

const welcome = (request, response) => {
  response.send("Welcome to the online Pokdex!");
}

app.get('/pokemon/:name', getPokemon);
app.get('/pokemon', welcome);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));