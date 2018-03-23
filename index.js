const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
// const pokemonFile = 'pokedex.json';

const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

// Qns1: Return a string response "Welcome to the online Pokedex!" when a request for the root route (/) is received
// app.get(('/'), function(request, response) {
// 	response.send('Welcome to the online Pokedex!')
// });

// Qns2: Return a string response with the requested pokemon's information when a request comes with matching the route /names/:name (eg. localhost:3000/names/Bulbasaur should show Bulbasaur's information - for now, show only its weight value)
// app.get('/names/:name', (request, response) => {
// 	jsonfile.readFile(FILE, function(err,obj) {
	
// 	var PokemonWeight;
// 	var PokemonName = request.params.name;
// 	var item = obj["pokemon"];
// 		for(i=0; i < item.length; i++) {
// 			if(item[i]["name"] == PokemonName) {
// 				var PokemonWeight = item[i]["weight"];
// 				response.send(PokemonWeight);
// 			}
// 		}
// 	});
// });

// Qns3: Modify your response for /names/:name to return a HTML page (instead of just a string) with a h1 tag that displays the name of the pokemon being requested, and a ul displaying its weight (eg. "Weight: 10 kg")
// app.get('/names/:name', (request, response) => {
// 	jsonfile.readFile(FILE, function(err,obj) {
// 		var PokemonName = request.params.name;
// 		var item = obj["pokemon"];
// 			for(i=0; i < item.length; i++) {
// 				if(item[i]["name"] == PokemonName) {
// 					var PokemonWeight = item[i]["weight"];
// 				};
// 				}
// 				var context = {
// 						PokemonName: PokemonName,
// 						PokemonWeight: PokemonWeight			
// 	};
// 	response.render('home', context);
// });
// });

// Qns4: 
// app.get('/names/:name', (request, response) => {
// 	jsonfile.readFile(FILE, function(err,obj) {
// 		var PokemonName = request.params.name;
// 		var item = obj["pokemon"];
// 			for(i=0; i < item.length; i++) {
// 				if(item[i]["name"] !== PokemonName) {
// 					var PokemonWeight = ["Pokemon not found"];
// 				}
// 	}
// 	var context = {
// 		PokemonName: PokemonName,
// 		PokemonWeight: PokemonWeight
// 	};
// 	response.render('invalidname', context);
// });
// });

// Qns5:
app.get('/', (request, response) => {
	jsonfile.readFile(FILE, function(err,obj) {
		var item = obj.pokemon;
		var PokemonList = [];
			for(i=0; i < item.length; i++) {
				PokemonList.push(item[i]["name"]);
			}
			var context = {
				PokemonList: PokemonList
			};
			response.render('list', context);
	});
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));