console.log('jello')
const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'

var found = false;

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
app.get("/pokemon/:name/", (request, response) => {
  // send response with some data (a string)
    jsonfile.readFile(file, (err, obj) => {
        if(err){
            console.log(err)
        }
        else {
            for (i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()){
                    response.send(request.params.name + "'s weight is " + obj.pokemon[i].weight + ".");
                    found = true;
                }
            }
/**
 * ===================================
 * Error 404
 * ===================================
 */
            if (found === false){
            response.status(404);
            response.send("Could not find information about " + request.params.name + " - Is that a new pokemon?")
            }
        }
    })
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));