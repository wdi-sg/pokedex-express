const express = require('express');
const handlebars = require('express-handlebars');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  // response.send(request.params.pokemon);
// });



  // send response with some data (a HTML file)
  let content = {};


  let pokedex = (request, response) => {
  	content.message = "Welcome to the online Pokedex!"
  	let pokeArray = [];
  	jsonfile.readFile(FILE, function(err, obj){
  		obj.pokemon.forEach(function(pkmn){
  			pokeArray.push(pkmn.name);
  		});
  	});
  	content.pokelist = pokeArray;
  	response.render('home', content);
  };

  app.get('/', pokedex);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
// when we get a request to requestLocation, do something
let requestLocation = '/names/:name';
const FILE = "pokedex.json";
//  handling my request

// Q2)
// let handleRequest = (request, response) => {

// 	 get my json from the file
// 	jsonfile.readFile(FILE, function(err, obj) {


// 		// deal with the request 
// 		let name = request.params.name;
// 		// obj is the podedex json file
// 		obj.pokemon.forEach(function(pkmn) {
// 			if (pkmn.name === name) {

// 				response.send(pkmn);
// 			}
// 		});

// 	});

//   response.render('home', context );
// };

// Q3)
// let handleRequest = (request, response) => {

// 	jsonfile.readFile(FILE, function(err, obj) {

// 		let name = request.params.name;
// 		obj.pokemon.forEach(function(pkmn){

// 			if(pkmn.name === name) {

// 				response.send(pkmn.weight)
// 			}
// 		});
// 	});
// };


// Q4)
let getNameWeight = (request, response) => {
	let name = request.params.name;
	jsonfile.readFile(FILE, function(err, obj) {
		obj.pokemon.forEach(function(pkmn){
			if(pkmn.name === name) {
				content.name = name,
				content.weight = pkmn.weight
			}
		});
		response.render('pkmn', content);

	});
}
app.get(requestLocation, getNameWeight);

// Further 1)
let handleRequest = (request, response) => {
	let name = request.params.name;
	jsonfile.readFile(FILE, function(err, obj) {
		obj.pokemon.forEach(function(pkmn){
			if(pkmn.name !== name) {
				content.message = "Could not find information about " + name + " - Is that a new pokemon? Gotta catch 'em all!";
				
			}
		});
		response.render('error', content);
	});
};
app.get(requestLocation, handleRequest);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



