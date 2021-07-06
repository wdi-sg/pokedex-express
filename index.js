const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

const welcome = (request, response) => {
  response.send("Welcome to the online Pokdex!");
}

app.get('/pokemon', welcome);


const getPokemon = (request, response) => {
  console.log("Getting Pokemon data");

  const file = 'pokedex.json';

  let tofind = request.params.name.toLowerCase();
  console.log(tofind);

  jsonfile.readFile(file, (err, obj) => { //obj is only defined within this function
    if (err) {
    console.log(obj);
    }

    let found = false; //set key to check if matched

    for ( let i=0; i<obj["pokemon"].length; i++) {
        if ( tofind === (obj["pokemon"][i].name).toLowerCase() ) {
            found = true;

            let pokeMatched = obj["pokemon"][i];
            //get attributes of pokemon
            let keys = Object.keys(pokeMatched);
            let description = "";
            for ( let j=0; j<keys.length; j++) {
                description += `${pokeMatched.name}'s ${keys[j]} is ${JSON.stringify(pokeMatched[keys[j]])}.<br>`;
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

app.get('/pokemon/:name', getPokemon);


const getType = (request, response) => {
  console.log("Getting Pokemon data");

  const file = 'pokedex.json';

  let findType = request.params.type.toLowerCase();
  console.log(findType);
  let foundType = [];

  jsonfile.readFile(file, (err, obj) => { //obj is only defined within this function
    if (err) {
    console.log(obj);
    }

    for ( let i=0; i<obj["pokemon"].length; i++) {
        for ( let j=0; j<obj["pokemon"][i]["type"].length; j++) {
            if ( findType === obj["pokemon"][i]["type"][j].toLowerCase() ) {
                foundType.push(obj["pokemon"][i].name);
            }
        }
    }
    console.log(foundType);

    let typeResult = "";
    for ( let k=0; k<foundType.length; k++) {
        typeResult += foundType[k] + '<br>';
    }
    response.send(`Pokemons of type ${findType}:<br> ${typeResult}`);
  })
};

app.get('/pokemon/type/:type', getType);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));