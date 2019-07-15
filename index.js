const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

//----- Function for capitalizing first letter of Pokemon being searched -----//

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const whenRequestIsReceived = (request, response) => {

    let pokemonName = capitalizeFirstLetter(request.params.name);

    jsonfile.readFile(file, (err,obj) => {

        if(err) {
            console.log('there is an error')

        } else {

            // console.log('running array check!')

            for (let i = 0; i < obj['pokemon'].length; i ++) {

                if (obj['pokemon'][i].name === pokemonName) {
                    response.send(obj['pokemon'][i].name + ' weighs ' + obj['pokemon'][i].weight);
                }
            }
        }
    });
}



/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

app.get("/pokedex/:name/", whenRequestIsReceived);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));