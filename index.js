const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();


// Identify pokemon by name
app.get('/:pokemon', (request, response) => {
    let pokemonName = request.params.pokemon;
    jsonfile.readFile(file, (err, obj) => {
        for ( let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase()=== pokemonName.toLowerCase()){

                let pokeWeight = obj.pokemon[i].weight;
                let pokeHeight = obj.pokemon[i].height;
                // let pokeCandy = obj.pokemon[i].candy;
                // let pokeEvolve = obj.pokemon[i].next_evolution.name;

                response.send( pokemonName + "height is" + pokeWeight + "weight is" + pokeHeight );

            } else {
                response.send( "No Pokemon" );
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