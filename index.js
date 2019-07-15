const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const file = 'pokedex.json';



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */


/**
 * ===================================
 * Routes
 * ===================================
 */

var defaultRequest = function(request, response){
  response.send('Welcome to the online Pokedex!');
}

var getPokemonByNameRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     } else {

       let found = false;
       let message = '';

       for( var i = 0 ; i < data.pokemon.length; i++){
         var pokemonName = (data.pokemon[i].name).toLowerCase();
         if( request.params.name === pokemonName){
           message = `The pokemon is ${data.pokemon[i].name}. His weight is ${data.pokemon[i].weight}.`
           found = true;
         }
       }

       if(found === true){
         response.send(200, message);
       }

       if(found === false){
         message = `Could not find information about ${request.params.name} - Is that a new pokemon? Gotta catch em' all!`;
         response.send(404, message);
       }

     }
   })
}

var getPokemonByTypeRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     } else {

       let found = false;
       let message = '';
       let arr = [];

       for (var i = 0; i< data.pokemon.length; i++){
         for (var j = 0; j< data.pokemon[i].type.length; j++){
           if(data.pokemon[i].type[j].toLowerCase() === request.params.sometype){
             arr.push(data.pokemon[i].name);
             found = true;
           }
         }
       }

       if(found === true){
         message = `These are the ${request.params.sometype} type pokemon: ${arr.toString()}`;
         response.send(200, message);
       }


       if(found === false){
         message = `${request.params.sometype} is not a valid type of Pokemon. Try Grass, Psychic, Electric etc.`;
         response.send(404, message);
       }

     }
   })
}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.get('/', defaultRequest);
app.get('/pokemon/:name', getPokemonByNameRequest);
app.get('/type/:sometype', getPokemonByTypeRequest);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
