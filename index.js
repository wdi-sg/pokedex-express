const express = require('express');

const jsonfile = require('jsonfile');

const fileName = 'pokedex.json';

var pokedex;

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

 // Modify your response for /some-name to return a HTML page (instead of just a string) with a h1 tag 
 // that displays the name of the pokemon being requested, and a ul displaying its weight (eg. "Weight: 10 kg")

app.get('*', (request, response) => {
	// send response with some data (a string)
	let pokeName = request.path.substring(1).toLowerCase(); // using substring(1) gets rid of the slash in request.path. index(0) is dropped.
	let pokemon = findPokemon(pokeName);
	response.send(findPokemonNameWeight(pokemon));
});

var findPokemon = (pokemon) => {
	let pokeArr = pokedex.pokemon;
	for (var i = 0; i < pokeArr.length; i++) {
		let poke = pokeArr[i];
		if (pokemon == poke.name.toLowerCase()) {
			return poke;
		}
	}
	return undefined;
}

var findPokemonNameWeight = (pokemon) => {
	return ('<html><body><h1>' + pokemon.name + '</h1><ul>' + pokemon.weight + '</ul></body></html>');
}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


// Write your solutions below

jsonfile.readFile(fileName, function(err, obj) {                                      
    if (err == undefined) { 
    	pokedex = obj;
    } else {
        console.error(err);
    }

});
