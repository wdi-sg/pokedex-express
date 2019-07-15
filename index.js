const express = require('express');

const jsonfile = require('jsonfile');
const file = "./pokedex.json";
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

app.get('/pokemon/:name', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
   
    // extract input data from request
    var name =  request.params.name ;

    var pokemon;
    var pokemon_weight;

    // find pokemon from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let matchedPokemon = obj.pokemon[i];

      if( matchedPokemon.name === name){
      	pokemon = matchedPokemon;
        pokemon_weight = matchedPokemon.weight;
      }
    }

    if (pokemon===undefined) {

      // send 404 back
      response.status(404);
      response.send(`Could not find information about ${name}- Is that a new pokemon? Gotta catch em' all!`);
    } else {

    var msg = `This is ${name}. He weighs ${pokemon_weight}.`
      response.send(msg);
    }
  });
});



app.get('/type/:type', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
   
    // extract input data from request
    var type =  request.params.type;

    var pokemon = [];
    

    // find pokemon from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let matchedPokemon = obj.pokemon[i];
    	for( let j=0; j<matchedPokemon.type.length; j++ ){

	      if( matchedPokemon.type[j]=== type){
	      	pokemon.push(matchedPokemon.name);
	      }
    	}
    }
    
  if (pokemon===null) {

      // send 404 back
      response.status(404);
      response.send(`Could not find information about ${name}- Is that a new pokemon? Gotta catch em' all!`);
    } else {

    var msg = ` ${pokemon} are pokemons type ${type}.`
      response.send(msg);
    }
  });
});



app.get('/weaknesses/:weakness', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
   
    // extract input data from request
    var weakness =  request.params.weakness;

    var pokemon = [];
    

    // find pokemon from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let matchedPokemon = obj.pokemon[i];
    	for( let j=0; j<matchedPokemon.weaknesses.length; j++ ){

	      if( matchedPokemon.weaknesses[j]=== weakness){
	      	pokemon.push(matchedPokemon.name);
	      }
    	}
    }
    
  if (pokemon===null) {

      // send 404 back
      response.status(404);
      response.send(`Could not find information about ${weakness} weakness- Is that a new pokemon? Gotta catch em' all!`);
    } else {

    var msg = ` ${pokemon} are pokemons have ${weakness} weakness.`
      response.send(msg);
    }
  });
});


app.get('/nextevolution/:name', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
   
   let name =  request.params.name;

  	let pokemon = [];
    
    for( let i=0; i<obj.pokemon.length; i++ ){

      let matchedPokemon = obj.pokemon[i];
    	for( let j=0; j<matchedPokemon.next_evolution.length; j++ ){
	      if( matchedPokemon.next_evolution[j].name=== name){
	      	pokemon.push(matchedPokemon.name);
	      	console.log(pokemon);
	      }
    	};
    
    
  if (pokemon===null) {

      // send 404 back
      response.status(404);
      response.send(`Could not find information about ${weakness} weakness- Is that a new pokemon? Gotta catch em' all!`);
    } else {

    var msg = ` ${name} evolved from ${pokemon}.`
      response.send(msg);
    };


	};
});
});



app.get('/', (request, response) => {
  response.send("Welcome to the online Pokdex!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
