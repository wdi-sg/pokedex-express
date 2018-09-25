const express = require('express');

const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

let pokeobj;
let resultObj = {};

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
  jsonfile.readFile(pokedex, function(err, obj) {
    pokeobj = obj.pokemon;
    // console.log(pokeobj)
    /*for (let i = 0; i < pokeobj.length; i++){
      let pokename = pokeobj[i].name.toLowerCase();
      console.log(pokename);
    }*/
    obj.pokemon.forEach((pokemon,i) =>{resultObj[pokeobj[i].name.toLowerCase()] = pokemon})
    //console.log(resultObj);
      let pokename = Object.keys(resultObj);
      // console.log(pokename);
       let myParams = request.path.split("/")
       console.log(myParams);

       for(let i = 0; i < pokeobj.length; i++){
         if(myParams.toLowerCase() == pokeobj[i].name.toLowerCase()){
           response.send(request.path);
         }
       }
  });
// response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));
