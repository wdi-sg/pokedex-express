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

// PART 2 - Construct HTTP Request to get user input by pokemon name
app.get('/pokemon/:name', (request, response) => {


    // Get the name from the parameter
    let pokeName = request.params.name;
    console.log("Name entered is " + pokeName);

    jsonfile.readFile(file, (err, obj) => {

        // Loop through JSON file to look for matching name
        for (let i = 0; i < obj.pokemon.length; i++) {

            console.log(obj.pokemon[i].name);

            // If found, return pokemon name and weight
            if (obj.pokemon[i].name.includes(pokeName)) {

                console.log(i);

                response.send("This is the pokemon information you have requested for is " + obj.pokemon[i].name + " and its weight is " + obj.pokemon[i].weight);
            } else {

                // If not found, return error and set status code to 404
                response.statusCode = 404;
                console.log("Status code is " + response.statusCode);

                response.send("Could not find information about " + pokeName + " - Is that a new pokemon? Gotta catch em' all!");
            }
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));