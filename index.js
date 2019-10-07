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

// load up the json file wth the pokemon
 jsonfile.readFile(file, (err, obj) => {

  // console.log(obj.pokemon[0]);
 console.log(obj.pokemon[0].name)
// then wait for input from the user
getUserInput();
// then send the needed by the user.

});



const getUserInput = function (){
	app.get("/pokemon/:i", (request, response) => {
	// (0°C × 9/5) + 32 = 32°F
	console.log(request.params.i);
	  response.send(request.params.i)
	});

	app.listen(3090);

}

const findInObject = function () {

	 console.log(obj.pokemon[0].name)

	}

