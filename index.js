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

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

app.get("/pokedex/:name", (request, response) => {
	jsonfile.readFile(file, (err, list) => {
		let pokemonFound = false;
		for (let i=0; i < list.pokemon.length; i++) {
			if (list.pokemon[i].name.toLowerCase() === request.params.name) {
				pokemonFound = true;
				response.send(list.pokemon[i].name + " is " + list.pokemon[i].weight);
			}
		}
	})
});

app.get("/pokedex", (request, response) => {
	response.send("Welcome to the online pokedex!");
})

app.get("/type/:someType", (requst, response) => {
	var inputType = request.params.someType.charAt(0).toUpperCase()+resquest.params.someType.slice(1);	
		jsonfile.readFile(file (err, list) => {
			var listType = [];
			for (let i=0; i<list.pokemon.length; i++) {
				if (list.pokemon[i].type.includes(inputType) > 0) {
					listType.push(list.pokemon[i].name);
				}
			}
			if (listType.length > 0) {
				response.send(listType);
			} else {
				response.send(404, "Could not find information about" + inputType + " - Is that a new pokemon? Gotta catch em' all!")
		}
	});
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
