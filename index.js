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

 const showPokemon = (request, response) => {
    let file = 'pokedex.json';
    let number = request.params.number;
    jsonfile.readFile(file, (err, obj) => {
        response.send(obj["pokemon"][number].name)
  });
 };

app.get('/pokemon/:number', showPokemon);


// app.get('/pokemon/:number', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         let number = request;
//         response.send(obj["pokemon"][number].weight)
//   });
//   // send response with some data (a string
//   // response.send(showPokemon(request.path.number));
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));