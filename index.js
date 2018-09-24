const express = require('express');
const jsonfile = require('jsonfile');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const file = 'pokedex.json';

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err,obj)=>{
      const pokemon = obj.pokemon;

      var pokemonWeight = () => {
        for (let i = 0; i < pokemon.length; i++){
            return pokemon[i].weight;
        }
      }

      var makeHtmlPage = (weight) => {
        let weightPage = '<ul>' + 'Weight of pokemon is: ' + weight + '</ul>';
        let htmlPage = '<html><head></head><body>' + weightPage + '</body></html>';
        return htmlPage;
      }

      response.send(makeHtmlPage(pokemonWeight()));
  })

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
