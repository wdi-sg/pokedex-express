//declaring global docs and required modules
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json'
var result = {};	

//read file function
jsonfile.readFile(pokedex, (err, obj) => {
	
	// loops through the length of the pokemon file  	
 	for (let i = 0; i<obj.pokemon.length; i++) {
		
 		//pulls out the names and sets it to variable
		let pokeName = (obj.pokemon[i].name);
		
		//pulls out the weight and sets it to variable
		let pokeWeight = (obj.pokemon[i].weight);
		
		//pushes the name and weight as key and values into results object
		result[pokeName] = pokeWeight;

 	}
	

	app.get('*', (request, response) => {
	
		//remove the slash from the request path and make first letter uppercase so it can compare with object
		let route = request.path
		let routeWithoutSlash = route.substring(1);
		let compare = routeWithoutSlash.charAt(0).toUpperCase() + routeWithoutSlash.slice(1);

		//if request path is in the object then send the name of it, if not say 'not here'
		if (result.hasOwnProperty(compare) === true) {
			response.send(result[compare]);
		} else { 
			response.send('Not here')
		}

	});
})

	app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
