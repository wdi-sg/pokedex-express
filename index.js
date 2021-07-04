const express = require('express');
const jsonfile = require('jsonfile');
const file = './pokedex.json';

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

/*app.get('/', (request, response) => {
  response.send('Hello, Welcome to the World of Pokemon.')
});

app.get('/pokemon/:name', (request, response) => {
  response.send("The information is: " + request.params.name)
});
*/


// THIS SHOWS THE RESPONSE (All About Pokemon)
const whenRequestIsReceived = (request, response) => {
    const file = 'pokedex.json'

    console.log("hello");
    response.send('All About Pokemon');
};

console.log("when a request happens, do this");
app.get('*', whenRequestIsReceived );



// THIS DOES NOT WORK
/*app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);

        let found = true;
        for (i = 0; i < obj.pokemon.length; i++) {
            let pokemonId = obj.pokemon[i].id;
            if (pokemonId === request.params.id) {
                response.send("Pokeman number: " + pokeId)
            } else {
                response.send(request.path);
            }
        }

    })
});
*/





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));