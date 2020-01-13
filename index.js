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


//when request path is empty, return welcome msg
const welcome = (request, response) => {
    response.send(`Welcome to the online Pokdex!`);
}

app.get('/', welcome);


app.get('/pokemon/:name', (request, response) => {

    const file = 'pokedex.json'; //pokemon array inside object

    jsonfile.readFile(file, (err, obj) => {

        //loop over array to validate name
        let userInput = request.params.name;
        var found = 'N';
        for (var i = 0; i < obj.pokemon.length; i++) {
            var pokeCharacter = obj.pokemon[i].name.toLowerCase();
                if (userInput === pokeCharacter) {
                found = 'Y';
                break
                }
            }
            if (found === 'Y') {
                console.log(obj.pokemon[i].weight);
                response.send(`Weight of ${pokeCharacter} is ${obj.pokemon[i].weight}.`);
            }
            else {
                response.status('404').send(`Could not find information about ${userInput} - Is that a new pokemon? Gotta catch em' all!`);
                }
            console.log(userInput);
            console.log(pokeCharacter);
   })

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
