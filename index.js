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

app.get('*', (request, response) => {

	var searchedPokemon = request.path

	var pokemon;

	jsonfile.readFile(file, (err, obj) => {

		let search = []
		
		for (var i = 0; i < obj.pokemon.length; i ++) {
    		if ('/' + obj.pokemon[i].name == searchedPokemon) {  		
    		var heading = '<h1>' + obj.pokemon[i].name + '</h1>'
    		var	description = '<ul>' + 'Weight: '+ obj.pokemon[i].weight + '</ul>'
    		search.push('<html> <body>' + heading + description + '</body> </html>');
 
    		}
  		}

  		if (search.length == 1) {
  		response.send(result.join());
  		
  		}

  		if (search.length < 1) {
  		response.status(404).send("<p>Could not find information about </p> " + searchedPokemon + " <p> Is that a new pokemon? Gotta catch em' all! </p>")
  		}
  				
	})
  // send response with some data (a string)
  //response.send(pokemon);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));









