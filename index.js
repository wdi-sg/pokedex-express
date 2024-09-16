const express = require('express');
const jsonfile = require('jsonfile');
const file = "pokedex.json";
const app = express();



const doPokemon = (request,response) => {
    jsonfile.readFile(file,(err,obj) =>{
        if(err){
            console.log(err);
        }let checkPoke = false;
        for(i = 0;i < obj.pokemon.length; i++){
            const pokemonName = obj.pokemon[i].name;
            const pokemonWeight= obj.pokemon[i].weight;

                if(pokemonName === request.params.name){
                    checkPoke = true;
                    response.send("This is a " + pokemonName + ". It's weight is " + pokemonWeight)
                }
                }if (checkPoke === false){
                    response.status(404).send("Could not find information about " + request.params.name)
            }

    })
}









/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app



/**
 * ===================================
 * Routes
 * ===================================
 */
app.get("/pokemon/:name/",doPokemon)
  // response.send("Name: " + request.params.name + " ")
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));