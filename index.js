const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

// PART 1 - Construct HTTP Request to get user input by number
/*app.get('/pokemon/:number', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        // Get the number from the parameter
        // Save it as an integer
        let pokeNum = parseInt(request.params.number);
        console.log("Poke's number is " + pokeNum);

        // Get the pokemon information matching the number entered by user
        response.send("This is the pokemon information you have requested for is " + obj.pokemon[pokeNum].name + " and its weight is " + obj.pokemon[pokeNum].weight);
        });
});*/

// PART 3 - If there is no params in the path, show welcome message
app.get('/pokemon/', (request, response) => {
    response.send("Welcome to the online Pokdex!");
});

// PART 2 - Construct HTTP Request to get user input by pokemon name
app.get('/pokemon/:name', (request, response) => {

    // Get the name from the parameter
    let pokeName = request.params.name;
    console.log("Name entered is " + pokeName);

    jsonfile.readFile(file, (err, obj) => {

        // Filter for the object that is contained in the array
        let pokeNameFound = obj.pokemon.filter(data => (data.name == pokeName));

        // Returned result is an object
            // If length is more than 0, match name with JSON file and get the information to display
        if (pokeNameFound.length > 0) {

            console.log(pokeNameFound);

            for(let i = 0; i < obj.pokemon.length; i++) {
                if(obj.pokemon[i].name === pokeName) {
                    response.send("This is " + obj.pokemon[i].name + ". He is " + obj.pokemon[i].weight + " in weight and " + obj.pokemon[i].height);
                }
            }

        } else {

            // If not found, return error and set status code to 404
            response.statusCode = 404;

            console.log("Status code is " + response.statusCode);

            response.send("Could not find information about " + pokeName + " - Is that a new pokemon? Gotta catch em' all!");
        }

    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));