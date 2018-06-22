const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

let pokemonData = [];

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
  // response.send(request.path);

  // need to remove the slash in request.path
  function removeSlash() {
  	var str = request.path;
  	if(str.charAt(0) == '/') {
  		str = str.substring(1);
  	}
  	// console.log(str);
  	return str;
  };

  var pokemonName = removeSlash();

  // console.log(pokemonName)

  jsonfile.readFile(file, (err, obj) => {

  // add pokemon names to pokemonData
  for (let i = 0; i < obj.pokemon.length; i++) {
  	pokemonData[obj.pokemon[i].name] = "";
  }

  let search = true;

  function pokemonSearch() {
	  for (let i = 0; i < obj.pokemon.length; i++) {
	  	if (pokemonName == obj.pokemon[i].name.toLowerCase()) {
	  		search = false;
	  		response.send('<html><body><h1>' + obj.pokemon[i].name + '</h1><ul><ol>Weight: ' + obj.pokemon[i].weight + '</ol></ul></body></html>');
	  		return;
	  	} 
	  }

	  if (search = true) {
			response.status(404);
			response.send('<html><body><p>Could not find information about ' + pokemonName + " - Is that a new pokemon? Gotta catch em' all! </p></body></html>");
			return;
	  }

	}
	pokemonSearch();
	// console.log(obj.pokemon[2].name); 
});
  	// must be Object.keys instead of object.keys
  	// console.log(Object.keys(pokemonData));


  	// function invalid() {
  	// 	let pokeName = Object.keys(pokemonData);
  	// 	for (let i = 0; i <pokeName.length; i++) {
  	// 		if (pokemonName !== pokeName[i]) {
  	// 			response.status(404);
  	// 			response.send('<html><body><p>Could not find information about ' + pokemonName + " - Is that a new pokemon? Gotta catch em' all! </p></body></html>");
  	// 		}
  	// 	}
  	// };

  	// invalid();




});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
