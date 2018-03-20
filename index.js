var jsonfile = require('jsonfile')
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

const FILE = 'pokedex.json'

app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

let requestLocation = '/:name';
let requestLocationTwo = '/names/:pokemon'
let handleRequest = (request, response) => {
	jsonfile.readFile(FILE, function(err, obj) {

		let name = request.params.name;
		response.send(obj.pokemon[0]);
	});
};
app.get(requestLocation, handleRequest);

let handleRequestTwo = (request, response) => {
	jsonfile.readFile(FILE, function(err, obj){
		let pokemon = request.params.pokemon;
		let pokemonFound = 0;
		for(var i = 0; i < obj.pokemon.length; i++){
			var selectedName = obj.pokemon[i].name.toLowerCase();
			if(request.params.pokemon === selectedName){
				pokemonFound = 1;
				var context = {
					"name" : obj.pokemon[i].name,
					"weight" : obj.pokemon[i].weight
				}
				response.render('home', context);
			}
		}

		if(pokemonFound === 0){
			var context = {
					"alert": "Could not find information about " + request.params.pokemon + ". Is that a new pokemon? Gotta catch em' all!" 
				}
				response.render('home', context);
		}
	})
}
app.get(requestLocationTwo, handleRequestTwo);

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  response.render('home');
});

app.listen(3500, () => console.log('~~~ Tuning in to the waves of port 3500 ~~~'));
