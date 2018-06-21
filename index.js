var str;
var search;

const express = require('express');   //requiring node express
const jsonfile = require('jsonfile'); //requiring the jsonfile that is npm init
// const myFunction = require('my_modules'); //the modules of function that user creates with pokedex
const pokedex = 'pokedex.json'; //pokedex library

// Init express app
const app = express();

jsonfile.readFile(pokedex, function(err, obj) { //READ FILE
	var object = obj;

function getPokemonName(name){
	let pokemon = object.pokemon;
	for( let i = 0; i<pokemon.length; i++ ){
		if( pokemon[i].name.toLowerCase() == name.toLowerCase()){
			console.log( pokemon[i] )
		}
	}
};


function error(name){
	var message = "<p>Could not find information about <b>" + name + "</b> Is that a new pokemon? Gotta catch em' all!</p>";
	html ="<html><body>" + message + "</body></html>";
	return html
};

function mainpage(name, pokemon){
	let heading = '<h1>Welcome to the online Pokedex!</h1>'
	let list = '';
	for( let i = 0; i<pokemon.length; i++ ){
		list += "<li>" + name + "</li>";
	}
	let data = "<ul>" + list + "</ul>";
	return heading + data
}
function successful(name, pokemon, height, weight){
	for( let i = 0; i<pokemon.length; i++ ){
		var heading = "<h1>" + name + "</h1>";
		var content = "<li> Height is: " + height + "</li>";
		var content1 = "<li> Weight is: " + weight + "</li>";
	}
	let html = "<html><body>" + heading + "<ul>" + content + content1 + "</ul></body></html>";
	return html
}

// function specificType(){

// };

var responseCallback = (request, response) => {
	str = request.path;
	search = str.slice(1);
	// console.log(search);
	let pokemon = object.pokemon;
	for( let i = 0; i<pokemon.length; i++ ){
		name = pokemon[i].name.toLowerCase();
		var height = pokemon[i].height;
		var weight = pokemon[i].weight;

		// console.log(name);

		if (search == name){
			response.send(successful(name, pokemon, height, weight));

    	}else if( search != name ){
			response.send(error(search));
			response.status(404);// ###Cant seem to search other things then bbsaur

		}else if( search == false ){
			response.send(mainpage(name, pokemon)); //###Cant seem to get the main loading page too
		}
	}
}

app.get('*', responseCallback);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
});