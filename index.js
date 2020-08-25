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

 jsonfile.readFile(file, (err, obj) => {

   app.get('/pokemon/:name', (req, res, next) => {
    // Define the params to listen to
    let name = req.params.name;
    // let pokemonName = name.charAt(0).toUpperCase() + name.slice(1)
    // look inside pokedex.json

    let pokemon = obj.pokemon;
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toLowerCase() === name) {
            let data = {
                "name":   name,
                "weight": pokemon[i].weight
            }
            return res.send(`${data.name}'s weight is ${data.weight}`);
        } else {
            res.status(404).send(`Could not find information about ${name} - Is that a new pokemon? Gotta catch em' all!`)
        }
    };
})



   app.get('/', (req, res) => {
        res.send(`Welcome to the online Pokedex!`)
   })


})



//${req.params.name}
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));