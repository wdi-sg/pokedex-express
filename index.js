const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const file = './pokedex.json';
// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);
        let pokeName = request.params.name;
        let foundPoke;
        for (let i=0; i<obj["pokemon"].length; i++) {
            if (obj["pokemon"][i]["name"] === pokeName) {
                foundPoke = obj["pokemon"][i];
            };
        };
// send response with some data (a string)
    response.send(foundPoke);
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));