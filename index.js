const express = require('express');
const handlebars = require('express-handlebars');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const fs = require('jsonfile');

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

 var homepage = (module, request, response, obj)=>{
 	let context = {pokemons : obj.pokemon};
 	response.render(module, context);
 }

 var names = (module, request, response, obj)=>{
 	for(i=0;i<obj.pokemon.length;i++){
 		if(obj.pokemon[i].name == request.params.pokemon){
 			var context = obj.pokemon[i];
 		}
 	}
 	if(!context){
 		var context = {notFound: true,
 			request: request.params.pokemon,
 		};
 	}
 	response.render(module, context);
 }

 var pokemonTypes = (module, request, response, obj)=>{
 	let listOfPokemons =[];
 	for(i=0;i<obj.pokemon.length;i++){
 		if(obj.pokemon[i].type.indexOf(request.params.type) !== -1 ){
 			listOfPokemons.push(obj.pokemon[i]);
 			var context = {listOfPokemons : listOfPokemons };
 		}
 	}
 	if(!context){
 		var context = {notFound: true,
 			request: request.params.type,
 		};
 	}
 	response.render(module, context);
 }


 var callFiles = (module, request, response)=>{
 	fs.readFile('pokedex.json',(err, obj)=>{
 		if(module == "home") { homepage(module, request, response, obj);	}
 		if(module == "names") { names(module, request, response, obj);	}
 		if(module == "type") { pokemonTypes(module, request, response, obj);	}

 	});
 }

 app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  callFiles("names", request, response);
});

 app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  callFiles("home", request, response);
});

 app.get('/type/:type', (request, response) => {
  // send response with some data (a HTML file)
  callFiles("type", request, response);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
