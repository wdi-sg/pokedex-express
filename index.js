console.log('pokedex app')
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:index', (request, response) => {

    const file = 'pokedex.json';  //pokemon array inside object
    jsonfile.readFile(file, (err, obj) => {
        if (err === null) {
            console.log(obj.pokemon[request.params.index]);
            response.send(`Weight of ${obj.pokemon[request.params.index].name} is ${obj.pokemon[request.params.index].weight}.`);
        }
        else{
            response.status('400').send(`Not found.`);
        }
   })

  // send response with some data (a string)
  // response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
