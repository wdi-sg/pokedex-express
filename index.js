console.log("hello");

const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// Init express app
const app = express();

 app.get('/:name', (request, response) => 
 {
 	jsonfile.readFile(file, (err, obj) => 
 	{
    	if (err) 
    	{
      		console.log(err);
      		return;
    	}
    	var html = '';
     	for (let i = 0; i < obj.pokemon.length; i++) 
    		{
     			let pokemons = obj.pokemon[i];
     			let userRequest = request.params.name.toLowerCase();
     			let userRequestPokemonPath = request.path.split('/')[1];
     		if (pokemons.name.toLowerCase() === userRequest)
      			{
        			//response.send("Pokemon: " + pokemons.name + ", " + "Weight: " + pokemons.weight);
                    html += '<html>';
                    html += '<body><h1>' + pokemons.name + '</h1>';
                    html += '<p> The weight of this pokemon is: ' + pokemons.weight + '</p>';
                    html += '<p> The height of this pokemon is: ' + pokemons.height + '</p>';
                    html += '<img src="'+ pokemons.img +'"/>';
                    html += "</body>";
                    html += "</html>";                 
                    response.send(html);
                    var count = 1;
      			}
      		}
      	if (count != 1)
      		{
      			//response.send("Could not find information about " + userRequestPokemonPath + ". Is that a new pokemon? Gotta catch em' all!"); 
      			//response.status(404);     	             
                html += '<html>';
                html += '<body><p>Could not find information about ' + userRequest + ". Is that a new pokemon? Gotta catch em' all!</p>";
                response.send(html);
                response.status(404);
      		}   		
  	});
 });

app.get('/', (request, response) => {
   response.send("Welcome to the Pokedex!");
 });

 app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => 
// {
//   // send response with some data (a string)
//   response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//Working on it//
