const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// Init express app
const app = express();


var getType = (request, response) => {
	
	// app.get('/type/:types', getType)
	// :type is a parameter
	// localhost:3000/type/grass   ;   grass is basically the argument
	// request.params.types --------> output: grass

	jsonfile.readFile(file, (err, obj) => {

		var pokemon = obj.pokemon;

		// empty array to push all the pokemon names that meets the condition
		var pokemonTypeList = [];

		// runs through all the pokemons
		for (let i = 0; i < pokemon.length; i++) {

			// cause type is an array, so need to run through all the items in the type array
			for (let j = 0; j < pokemon[i].type.length; j++) {

				// checking the condition, need to lowercase just in case
				if (pokemon[i].type[j].toLowerCase() == request.params.types.toLowerCase()) {

					// if matches then set it in <li> tag
					let item = '<li>' + pokemon[i].name + '</li>'

					// then push it into the empty array
					pokemonTypeList.push(item)
				};
			}

		}

		// sends the response and set the array as an unordered list
		response.send('<ul>' + pokemonTypeList.join('') + '</ul>');
	});	
};

// NOTE:
// app.get("/greet/:name/:lastname", function(req, res) {
//   res.send("Hello " + req.params.name + " " + req.params.lastname)
// });
// //Hello jodi choo


var responseCallback = (request, response) => {

	// removes / from response.path; Bulbasaur instead of /Bulbasaur
	var pathItem = request.path.slice(1);

	jsonfile.readFile(file, (err, obj) => {

		// simplify the object
		var pokemon = obj.pokemon;

		// runs through object to find the matching pokemon name
		for (let i = 0; i < pokemon.length; i++) {

			// if the pathItem matches the name
			if (pathItem.toLowerCase() === pokemon[i].name.toLowerCase()) {

				// sets the items to send
				let pokemonName = '<h1>' + pokemon[i].name + '</h1>';
				let allProperties = [];
				for ( let property in pokemon[i]) {
					let item = '<li>' + property + ': ' + pokemon[i][property] + '</li>';
					allProperties.push(item);
				}

				// sends the response
				response.send(pokemonName + '<ul>' + allProperties.join('') + '</ul>');

				// must return to stop the goddamn function
				// response.send('wait')
				return;
			} 

		}

		if (pathItem == '') {

			// all pokemon
			let welcome = "<h1>Welcome to the online PokèDex!</h1>";

			// empty array to push all pokemon names
			let allPokemon = [];

			for (var i = 0; i < pokemon.length; i++) {

				// sets all the pokemon name inside an <li> tag
				allPokemon.push('<li>' + pokemon[i].name + '</li>')
			};

			// put the array inside a <ul> tag
			let pokemonList = '<ul>' + allPokemon.join('') + '</ul>';    // join('') removes the commas
			
			response.send(welcome + pokemonList); 


		} else if (pathItem) {
			
			// sets error status
			response.status(404);
			
			// what should be displayed
			var errorMessage = "Could not find information about " + pathItem + " - Is that a new pokemon? Gotta catch em' all!"
			
			// sends the response
			response.send('<p>' + errorMessage + '</p>');

		}

	})

};

app.get('/type/:types', getType);
// :types is a parameter (can be called anything. Used in the function to dictate what it will do. Look at the code above)

app.get('*', responseCallback);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
