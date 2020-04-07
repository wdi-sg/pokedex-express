const express = require('express');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'

 const goPokemon = (request, response)=>{
  console.log("pokemon request");
   jsonfile.readFile(file, (err, obj) => {
     for(let i = 0;i<obj.pokemon.length;i++){
       const chosePokemon = obj.pokemon[i].name;
       if(request.params.name.toLowerCase() === chosePokemon.toLowerCase()){
         console.log("Name: " + obj.pokemon[i].name);
         console.log("Name: " + obj.pokemon[i].weight);
         response.send("<h1>" +"Name: "+ obj.pokemon[i].name + "<h2>" + "Weight: " + obj.pokemon[i].weight );
       }
       //Have an issue where i cant add [else if statment or else statment]
       // returns an throw new Err_HTTP_HEADERS_SENT('set');



       // console.log(chosenPokemon);
       // console.log(request.params.name);
     }
   });
 };

app.get('/pokemon/:name', goPokemon);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

