const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

jsonfile.readFile('pokedex.json', (err, data) => {
	let pokemon_list = data.pokemon;

	app.get('/pokemon', (req, res) => {
		res.send(`Welcome to the online Pokedex!`)
	});

	app.get('/pokemon/:name', (req, res) => {
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon){
			res.send(`This is ${searched_pokemon.name}.<br>
				<img src=${searched_pokemon.img}><br>
				These are its stats:<br>
				Height: ${searched_pokemon.height}<br>
				Weight: ${searched_pokemon.weight}<br>
				Weaknesses: ${searched_pokemon.weaknesses}<br>`);
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});

	app.get('/type/:type', (req, res) => {
		let intype = req.params.type
		type = intype[0].toUpperCase() + intype.slice(1);
		let filtered_list = pokemon_list.filter(pokemon => pokemon.type.includes(type));
		type_list = `These pokemons are of ${intype} type:<br>`;
		filtered_list.forEach(pokemon => type_list += `<br>${pokemon.name}`);
		res.send(type_list);
	});

	app.get('/weakness/:weakness', (req, res) => {
		let weakness = req.params.weakness
		weakness = weakness[0].toUpperCase() + weakness.slice(1);
		let filtered_list = pokemon_list.filter(pokemon => pokemon.weaknesses.includes(weakness));
		weakness_list = `These pokemons are weak against ${weakness}:<br>`;
		filtered_list.forEach(pokemon => weakness_list += `<br>${pokemon.name}`);
		res.send(weakness_list);
	});

	app.get('/prevevolution/:name', (req, res) => {
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon && searched_pokemon.prev_evolution){
			name_list = 
				`This pokemon is ${name}.<br>
				<img src=${searched_pokemon.img}><br>
				It evolves from:`;
			searched_pokemon.prev_evolution.forEach(pokemon => name_list += `<br>${pokemon.name}`);
			res.send(name_list);
		} else if (searched_pokemon) {
			res.send(`This pokemon does not have a previous evolution.`)
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});

	app.get('/nextevolution/:name', (req, res) => {
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon && searched_pokemon.next_evolution){
			name_list = 
				`This pokemon is ${name}.<br>
				<img src=${searched_pokemon.img}><br>
				It evolves into:`;
			searched_pokemon.next_evolution.forEach(pokemon => name_list += `<br>${pokemon.name}`);
			res.send(name_list);
		} else if (searched_pokemon) {
			res.send(`This pokemon does not have a next evolution.`)
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
