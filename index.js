const express = require('express');   //requiring node express
const jsonfile = require('jsonfile'); //requiring the jsonfile that is npm init
// const myFunction = require('my_modules'); //the modules of function that user creates with pokedex
const pokedex = 'pokedex.json'; //pokedex library

// Init express app
const app = express();

jsonfile.readFile(pokedex, function(err, obj) { //READ FILE
	//items=obj[0].name;
	// console.log(obj.pokemon[2]); 
});

/**
 * ===================================
 * Routes
 * ===================================
 */
var responseCallback = (request, response) => {
	console.log(request.path);
// send response with some data (a string) 
	if ( request.path == "/bulbasaur" ){
		response.send("<html><body><h1>Bulbasaur</h1><ul>6.9kg</ul></body></html>");
	}else{
  		response.send(';)');
	}
};

app.get('*', responseCallback);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
