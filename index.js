/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init jsonfile package
const jsonfile=require('jsonfile');
const file = 'pokedex.json';

// Init express app
const express=require('express');
const app = express();


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {	
		response.send(`<html><body><h1>Welcome to the online Pokdex!</h1></body></html>`);	
});

//Get Pokemon Details
app.get('/pokemon/:name', (request, response) => {	
	jsonfile.readFile(file, (err, obj) => {
		let pokemonDetails = '';
		let pokemonFound=false;

		for(var i=0; i<obj.pokemon.length;i++){
			if (obj.pokemon[i].name === (request.params.name)){
				pokemonDetails = pokemonDetails + `<img src=${obj.pokemon[i].img}><br>`; // Add Image
				pokemonFound=true;

				pokemonDetails = pokemonDetails + `This is ${obj.pokemon[i].name}. He is ${obj.pokemon[i].weight} in weight and ${obj.pokemon[i].height} in height.<br><br>This Pokemon has type:<br>`; //Pokemon Details

				obj.pokemon[i].type.forEach(function(type){ //Show Type
					pokemonDetails = pokemonDetails + `${type}<br>`;
				});

				pokemonDetails = pokemonDetails + `<br>This Pokemon has the following weaknesses:<br>`; //Show Weakness

				obj.pokemon[i].weaknesses.forEach(function(weakness){
					pokemonDetails = pokemonDetails + `${weakness}<br>`;
				});

				if (('next_evolution' in obj.pokemon[i])){  //Show Next Evolution
					pokemonDetails = pokemonDetails + `<br>This Pokemon has the following next evolution:<br>`;
					for(var j=0; j<obj.pokemon[i]['next_evolution'].length; j++){
						pokemonDetails = pokemonDetails + `${obj.pokemon[i]['next_evolution'][j].num} - ${obj.pokemon[i]['next_evolution'][j].name}<br>`
					}
				}

				if (('prev_evolution' in obj.pokemon[i])){ //Show Previous Evolution
					pokemonDetails = pokemonDetails + `<br>This Pokemon has the following previous evolution:<br>`;
					for(var k=0; k<obj.pokemon[i]['prev_evolution'].length; k++){
						pokemonDetails = pokemonDetails + `${obj.pokemon[i]['prev_evolution'][k].num} - ${obj.pokemon[i]['prev_evolution'][k].name}<br>`
					}
				}
				break;
			}
		}

		if (!pokemonFound){
			response.status(404).send(`<html><body><h1>Could not find information about ${request.params.name} - Is that a new pokemon?</h1></body></html>`);
		} else {
			response.send(`<html><body><h1>The following is the details of ${request.params.name}:\n\n</h1><p>${pokemonDetails}</p></body></html>`);	
		}

	});
});

//Get Pokemon by type
app.get('/type/:type', (request, response) => {
	jsonfile.readFile(file, (err, obj) => {
		let allPokemonInType = '';
		let count = 0;
		for(var i=0; i<obj.pokemon.length-1;i++){
			if (obj.pokemon[i].type.includes(request.params.type)){
				count++;
				allPokemonInType= allPokemonInType + `<img src=${obj.pokemon[i].img}><br>${obj.pokemon[i].id}. ${obj.pokemon[i].name}<br><br>`;
			}
		}

		allPokemonInType = allPokemonInType + `Total Number of Pokemon : ${count}`;

		if (count === 0){
			response.status(404).send(`<html><body><h1>Could not find information about ${request.params.type} - Is that a new pokemon type?</h1></body></html>`);
		} else {
			response.send(`<html><body><h1>The following are all Pokemons of type ${request.params.type}:\n\n</h1><p>${allPokemonInType}</p></body></html>`);	
		}
	});
});

//Get Pokemon by Weakness
app.get('/weaknesses/:weakness', (request, response) => {
	jsonfile.readFile(file, (err, obj) => {
		let allPokemonHaveWeakness = '';
		let count = 0;
		for(var i=0; i<obj.pokemon.length;i++){
			if (obj.pokemon[i].weaknesses.includes(request.params.weakness)){
				count++;
				allPokemonHaveWeakness= allPokemonHaveWeakness + `<img src=${obj.pokemon[i].img}><br>${obj.pokemon[i].id}. ${obj.pokemon[i].name}<br><br>`;
			}
		}

		allPokemonInType = allPokemonInType + `Total Number of Pokemon : ${count}`;

		if (count === 0){
			response.status(404).send(`<html><body><h1>Could not find information about ${request.params.type} - Is that a new pokemon type?</h1></body></html>`);
		} else {
			response.send(`<html><body><h1>The following are all Pokemons that are weak to ${request.params.weakness}:\n\n</h1><p>${allPokemonHaveWeakness}</p></body></html>`);	
		}
	});
});

//Show Pokemon next evolution
app.get('/nextevolution/:name', (request, response) => {
	jsonfile.readFile(file, (err, obj) => {
		let allPokemonEvolutions = `Index - Pokemon Name<br>`;
		let pokemonFound=false;
		let evolution=false;
		for(var i=0; i<obj.pokemon.length;i++){
			if (obj.pokemon[i].name === (request.params.name)){
				pokemonFound = true;
				if (('next_evolution' in obj.pokemon[i])){
					evolution=true;
					for(var j=0; j<obj.pokemon[i]['next_evolution'].length; j++){
					allPokemonEvolutions = allPokemonEvolutions + `${obj.pokemon[i]['next_evolution'][j].num} - ${obj.pokemon[i]['next_evolution'][j].name}<br>`
				}
				break;
				}
			}
		}

		if (!pokemonFound){
			response.status(404).send(`<html><body><h1>Could not find information about ${request.params.name} - Is that a new pokemon?</h1></body></html>`);
		} else if (pokemonFound && !evolution){
			response.status(404).send(`<html><body><h1>Pokemon at max evolution</h1></body></html>`);
		} else {
			response.send(`<html><body><h1>The following are all Evolutions to ${request.params.name}:\n\n</h1><p>${allPokemonEvolutions}</p></body></html>`);	
		}
	});
});

//Show Pokemon next evolution
app.get('/prevevolution/:name', (request, response) => {
	jsonfile.readFile(file, (err, obj) => {
		let allPokemonEvolutions = `Index - Pokemon Name<br>`;
		let pokemonFound=false;
		let evolution=false;
		for(var i=0; i<obj.pokemon.length-1;i++){
			if (obj.pokemon[i].name === (request.params.name)){
				pokemonFound = true;
				if (('prev_evolution' in obj.pokemon[i])){
					evolution=true;
					for(var j=0; j<obj.pokemon[i]['prev_evolution'].length; j++){
					allPokemonEvolutions = allPokemonEvolutions + `${obj.pokemon[i]['prev_evolution'][j].num} - ${obj.pokemon[i]['prev_evolution'][j].name}<br>`
				}
				break;
				}
			}
		}

		if (!pokemonFound){
			response.status(404).send(`<html><body><h1>Could not find information about ${request.params.name} - Is that a new pokemon?</h1></body></html>`);
		} else if (pokemonFound && !evolution){
			response.status(404).send(`<html><body><h1>Pokemon at its Basic Form</h1></body></html>`);
		} else {
			response.send(`<html><body><h1>The following are all previous evolutions to ${request.params.name}:\n\n</h1><p>${allPokemonEvolutions}</p></body></html>`);	
		}
	});
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
