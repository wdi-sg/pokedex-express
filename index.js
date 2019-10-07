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

jsonfile.readFile(file, (err, obj) => {

    // Construct URL
    app.get('/pokemon/:number', (request, response) => {

        // send response with some data (a string)
        // response.send(request.path);

        // Get the number from the parameter
            // Save it as an integer
        let pokeNum = parseInt(request.params.number);
        console.log("Poke's number is " + pokeNum);

        // Get the pokemon information matching the number entered by user
        response.send("This is the pokemon information you have requested for is " + obj.pokemon[pokeNum].name + " and its weight is " + obj.pokemon[pokeNum].weight);
    });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
