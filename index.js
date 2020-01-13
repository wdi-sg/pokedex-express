const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const dataFile = 'pokedex.json';

/**
 * ===================================
 * Functions
 * ===================================
 */

const displayPokemon = (request, response) => {
    console.log('displaying pokemon ' + request.params.name);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        }
        const pokemonArray = obj.pokemon;

        const requestName = request.params.name

        // If input is a number, display the pokemon by its number;
        if (parseInt(requestName)) {
            if (requestName >= 0 && requestName < pokemonArray.length) {
                response.send(returnPokemon(pokemonArray[requestName - 1]))
                return;
            }
        }

        // using for ... of loops. Much nicer than index search for this sort of thing.
        for (const pokemon of pokemonArray) {
            // console.log(`name: ${pokemon.name}, weight ${pokemon.weight}`);
            if (pokemon.name.toLowerCase() === requestName.toLowerCase()) {
                response.send(returnPokemon(pokemon));
                return;
            }
        }
        response.status(404).send(`Could not find information about ${requestName} - Is that a new pokemon? Gotta catch em' all!`)
    })
}

const returnPokemon = (pokemon) => {
    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    let types = "";
    for (let i = 0; i < pokemon.type.length; i++) {
        console.log(pokemon.type[i]);
        if (i === pokemon.type.length - 1) {
            types += pokemon.type[i];
        } else {
            types += pokemon.type[i] + ", ";
        }
    }
    let responseString = `This is ${name}, they weigh ${weight} and stand ${height} tall. They are ${types} type.`
    return responseString;
}

const displayIndexPage = () => {
    let responseString = `Welcome to the online Pokedex!`;
    return responseString;
}

const listByType = (request, response) => {
    console.log('listing of type: ' + request.params.inputType);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        };
        const pokemonArray = obj.pokemon;
        const inputType = request.params.inputType.toLowerCase();
        const resultsArray = [];

        for (const pokemon of pokemonArray) {
            for (const type of pokemon.type) {
                if (type.toLowerCase() === inputType) {
                    console.log(`${pokemon.name} is of type ${type}.`)
                    resultsArray.push(pokemon);
                }
            }
        }

        console.log(resultsArray);

        if (resultsArray.length === 0) {
            console.log('not found type')
            response.status(401).send(`Error, ${inputType} not found!`);
            return;
        } else {
            let returnString = "";
            for (const pokemon of resultsArray) {
                returnString += pokemon.name + "\n";
            }
            response.send(returnString);
            return;
        }
    })
}

const listByWeakness = (request, response) => {
    console.log('listing of type: ' + request.params.inputType);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        };
        const pokemonArray = obj.pokemon;
        const inputWeakness = request.params.inputWeakness.toLowerCase();
        const resultsArray = [];

        for (const pokemon of pokemonArray) {
            for (const weakness of pokemon.weaknesses) {
                if (weakness.toLowerCase() === inputWeakness) {
                    console.log(`${pokemon.name} is weak to ${inputWeakness}.`)
                    resultsArray.push(pokemon);
                }
            }
        }

        console.log(resultsArray);

        if (resultsArray.length === 0) {
            console.log('not found weakness')
            response.status(401).send(`Error, ${inputWeakness} not found!`);
            return;
        } else {
            let returnString = "";
            for (const pokemon of resultsArray) {
                returnString += pokemon.name + "\n";
            }
            response.send(returnString);
            return;
        }
    })
}

/**
 * ===================================
 * Routes
 * ===================================
 */


// Display pokemon by name
app.get('/pokemon/:name', displayPokemon)

// Display index page
app.get('/pokemon/', (request, response) => {
    console.log('sending index page');
    response.send(displayIndexPage());
})

app.get('/type/:inputType', listByType);

app.get('/weaknesses/:inputWeakness', listByWeakness);

app.get('*', (request, response) => {
    // send response with some data (a string)
    response.send(`received something I don't understand: ${request}`);
});

// Making a change

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));