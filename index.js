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

app.get('*', (request, response) => {
	// send response with some data (a string)
	if (request.path == '/') {
		response.send(listPokemons());
	} else {
		let pokeName = request.path.substring(1).toLowerCase(); // using substring(1) gets rid of the slash in request.path. index(0) is dropped.
		let pokemon = findPokemon(pokeName);
		if (pokemon == undefined) {
			response.status(404);
			response.send('<html><body><p>Could not find information about ' + pokeName + ' - Is that a new pokemon? Gotta catch em\' all!<p/></body></html>');
		} else {
			response.send(pokemonDetails(pokemon));
		}
	}	
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
};

var findPokemonNameWeight = (pokemon) => {
	return ('<html><body><h1>' + pokemon.name + '</h1><ul>' + pokemon.weight + '</ul></body></html>');
};

var pokemonDetails = (pokemon) => {
	let htmlString = '<html><body><h1>' + pokemon.name + '</h1><ul>';
	let keys = Object.keys(pokemon); // The Object.keys() method returns an array of a given object's property names
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		let value = JSON.stringify(pokemon[key]);
		let itemString = '<li>' + key + ':' + value + '</li>';
		htmlString = htmlString + itemString; // append all the <ul>s 1 by 1 to the html
	}
	htmlString = htmlString + '</ul></body></html>';
	return htmlString;
};

// detect if the user didn't put anthing in the path. 
 // Return a HTML page with a h1 tag saying "Welcome to the online Pokdex!" 
 // and a ul displaying all the pokemon that exist in the pokedex
var listPokemons = () => {
	let htmlString = '<html><body><h1>Welcome to the online Pokdex!</h1>';
	let pokeArr = pokedex.pokemon;
	for (var i = 0; i < pokeArr.length; i++) {
		let ul = '<ul>' + pokeArr[i].name + '</ul>';
		htmlString = htmlString + ul;	
	}
	htmlString = htmlString + '</body></html>';
	return htmlString;
};

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the pika pika waves of port 3000 ~~~'));


// Write your solutions below

jsonfile.readFile(fileName, function(err, obj) {                                      
    if (err == undefined) { 
    	pokedex = obj;
    } else {
        console.error(err);
    }

});
