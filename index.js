const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// Init express app
const app = express();

var responseCallback = (request, response) => {
	// response.send('hi');

	jsonfile.readFile(file, (err, obj) => {

		var pokemon = obj.pokemon;

		for (var i = 0; i < pokemon.length; i++) {

			var pathName = '/' + pokemon[i].name;

			if (request.path == pathName) {

				response.send(pokemon[i].name);

			};
		
		};

	});

};


app.get('*', responseCallback);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
