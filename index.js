const express = require('express');
const handlebars = require('express-handlebars');

const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/names/:name', (request, response) => {
  // send response with some data (a string)
  // get my json from the file
	jsonfile.readFile(FILE, function(err, obj) {

    // Return a string response with the requested pokemon's information when a request comes with matching the route /names/:name
		// deal with the request
		let name = request.params.name; // get the pokemon name
		// obj is the podedex json file

		// console.dir(obj)
		// send something back

    var notFound = true;
    var context;
    var pokemons = obj["pokemon"];

    for (var i=0;i<pokemons.length;i++) {
      // if (pokemons[i].name === name) response.send(pokemons[i]);
      if (pokemons[i].name === name) {
        notFound = false;
        context = {
          name: name,
          weight: pokemons[i].weight,
          notfound: notFound // false
        };
      }
    }

    // pokemon name invalid
    if (notFound) {
      context = {
        name: name,
        notfound: notFound // true
      };
    }
    // response.send(context);
    response.render('home', context);
	});
});

  // Return a string response "Welcome to the online Pokedex!" when a request for the root route (/) is received
// app.get('/', (request, response) => {
//   // send response with some data (a HTML file)
//   // response.render('home');
//
//   response.send("Welcome to the online Pokedex!");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
