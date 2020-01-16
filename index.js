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

app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(file, (err, obj) => {
    var matchName = false;//for status 404
    var pokeIndex; 
    for (let i=0; i<obj.pokemon.length; i++ ){
        
        if (obj.pokemon[i].name === request.params.name) {
            matchName = true;
            pokeIndex = i;
        }
    }
    if (matchName === true) {
            console.log('Pokemon name is: ' + obj.pokemon[pokeIndex].name);
            response.send(`This is: ${obj.pokemon[pokeIndex].name}. His weight is: ${obj.pokemon[pokeIndex].weight}. His height is: ${obj.pokemon[pokeIndex].height}.`);//${} must be accompanied by backticks
        }
        else {
          response.status(404).send("Could not find information about " + (request.params.name) + "- Is that a new pokemon? Gotta catch em' all!" );
        }

  });
});
  // send response with some data (a string)
  app.get('/', (request, response) => {
    response.send('Welcome to the online pokedex!')
  });

  app.get('/type/:some_type', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
      let matchType = [];//array vs obj 
      for (let i=0; i<obj.pokemon.length; i++ ){
          let currentType = obj.pokemon[i].type;// calling for current pokemon selected ie pokemon[i]. assign current pokemon type into an array
          if (currentType.includes(request.params.some_type) === true) {//if type input in the browser includes any of the array index, . includes returns a value of true
              matchType.push(obj.pokemon[i].name);//insert current string as the last item in the array
          }
      }
      response.send(matchType);//always put it outside the "for loop" to prevent errors
    });
  });
  //Below doesn't work yet
  app.get('/weaknesses/:some_weakness', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
      let matchWeak = [];
      for (let i=0; i<obj.pokemon.length; i++ ){
          let currentWeak = obj.pokemon[i].weaknesses;
          if (currentWeak.includes(request.params.some_weakness) === true) {
              matchWeak.push(obj.pokemon[i].name);
          }
      }
      response.send(matchWeak);
    });
  });
  
  app.get('/next_evolution/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
      let matchEvolve = {}; 
      for (let i=0; i<obj.pokemon.length; i++ ){
        let currentEvolve = obj.pokemon[i].next_evolution;
        console.log("evolve");
        for (let i=0; i<(obj.pokemon.next_evolution).length; i++);
          if (currentEvolve.includes(request.params.next_evolution) === true) {
              matchEvolve.push(Array.pokemon[i].name);
          }
      }
      response.send(name);
    });
  });
 /* ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
