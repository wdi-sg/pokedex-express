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

/**
 * ===================================
 * Routes
 * ===================================
 */

jsonfile.readFile(file, (err, obj) => {
    app.get('/:name', (request, response) => {
        for (var i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === request.params.name) {
                response.send(obj.pokemon[i].weight)
            }
        }
        response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
    });

    app.get('/type/:sometype',(request, response) => {
        var typeList = '';
        for (var i = 0; i < obj.pokemon.length; i++) {
            for (var r = 0; r < obj.pokemon[i].type.length; r++) {
                if (obj.pokemon[i].type[r].toLowerCase() === request.params.sometype) {
                    typeList += (obj.pokemon[i].name + "<br>");
                    // response.send(obj.pokemon[i].name);
                }
            }
        }
        response.send("List of " + request.params.sometype + " Pokemon Type: <br>" + typeList)
    });

    app.get('/weaknesses/:someweakness',(request, response) => {
        var typeList = '';
        for (var i = 0; i < obj.pokemon.length; i++) {
            for (var r = 0; r < obj.pokemon[i].weaknesses.length; r++) {
                if (obj.pokemon[i].weaknesses[r].toLowerCase() === request.params.someweakness) {
                    typeList += (obj.pokemon[i].name + "<br>");
                    // response.send(obj.pokemon[i].name);
                }
            }
        }
        response.send("List of Pokemons with " + request.params.someweakness + " type weakness: <br>" + typeList)
    });





        app.get('/nextevolution/:somename',(request, response) => {
            for (var i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].include()) {

                }
            }
            response.send("List of Pokemons with " + request.params.someweakness + " type weakness: <br>" + typeList)
        });

});

app.get('/', (request, response) => {
  response.send('"Welcome to the online Pokdex!"')
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
