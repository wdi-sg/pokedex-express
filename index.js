const express = require('express');

const jsonfile = require('jsonfile');
const pokedex = "pokedex.json"

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

    // Object.keys(object).find(key => object[key] === value);
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:pokename', (request, response) => {
  // send response with some data (a string)
    let badReq = true;
    jsonfile.readFile(pokedex, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++) {
            Object.keys(obj.pokemon[i]).find(key =>
            {
                if (obj.pokemon[i][key] == request.params.pokename)
                {
                    response.status(200).send(obj.pokemon[i].weight);
                    badReq = false;
                }
            });
        }
        if (badReq) {
            response.status(404).send(`Could not find information about ${request.params.pokename} - Is that a new pokemon? Gotta catch em' all!`);
        }
        console.log()
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
