const express = require('express');
const jsonfile = require('jsonfile');

// create a new express app
const app = express();

//Question 1: Go through pokedex.json to understand how the data is structured. Where are all the pokemon data stored?
// when referencing a file, consider -> ./ or ../ or ./foldername
const pokedex = './pokedex.json';

//Further Q2: detect if the user didn't put anything in the path. Return a message saying "Welcome to the online Pokdex!"
app.get('/', (request, response) => {
    response.send(`Welcome to the online Pokedex!`);
})

//Further Q4: Expose a new route for /type/some-type that returns a message listing the names of all pokemon that have the specified type
            // (eg. /type/grass should show a page with names of all pokemon of grass type).
app.get('/type/:type', (request, response) => {
    jsonfile.readFile(pokedex, function(error, object) {
        var typeSearched = request.params.type
        var pokemonType = [];
        for (i in object.pokemon) {
            for (j in object.pokemon[i].type) {
                if (object.pokemon[i].type[j].toLowerCase().includes(typeSearched)) {
                    pokemonType.push(object.pokemon[i].name)
                }
            }
        }
        response.send(pokemonType);
    })
})
















//Question 2: Return a string response with the requested pokemon's information when a request comes with matching the route
app.get('*', (request, response) => {
    var path = request.path.substring(1);
    var found = false;
    //start by reading the pokedex json file, object can be named anything
    jsonfile.readFile(pokedex, function(error, object) {
        //and then sending it in the response of the request
        for (i in object.pokemon) {
            var pokemonName = object.pokemon[i].name.toLowerCase();
            if (path.includes(pokemonName)) {
                //Further Q3: Instead of showing just the weight, show all the details of the requested pokemon for /some-name route, in a full sentence. i.e., "This is Bublasaur, he is 45kg in weight! He also..." etc., etc
                response.send(`This is ${object.pokemon[i].name}, he is ${object.pokemon[i].weight} in weight! His weaknesses are ${object.pokemon[i].weaknesses}`)
                //original response.send ==> object.pokemon[i]);
                found = true;
            }
        }
        if (found == false) {
        response.status(404).send(`Could not find information about ${path}. Is that a new pokemon? Gotta catch em' all!`)
        }
    })
})
    //Further Qn 1:
    //Handle the case where an invalid pokemon name is provided (eg. /some-name).
    //Return a message that says "Could not find information about <pokemon_name> - Is that a new pokemon? Gotta catch em' all!" (replace <pokemon_name> with the requested for pokemon name)
    //Set the status code to 404.




    // console.log("PATH: " + request.path);
    // response.send(object);

//run this command to ready your server, by specifying a port to listen on, and you are listening for a request
//console.log to make sure you know your server is up and running
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



//LEARNING POINTS:

// app.get('/') refers to the home page aka root path
// app.get('/', function(request, response) {
//     // send response with some data (a string)
//     response.send('you visited the home page'); //it will showcase the path
//     // request.path
// });

// app.get('/foo', function(request, response) {
//     // send response with some data (a string)
//     response.send('you visited the foo path'); //it will showcase the path
//     // response.send(request.path)
//     // request.path
// });