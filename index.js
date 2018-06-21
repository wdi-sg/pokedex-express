const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json'


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

app.get('*', (request, response) => {

	var searchedPokemon = request.path

	var pokemon;

	jsonfile.readFile(file, (err, obj) => {

		//empty search array
		let search = []
		
		for (var i = 0; i < obj.pokemon.length; i ++) {
    		//check for match, added / to pokemon database name
    		if ('/' + obj.pokemon[i].name == searchedPokemon) {  		
    			var heading = '<h1>' + obj.pokemon[i].name + '</h1>'
    			var	weight = '<ul>' + 'Weight: '+ obj.pokemon[i].weight + '</ul>'
    			//if match push into array with relevant html tags
    			search.push('<html> <body>' + heading + weight + '</body> </html>');
 
    		}

  		}
  		//join the array to return a string
  		if (search.length == 1) {
  			response.send(search.join());
  		
  		}
  		//as there is no result the array is empty, therefore
  		if (search.length < 1) {
  			//just to remove /
  			searchedPokemon =searchedPokemon.split('/').join('')
  			response.status(404).send("<html> <body> <p>Could not find information about </p> " + searchedPokemon + " <p> Is that a new pokemon? Gotta catch em' all! </p> </body> </html>")
  		}
  				
	})
  // send response with some data (a string)
  //response.send(pokemon);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// //further 1 effort
// let complete = []

// if (searchedPokemon === '/'){
// 	var heading = '<h1> Welcome to the Jungle !</h1>'
    
//     for (var i = 0; i < obj.pokemon.length; i ++){
//     	var list ='<li>'+ obj.pokemon[i].name +'</li>'
// 	}
// }





