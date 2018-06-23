const express = require('express');

const myjsonfile = require('jsonfile');

const pokedex = "./pokedex.json";

const app = express();

app.get('/', (req, res) => {

	myjsonfile.readFile(pokedex, (err, obj) => {

			let result = [];

			let header = '<h1>Welcome to the online Pokedex!</h1>';
			let subheader = '<h2>We have 151 Pokemon in total!</h2>';
			let openUL = '<ul>';
			let closeUL = '</ul>';

			result.push(header, subheader, openUL);  // push h1, h2 and openUL into array.

			let pokemonList = obj.pokemon

			for(let i=0; i<pokemonList; i++) {
				let selectPokemon = pokemonList[i];
				let pokemonName = selectPokemon.name;

				result.push('<li>' + pokemonName + '</li>') //creates list for every pokemon in pokemonList array.
			};

			result.push(closeUL);
			let display = result.join('');

			res.send(display); //joins all elements in array into a string.
	});
});

app.get('*', (req, res) => {

	const PATH_REQ = req.path
	let splitPath = PATH_REQ.split('/'); // split string into an array.
	let lastParam = splitPath[splitPath.length -1]; 
	
	myjsonfile.readFile(pokedex, (err, obj) => {

		let pokemonList = obj.pokemon;

		for(let i=0; i<pokemonList.length; i++) {

			if(lastParam.toLowerCase() === pokemonList[i].name.toLowerCase()) {

				let pokemonName = '<h1>' + pokemonList[i].name + '</h1>';	// display pokemone name
				let propertiesArr = [];

				for(keys in pokemonList[i]) {
					let properties = '<li>' + pokemonList[i][keys] + '</li>';
						propertiesArr.push(properties);
					// if(keys === 'prev_evolution' || keys === 'next_evolution') {
					// 	for(j=0; j<)
					// }

					}
				res.send(pokemonName + '<ul>' + propertiesArr.join('')) + '</ul>'
			};
		};
	})
});




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Note: HTTP comms protocol : 1 request => 1 response
// app.get("*", (request,response) => {
// 			response.send(...);
//			response.send(...); ----> does not work
//			})