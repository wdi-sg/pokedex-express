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

app.get('/:name', (request, response) => {
  // send response with some data (a string)
  // var requestPath = request.path;
  // var nameSearch = requestPath.replace('/','');

  jsonfile.readFile(file, (err,obj)=>{

      const pokemonObj = obj.pokemon;
      let resultName = [];
      let resultWeight = [];

    for (let i = 0; i < pokemonObj.length; i++){
        let pokemonName = pokemonObj[i];
        if (pokemonName.name === request.params.name){
            response.send(pokemonName.weight);
        }
       // resultName.push('<li>' + pokemonName + ': ' + pokemonWeight + '</li>');
    }
  }
  )
});


  //     var pokemonWeightFunc = () => {
  //       for (let i = 0; i < pokemon.length; i++){
  //           let pokemonWeight = pokemon[0].weight;
  //           resultWeight.push(pokemonWeight);

  //       }
  //       return resultWeight;
  //     }

  //     var makeHtmlPage = (name, weight) => {
  //       let weightPage = '<ul>' +  name + ": " + weight + '</ul>';
  //       let htmlPage = '<html><head></head><body><h1>' + 'Weight of pokemon is: ' + '</h1>' + weightPage + '</body></html>';
  //       return htmlPage;
  //     }

  //     response.send(makeHtmlPage(pokemonNameFunc(), pokemonWeightFunc()));
  // })



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




