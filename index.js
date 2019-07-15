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

    let matchFound = false;

    let pokemonName = capitalizeFirstLetter(request.params.name);

    jsonfile.readFile(file, (err,obj) => {

        if(err) {
            console.log('there is an error')

        } else {

            for (let i = 0; i < obj['pokemon'].length; i ++) {

                if (obj['pokemon'][i].name === pokemonName) {
                    matchFound = true;
                    response.send(obj['pokemon'][i].name + ' weighs ' + obj['pokemon'][i].weight);
                }
            }

            if (matchFound === false) {
                response.status( 404 );
                response.send(`Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`)
            }

        }
    });
}



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  response.send("Welcome to the online Pokedex!")
});

app.get('/pokedex', (request, response) => {
  response.send("Please type in a pokemon you would like to search")
});

app.get("/pokedex/:name/", whenRequestIsReceived);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));