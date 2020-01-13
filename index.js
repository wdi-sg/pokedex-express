const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Read pokedex file
 * ===================================
 */


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:nameOfPokemon', (request, response) => {
  // send response with some data (a string)
    jsonfile.readFile(file, (err, obj)=>{
        if(err === null){
            let name = request.params.nameOfPokemon;
            let listOfPokemon = obj["pokemon"];
            for(let i = 0 ; i< listOfPokemon.length; i ++){
         if(listOfPokemon[i]["name"] == name){
            let pokemon = listOfPokemon[i];
            response.send(pokemon["name"] + " weighs "+ pokemon["weight"] );
           }
       }
           response.send("Pokemon does not exist");

        }else{
            response.send(err);
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));