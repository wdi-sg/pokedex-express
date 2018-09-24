const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';


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
jsonfile.readFile(file, (err, obj) => {

  app.get('', (request, response) => {
    let welcome = '';
    let header = '<h1>Welcome to the online Pokedex!</h1>';
    let subheader = '<h2>We have 151 Pokemon in total!</h2>';

    // adding header, subheader and opening ul tag
  	welcome = header + subheader + '<ul>';

    
    // adding pokemon names with li tags
    for (let i = 0; i < obj.pokemon.length; i++) {
      welcome += '<li>' + obj.pokemon[i].name + '</li>';
    }

    // adding closing ul tag
    welcome += '</ul>';

    response.send(welcome);

  });



app.get('*', (request, response) => {
  // send response with some data (a string)
  // response.send(request.path);

  // need to remove the slash in request.path
  function removeSlash() {
  	var str = request.path;
  	if(str.charAt(0) == '/') {
  		str = str.substring(1);
  	}
  	// console.log(str);
  	return str;
  };

  var pokemonName = removeSlash();

 
  let search = true;

  function pokemonSearch() {
	  for (let i = 0; i < obj.pokemon.length; i++) {
	  	if (pokemonName == obj.pokemon[i].name.toLowerCase()) {
	  		search = false;
	  		response.send('<html><body><h1>' + obj.pokemon[i].name + '</h1><ul><li>Height: ' + obj.pokemon[i].height + '</li><li>Weight: ' + obj.pokemon[i].weight + '</li></ul></body></html>');
	  		return;
	  	} 
	  }

	  if (search = true) {
			response.status(404);
			response.send('<html><body><p>Could not find information about ' + pokemonName + " - Is that a new pokemon? Gotta catch em' all! </p></body></html>");
			return;
	  }

	}
	pokemonSearch();
  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
