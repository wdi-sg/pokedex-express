const express = require('express');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const doPokemon = (request, response)=>{
  console.log("pokemon request");

  const file = 'pokedex.json'

  jsonfile.readFile(file, (err, obj) => {
    let pokeList = obj["pokemon"];

    if( err ){
      console.log("ERR", err );
    } else {
        for (let i = 0; i < pokeList.length; i++) {
            if (i+1 === parseInt(request.params.name)) {
                pokeList[i] = "You chose " + pokeList[i].name;
                response.send(pokeList[i]);
            }
        }

    // console.log("WOW FINISHED READING",obj.pokemon[1])
    // const firstPoke = obj.pokemon[1];

    // console.log("NAME: "+firstPoke.name );
    // response.send("WHOA: "+firstPoke.name);
    }
  })
};

const startingPage = (request,response) => {
    response.send("Pokedex homepage.")
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:name', doPokemon)
app.get('*', startingPage);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));