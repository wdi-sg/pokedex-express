const express = require('express');
let pokemonName;
let pokemonDetails;
let pokemonWeight;
let pokemonHeight;
var pokemonObj = {};
 const jsonfile = require('jsonfile');
 const pokedex = './pokedex.json';
 jsonfile.readFile(pokedex, function(err, obj) {
 	pokemonObj = obj;

 	 //console.log(pokemonObj.pokemon.length);
 	 //console.log(pokemonObj.pokemon.length);
 	 //console.log(obj.pokemon[0].weight);
 	 //console.log(obj)
 })

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


// let pokemonSearch = function(pokemons, userSearch){
	
// 	for(var i = 0; i < pokemons.pokemon.length; i++){
// 		if (userSearch == '/'+pokemons.pokemon[i].name){
// 			let pokemonDetails = pokemons.pokemon[i].name+'s weight is '+pokemons.pokemon[i].weight+' and its height is '+pokemons.pokemon[i].height;
// 		}
// 	} return pokemonDetails;
// }


app.get('*', (request, response) => {
  // send response with some data (a string)
  let userPokemonSearch = request.path.split('/');
  console.log(userPokemonSearch);
  for(var i = 0; i < pokemonObj.pokemon.length; i++){
  	if (userPokemonSearch == +pokemonObj.pokemon[i].name){
  		pokemonName = pokemonObj.pokemon[i].name;
  		pokemonWeight = pokemons.pokemon[i].weight;
  		pokemonHeight = pokemons.pokemon[i].height;
  }
} response.send(pokemonName+' is '+pokemonWeight+' and '+pokemonHeight);
 	
	//response.send(pokemonSearch(pokemonObj, userPokemonSearch));

	// if(request.path == 'bulbasaur'){
	// 	response.send('ok')
	// }
 });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 !~~~'));
