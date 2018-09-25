const express = require('express');

const jsonfile = require('jsonfile');

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

const file = "pokedex.json"

//data form the jsonfile provided
var pokemonObject;
console.log(pokemonObject)

//Refers to the array in the pokemon key
//var listOfPokemon = pokemonObject["pokemon"]

function searchName(someObject, referenceName){
    for (let i = 0; i < someObject.pokemon.length; i++){
        if (userInputPath === someObject.pokemon.name.toLowerCase()){
                return someObject.pokemon[i].name
        }
    }
}


console.log("testing document")
//console.log(pokemonObject)

var respondToRequest = function (request, response){
  // send response with some data (a string)
    var userInputPath = request.path.split("/")
    console.log(userInputPath)
    jsonfile.readFile (file, function(err, obj){

        var output = searchName(obj, userInputPath)

        response.send("testing");

    })
}
app.get('*', respondToRequest)


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
