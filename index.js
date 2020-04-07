const express = require('express');
const jsonfile = require('jsonfile');
console.log("Node is running");

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// variable for file directory
var file = './pokedex.json'
//call readfile
jsonfile.readFile(file, function(err, obj) {
    //log any errors
    console.log(err);
    //total number of pokemons within object
    let pokeTotal = obj.pokemon.length;


    //log all pokemon ID
    console.log(obj.pokemon.length);
    console.log(file)
;
    for(i = 0; i < obj.pokemon.length; i++){
        //assign total number of pokemon
        let pokeID = obj.pokemon[i].id;
        console.log(obj.pokemon[i].name);
        console.log(pokeID);
    }
})

/**
 * ===================================
 * Routes
 * ===================================
 */
 // capture request when user type a number after /pokemon/
app.get("/pokemon/:n", (request, response)=> {
    //variable to capture the number as input
    let inputID = request.params.n;

// check that id exists in pokemon
    if (inputID < 151){
        console.log("User typed : " + request.path);
        response.send(inputID + " " + "is within data");
    }else{
        console.log("User typed : " + request.path);
        response.send(inputID + " " + "ID not found");
    }

})


// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));