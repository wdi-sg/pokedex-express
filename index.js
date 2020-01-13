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
 * Routes
 * ===================================
 */

 //pokemon[42].name = oddish
 // const pokemonArray = obj["pokemon"];

//A first version would be where the url is just the position of the pokemon in the array of pokemon http://127.0.0.1:3000/pokemon/1 ==> Ivysaur
// app.get('/pokemon/:num', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         if (err) {
//             console.error(err);
//         }
//         let searchNum = parseInt(request.params.num);
// // send response with some data (a string)
//         response.send(obj["pokemon"][searchNum].name);
//     })
// });

 //Return a string response with the requested pokemon's information when a request comes with matching the route /pokemon/some-name (eg. localhost:3000/pokemon/bulbasaur should show Bulbasaur's information - for now, show only its weight value) and
//Handle the case where an invalid pokemon name is provided (eg. /pokemon/some-name). Return a message that says "Could not find information about <pokemon_name> - Is that a new pokemon? Gotta catch em' all!" (replace <pokemon_name> with the requested for pokemon name) Set the status code to 404.
 app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        if (err) console.error(err);
        let searchName = request.params.name.toLowerCase();
        const pokemonArray = obj["pokemon"];
        let foundPokemon;
        for (let i = 0; i < pokemonArray.length; i++) {
            if (pokemonArray[i]["name"].toLowerCase() === searchName) {
                foundPokemon = pokemonArray[i];
            };
        };
        if (foundPokemon === undefined) {
            request.statusCode = 404;
            response.send ("Error " + request.statusCode + "." + "\n" + " Could not find information about " + searchName.charAt(0).toUpperCase() + searchName.slice(1) + "." + " Is that a new pokemon? Gotta catch em\' all! ");
        } else {
            response.send( foundPokemon["name"] + " has a weight of " + foundPokemon["weight"] + " and an index number of " + foundPokemon["num"]);
        }
    })
});


//detect if the user didn't put anthing in the path. Return a message saying "Welcome to the online Pokdex!"
app.get("/pokemon/", (request, response) => {
    response.send("Welcome to the online Pokedex!");
});


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