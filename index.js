const jsonfile = require('jsonfile');
const express = require('express');
const handlebars = require('express-handlebars');
const FILE = 'pokedex.json';

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

 //when we get a request to requestLocation, do something
 let requestLocation = '/:name';


//handling my request
let handleRequest = (request, response) => {

	//get my json from the file
	jsonfile.readFile(FILE, (err, obj) => {

		//deal with the request
		let name = request.params.name;

		//obj is the pokedex.json file
		var pokemons = obj.pokemon;

		let content = {}
		let canFind = false;
		let weigh = [];
		for (let index in pokemons) {
			if (pokemons[index].name === name){
				content.name = pokemons[index].name;
				weigh.push(pokemons[index].weight);
				content.weight = weigh;
				response.render('home', content);
				canFind = true;
			}

			if (canFind === false) {
				content.msg = "Could not find information about " + name + " - Is that a new pokemon? Gotta catch em' all!";
				response.render('notFound', content);
			}
		}

	});
};

app.get('/', (request, response) => {
	let nameList = [];
	jsonfile.readFile(FILE, (err, obj) => {
	
		for (var i = 0; i < obj.pokemon.length; i++) {
			nameList.push(obj.pokemon[i].name);
		}
	});

	let content = {
		title: "Welcome to the online Pokedex!",
		weight: nameList
	};
	// send response with some data (a HTML file)
	response.render('home', content);
});

	app.get(requestLocation, handleRequest);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */ 
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
