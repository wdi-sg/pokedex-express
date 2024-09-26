const express = require('express');
const pokedex = require('./pokedex.json');

// const jsonfile = require('jsonfile');

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


app.get('/:word', (request, response) => {
  // send response with some data (a string)
  // pokemon.forEach(function(name, i) {

  // })
  for (i= 0; i< pokedex.pokemon.length; i++)
  	if (word = pokedex.pokemon[i].name) {

  	response.send(pokedex.pokemon[i].weight);	
  	}
  
});


 


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
console.log(pokedex.pokemon[0].name);
// listening = () => console.log("listening");









// app.get('/', (request, response) => {
//   response.send('hello brian');
//   console.log(request.status)
// });

// app.get("/greet/:name/:lastname/*", (request, response) => {
//   response.send("Hello " + request.params.name + " " + request.params.lastname)
// });

// app.listen(3000)