const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

jsonfile.readFile(file, function(err, obj) {
	let pokemonObj = obj.pokemon;

	app.get('/', (req, res) => {
		let welcome = '';
		let header = '<h1>Welcome to the online Pokedex!</h1>';
		let subheader = '<h2>We have 151 Pokemon in total!</h2>';
		let ulOpen = '<ul>';
		let ulClose = '</ul>';

		welcome = header + subheader + ulOpen;
		for (var i = 0; i < pokemonObj.length; i++) {
			welcome += `<li>${pokemonObj[i].name}</li>`;
		}

		welcome += ulClose

		res.send(welcome);
	})

	app.get('*', (req, res) => {
		var query = (req.path).split('/')[1];

		if (getPokemonData() !== undefined) {
			res.send(getPokemonData());
		} else {
			res.status(404);
			res.send(invalidPokemon());
		}
		

		function getPokemonData() {
			for (let i = 0; i < pokemonObj.length; i++) {
				if ( (pokemonObj[i].name).toLowerCase() === query.toLowerCase() ) {
					return (`${getPokemonImg()}<h1>${getPokemonName()}</h1> 
							<ul>
							<li>Weight: ${getPokemonWeight()}</li>
							<li>Height: ${getPokemonHeight()}</hi>
							</ul>`);
				}
			}
		}


		function getPokemonName() {
			for (let i = 0; i < pokemonObj.length; i++) {
				if ( (pokemonObj[i].name).toLowerCase() === query.toLowerCase() ) {
					return pokemonObj[i].name;
				}
			}
		}

		function getPokemonWeight() {
			for (let i = 0; i < pokemonObj.length; i++) {
				if ( (pokemonObj[i].name).toLowerCase() === query.toLowerCase() ) {
					return pokemonObj[i].weight;
				}
			}
		}

		function getPokemonHeight() {
			for (let i = 0; i < pokemonObj.length; i++) {
				if ( (pokemonObj[i].name).toLowerCase() === query.toLowerCase() ) {
					return pokemonObj[i].height;
				}
			}
		}

		function getPokemonImg() {
			for (let i = 0; i < pokemonObj.length; i++) {
				if ( (pokemonObj[i].name).toLowerCase() === query.toLowerCase() ) {
					return (`<img src = ${pokemonObj[i].img}>`);
				}
			}
		}


		function invalidPokemon() {
			return (`<h1>UNABLE TO FIND INFORMATION ABOUT ${query}.</h1><h1>IS THAT A NEW POKEMON? :O</h1>`);
		}


	  
	})
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


