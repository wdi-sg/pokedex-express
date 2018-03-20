var jsonfile = require('jsonfile');
// require the express library
const express = require('express');
const handlebars = require('express-handlebars');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app; create an instance of the library app server
const app = express();

const FILE = "pokedex.json";

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// default page content
//======================
app.get('/', function(request, response) {
	let content = {
		message: "Welcome to the online Pokedex!",
		}
	response.render('home', content);
});

// when we get a request to requestLocation, do something
let requestLocation = '/names/:name';
let requestHome = '/home'

// handling user input request
//=============================
let handleRequest = (request, response) => {
	// get my json from the file
	jsonfile.readFile(FILE, function(err, obj) {
		
		// name for pokemon
		let itemList = obj.pokemon;
		// deal with the request 
		let name = request.params.name;
		let pokemonFound = 0;

		for(let i=0; i<itemList.length; i++) {
			if(name === itemList[i].name) {
				pokemonFound = 1;
				let content = {
					name: itemList[i].name,
					weight: "Weight: " + itemList[i].weight
				};
				response.render('home', content);
				pokemonFound = 1;
			}
		}
		if (pokemonFound === 0) {
			let error = {
				errorMessage: "Could not find information about " + name + " - Is that a new pokemon? Gotta catch em' all!"
			};
			response.render('home', error);
		}
	});
};

// home page
//===========
let goBackHome = (request, response) => {
	jsonfile.readFile(FILE, function(err, obj) {
		let itemList = obj.pokemon;
		let pokemonArray = [];

		for(let i=0; i<itemList.length; i++) {
			pokemonArray.push(itemList[i].name);
		};
		
		let allPokemon = {
			allPokemonName: pokemonArray
		};

		response.render('home', allPokemon);
		// response.send(obj);
	});
}

app.get(requestLocation, handleRequest);
app.get(requestHome, goBackHome);

/*
app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  response.send(request.params.pokemon);
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  response.render('home');
});
*/

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
