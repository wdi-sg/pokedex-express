const express = require('express');
// Init express app
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Routes
 * ===================================
 */

//http://localhost:3000/search?q=bananas => You are search for bananas



// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

jsonfile.readFile(file, (err, obj) => {

    let pokedex = obj.pokemon;

     app.get("/search/:name", (request, response) => {
        response.send("Hello, You are searching for: " + request.query.q);
        response.send("You have found" + pokedex[0].name);

        let search = request.params.name;

        // response.send("You have found" + pokedex[0].name);

        for (var i = 0; i < pokedex.length; i++) {
            if (search == pokedex[i].name)
            response.send("You have found" + pokedex[i].name);
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
