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

app.get('/:name', (request, response) => {
  // send response with some data (a string)
    let path = request.params.name;
    let counter = 0;
    jsonfile.readFile(file, (err, obj) => {
        for (let i=0; i<151; i++){
            if (obj['pokemon'][i]['name'].toLowerCase() === path) {
                console.log("found it! " + obj['pokemon'][i]['name'].toLowerCase())
                response.send(path + " is " + obj['pokemon'][i]['weight']);
            // } else if (obj['pokemon'][i]['name'].toLowerCase() !== path) {
            //     response.status(404).send("Could not find information about "+ path + "- Is that a new pokemon? Gotta catch em' all!");
            }
        }
    })
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));