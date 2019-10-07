const express = require('express');
// Init express app
const app = express();
// const jsonfile = require('jsonfile');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const obj={};
// load up the json file wth the pokemon
 jsonfile.readFile(file, (err, obj) => {
	  // console.log(obj.pokemon[0]);
	// console.log(obj.pokemon[0].name)
	// then wait for input from the user
	// then send the needed by the user.
	app.get("/pokemon/:name", (request, response) => {
 	let upperCaseName = request.params.name.charAt(0).toUpperCase() + request.params.name.slice(1)
	console.log(upperCaseName);

/// loop through the pokemon object and match the name
	 for (let i = 0; i < obj.pokemon.length; i++) {
	 	if (obj.pokemon[i].name === upperCaseName) {
	 		console.log(upperCaseName)
// display the info!
	  response.send(upperCaseName + obj.pokemon[i].height)
	 	} 

	 }


	});

	app.listen(3090);
	});







