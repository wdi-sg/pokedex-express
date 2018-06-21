//declaring global docs and required modules
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json'
var result = {};	 
var ulList = '';

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
		
		//adds each pokemon between li tags so it can be plugged into the HTML variable later
		ulList += '<li>'+pokeName+'</li>'

 	}


	app.get('*', (request, response) => {
	
		//remove the slash from the request path and make first letter uppercase so it can compare with object
		let route = request.path
		let routeWithoutSlash = route.substring(1);
		let compare = routeWithoutSlash.charAt(0).toUpperCase() + routeWithoutSlash.slice(1);
		let bodyTags = '<head><title>Look at all them Pokemans!</title><head><body><h1>Welcome to the online Pokerdex!</h1><h2>Woulda look at that, pokermons. Just look at em. They everywhere.</h2><ul>' + ulList + '</ul></body>'

		//if request path is in the object 
		if (result.hasOwnProperty(compare) === true) {

		//then send the weight of the pokemon
			response.send(result[compare]);

		//or if the result path is empty
		} else if (routeWithoutSlash === '') {
		
		//show H1 tag and ul tag 
			response.send(bodyTags);

		} else { 
			response.send('Not here')
		}
	});
})

	app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
