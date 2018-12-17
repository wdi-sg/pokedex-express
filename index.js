const express = require('express');
const file = 'pokedex.json'

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

 app.get('/', (request, response) => {
    response.send("Welcome to the online Pokedex!");
 });

    app.get('/:name', (request, response) => {
        let nameFound = false;
            jsonfile.readFile(file, (err, obj) => {
                for (var i=0; i<obj.pokemon.length; i++) {
                    if (obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
                        nameFound = true;
                        response.send("Weight of Pokemon: " + obj.pokemon[i].weight)
                        response.send()
                    }
                    else {
                        nameFound = false;
                        response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!")
                    }
                }
  // send response with some data (a string)
  // response.send(request.params.name);
            });

    })

// jsonfile.writeFile(file, obj, (err) => {
    // console.log(obj)
  // });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
