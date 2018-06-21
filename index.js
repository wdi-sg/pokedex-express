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
			return pokemon[i];
		}
	}
};

function html(pokemon){ //pokemon will be in a object
	let str = '';
	for(let key in pokemon){
		str += "<html><body>" + key + ":" + pokemon[key] + "</body></html>";
	}
	return str
};

function error(name){
	var message = "<p>Could not find information about <b>" + name + "</b> Is that a new pokemon? Gotta catch em' all!</p>";
	html ="<html><body>" + message + "</body></html>";
	return html
};

function mainpage(){
	let pokemon = object.pokemon;
	let heading = '<h1>Welcome to the online Pokedex!</h1>'
	let list = '';
	for( let i = 0; i<pokemon.length; i++ ){
		let name = pokemon[i].name;
		list += "<li>" + name + "</li>";
	}
	let data = "<ul>" + list + "</ul>";
	return heading + data
}
function successful(name, pokemon){
	for( let i = 0; i<pokemon.length; i++ ){
		let heading = "<h1>" + name + "</h1>";
		let weight = pokemon[i].weight;
		let content = "<ul>" + weight + "</ul>";
	}
	let html = "<html><body>" + heading + "<br></br>" + weight + "</body></html>";
	return html
}

var responseCallback = (request, response) => {
	var str = request.path;
	var search = str.slice(1);

	let pokemon = object.pokemon;
	for( let i = 0; i<pokemon.length; i++ ){
		name = pokemon[i].name;
		
		if (name == search){
			response.send(successful(name, pokemon));

    	}else if( request.path !== str ){
			response.send(error(name));
			response.status(404);

		}else if( request.path == false ){
			response.send(mainpage());
		}
	}
}

// send response with some data (a string) 
	// if ( request.path == "/bulbasaur" ){
	// 	response.send("<html><body><p>Could not find information about <pokemon_name> - Is that a new pokemon? Gotta catch em' all!</p></body></html>");
	// 	response.status(404);
	// }else{
 //  		response.send(';)');
	// }
// };

app.get('*', responseCallback);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
});