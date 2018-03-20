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

let content = {};

//handling my request
let handleRequest = (request, response) => {

	//get my json from the file
	jsonfile.readFile(FILE, (err, obj) => {

		//deal with the request
		let name = request.params.name;

		//obj is the pokedex.json file
		var pokemons = obj.pokemon;

		
		let canFind = false;
		for (let index in pokemons) {
			if (pokemons[index].name === name){
				content.name = pokemons[index].name;
				content.id = pokemons[index].id;
				content.num = pokemons[index].num;
				content.type = pokemons[index].type;
				content.img = pokemons[index].img;
				content.height = pokemons[index].height;
				content.weight = pokemons[index].weight;
				content.candy = pokemons[index].candy;
				content.candy_count = pokemons[index].candy_count;
				content.egg = pokemons[index].egg;
				content.spawn_chance = pokemons[index].spawn_chance;
				content.avg_spawn = pokemons[index].avg_spawn;
				content.spawn_time = pokemons[index].spawn_time;
				content.multipliers = pokemons[index].multipliers;
				content.weakness = pokemons[index].weakness;
				content.next_evolution = pokemons[index].next_evolution;

				response.render('pokepage', content);
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
	
		for (let i = 0; i < obj.pokemon.length; i++) {
			nameList.push(obj.pokemon[i].name);
		}
	});
	content.title = "Welcome to the online Pokedex!";
	content.weight = nameList;
	
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
