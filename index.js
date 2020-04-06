const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json'

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

jsonfile.readFile(file, (err, obj) => {
    //error check
    if (err){
        console.log("error at read file");
    }
    app.get('/pokemon/:arrayPosition/', (request, response) => {
        response.send("The Pokemon is " + obj["pokemon"][request.params.arrayPosition]["name"]);
    });

    app.get('*', (request, response) => {
        response.send("whoops");
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));