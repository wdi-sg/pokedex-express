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
  var requestPath = request.path;
  var nameSearch = requestPath.replace('/','');

  jsonfile.readFile(file, (err,obj)=>{
      const pokemon = obj.pokemon;
      let resultName = [];
      let resultWeight = [];


      var pokemonWeight = () => {
        for (let i = 0; i < pokemon.length; i++){
            let pokemonName = pokemon[i].name;
            let pokemonWeight = pokemon[i].weight;
            resultName.push('<li>' + pokemonName + ': ' + pokemonWeight + '</li>');
        }
        return resultName;
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
