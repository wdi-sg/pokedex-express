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
  console.log("running");

  const file = 'pokedex.json';

  let tofind = request.params.name;
  console.log(tofind);

  jsonfile.readFile(file, (err, obj) => { //obj is only defined within this function
    if (err) {
    console.log(obj);
    }

    for ( var i=0; i<obj["pokemon"].length; i++) {
        if ( tofind === (obj["pokemon"][i].name).toLowerCase() ) {
            response.send(`${obj["pokemon"][i].name}'s weight is ${obj["pokemon"][i]["weight"]}`);
        }
    }

  })
  //response.send(request.path);
};

app.get('/pokemon/:name', getPokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));