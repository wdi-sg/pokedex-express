const express = require('express');
const jsonfile = require('jsonfile');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// Init Pokedex.json
const pokedex = 'pokedex.json'

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {

  //Get request and remove '/' from request
  var requestFromUser = request.path;
  var nameWithoutSlash = requestFromUser.replace('/','');

	jsonfile.readFile(pokedex, (err, obj) => {

		function getPokemonName() {
			for (let i=0; i<obj.pokemon.length; i++) {
				let name = obj.pokemon[i].name;
				if (name.toLowerCase() == nameWithoutSlash.toLowerCase()) {
					return name;
				}
			}
		}

		function getPokemonWeight() {
			for (let i=0; i<obj.pokemon.length; i++) {
				let name = obj.pokemon[i].name;
				if (name.toLowerCase() == nameWithoutSlash.toLowerCase()) {
					let pokemonWeight = obj.pokemon[i].weight;
					return pokemonWeight;
				}
			}
		}

		var pokemonName = getPokemonName();
		var pokemonWeight = getPokemonWeight();

		function createPage(name, weight) {
			let heading = '<h1>' + name + '</h1>'
			let description = '<ul>' + "Weight: " + weight + '</ul>'
			let page = '<html> <body>' + heading + description + '</body> </html>'
			return page;
		}

		function invalidPokemon() {
			let description = "<p>" + "Could not find information about " + nameWithoutSlash + ". Is that a new pokemon? Gotta catch em' all!" + "</p>"
			let page = '<html> <body>' + description + '</body> </html>'
			return page;
		}

		//Sends respond back on condition. 
		if(getPokemonName() != undefined) {
			response.send(createPage(pokemonName, pokemonWeight));
		} else {
			response.status(404);
			response.send(invalidPokemon());
		}

	})
 	
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
