const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

// HOME PAGE / INITIAL
app.get('/', (req, res) => {
  // send response with some data (a string)
  res.send(`<h1>Welcome to the online Pokedex!</h1>`);
});

// POKEMON NAME AND DETAILS
app.get('/pokemon/:name', (req, res) => {

    let i = 0;

    jsonfile.readFile( file, (err, obj) => {
        let pokemon = obj.pokemon;
        pokemon.forEach( pokemon => {
            if ( pokemon.name.toLowerCase() == req.params.name ) {
                i++;
                res.send(`This is ${pokemon.name}. He weighs ${pokemon.weight}, and is ${pokemon.height} tall.`);
            }
        })

        if ( i == 0 ) {
            res.status(404).send(`Could not find information about ${req.params.name} - Is that a new pokemon? Gotta catch em' all!`)
        }
    })
})

// POKEMON TYPE
app.get('/type/:userInput', (req, res) => {

    let allType = [];

    jsonfile.readFile( file, (err, obj) => {

        let pokemon = obj.pokemon;
        let userInput = req.params.userInput

        pokemon.forEach( item => {
            let pokemonName = item.name;
            let pokemonType = item.type;

            pokemonType.forEach( type => {
                if ( type.toLowerCase() == userInput.toLowerCase() ) {
                    allType.push(pokemonName);
                }
            })
        })

        res.send(allType);
    })
})

// POKEMON WEAKNESSES
app.get('/weaknesses/:userInput', (req, res) => {

    let allWeaknesses = [];

    jsonfile.readFile( file, (err, obj) => {

        let pokemon = obj.pokemon;
        let userInput = req.params.userInput

        pokemon.forEach( item => {
            let pokemonName = item.name;
            let pokemonWeaknesses = item.weaknesses;

            pokemonWeaknesses.forEach( weakness => {
                if ( weakness.toLowerCase() == userInput.toLowerCase() ) {
                    allWeaknesses.push(pokemonName);
                }
            })
        })

        res.send(allWeaknesses);
    })
})


// NEXT EVOLUTION
app.get('/nextevolution/:userInput', (req, res) => {

    let nextEvolution = [];

    jsonfile.readFile( file, (err, obj) => {

        let i = 0;

        let pokemon = obj.pokemon;
        let userInput = req.params.userInput

        pokemon.forEach( item => {

            let pokemonName = item.name;

            let nextEvo = item.next_evolution;

            if ( pokemonName.toLowerCase() == userInput.toLowerCase() ) {
                i++;
            }

            if ( nextEvo === undefined ) {
                return;
            }

            if ( pokemonName.toLowerCase() == userInput.toLowerCase() ) {

                nextEvo.forEach( item => {
                    nextEvolution.push(item.name);
                })
            }

        })

        if ( nextEvolution.length == 0 && i == 1 ) {
            res.send('max evolution achieved');
        }

        else if ( i == 0 ) {
            res.send('no such pokemon');
        }

        else {
            res.send(nextEvolution);
        }
    })
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen('3000', () => {
    console.log('~~~ Tuning in to the waves of port 3000 ~~~')
});