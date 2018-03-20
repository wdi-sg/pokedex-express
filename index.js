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

const FILE = 'pokedex.json'

// I'm exploiting the fact that the data here is static by reading them all into global variables first. Yeah the data could change at runtime, but fixing that's just a matter of moving the block here down into the callback.
let pokedata = {}, creatures = [];
jsonfile.readFile(FILE, function (err, obj) {
	let tmp = obj["pokemon"];
	tmp.forEach(function(pokemon) {
		pokedata[pokemon.name.toLowerCase()] = pokemon
	});
	creatures = Object.keys(pokedata);
})


let requestLocation = '/*';

let handleRequest = function (request, response) {
  let input = request.params[0].split('/');

  switch(input[0]){
	case '':
		response.render('home', {pokemans: creatures});
		break;
	case 'names':
		let creature = pokedata[input[1].toLowerCase()];
		if (creature == undefined) {
			response.render('invalid', {requested: input[1]})
		} else {
			response.render('singleresult', creature)
		}
		break;
	case 'types':
		let type = input[1];
		let result = [];
		result = creatures.filter(function(creature){
			return pokedata[creature]["type"].includes(type)
		})
		response.render('types', {type: input[1], creatures: result});
		break;
	default:
		response.send(pokedata);
		break;
  }
	
  
}

app.get(requestLocation, handleRequest);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
