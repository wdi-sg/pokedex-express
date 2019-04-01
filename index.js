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
const file = 'pokedex.json'

/**
 * ===================================
 * Routes
 * ===================================
 */

 // app.get('*', (request, response) => {
 //   // send response with some data (a string)
 //   response.send(request.path);
 // });


app.get("/:name", (request, response) => {
  let match = null;
  let pokemonName;
  console.log(request.params);
  console.log(request.params.name);
  let search = request.params.name.toLowerCase(); //uppercase the first letter of the search word
  jsonfile.readFile(file, (err, obj) => {
    for (let i =0; i<obj.pokemon.length; i++){
      // console.log("The loop is working");
      // console.log(obj.pokemon[i].name);
      // console.log(search);
      if (search == obj.pokemon[i].name.toLowerCase()){
        // console.log(search);
        // result = obj.pokemon[i];
        // console.log("The loop returned something");
        pokemonName = obj.pokemon[i].name;
        console.log(pokemonName);
        match = true;

      } else if (match==null && (i==(obj.pokemon.length-1))){
         match = false;
       }

    }console.log(match);
     if (match == true) {
       response.send(pokemonName);//deliberately coded it this way to return the entire pokemon's data as an object
     } else if (match == false) {
          response.send("Could not find");
     }
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
