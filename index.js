const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const file = 'pokedex.json';


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */




//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// default request, if never specify
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


var defaultRequest = function(request, response){
  response.send('Welcome to the online Pokedex!');
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// get pokemon by name
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


var getPokemonByNameRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     }

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


   })
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// get pokemon by type
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


var getPokemonByTypeRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     }

       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       // get all pokemon types
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------

       var getAllPokemonType = function(){

         var typeList = [];

         for (var i = 0; i < data.pokemon.length; i++) {
             for (var j = 0; j < data.pokemon[i].type.length; j++) {
                 var type = data.pokemon[i].type[j];
                 if (typeList.includes(type) === false) {
                     typeList.push(type);
                 }
             }
         }

         return typeList;
       }

       var allTypes = getAllPokemonType();
       console.log(allTypes);

       // use the type entered in url and find a list of pokemon with that type.

       let found = false;
       let message = '';
       let arr = [];

       for (var i = 0; i< data.pokemon.length; i++){
         for (var j = 0; j< data.pokemon[i].type.length; j++){
           if(data.pokemon[i].type[j].toLowerCase() === request.params.type){
             arr.push(data.pokemon[i].name);
             found = true;
           }
         }
       }

       if(found === true){
         message = `These are the ${request.params.type} type pokemon: ${arr.toString()}`;
         response.send(200, message);
       }


       if(found === false){
         message = `${request.params.type} is not a valid type of Pokemon. Try ${allTypes.toString()}`;
         response.send(404, message);
       }


   })
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// get pokemon by weakness
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

var getPokemonByWeaknessRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     }
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       // get all pokemon weakness
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       //----------------------------------------------------------------------------------------------------------------------------------------------------------------

       var getAllPokemonWeakness = function(){

         var weaknessList = [];

         for (var i = 0; i < data.pokemon.length; i++) {
             for (var j = 0; j < data.pokemon[i].weaknesses.length; j++) {
                 var weakness = data.pokemon[i].weaknesses[j];
                 if (weaknessList.includes(weakness) === false) {
                     weaknessList.push(weakness);
                 }
             }
         }

         return weaknessList;
       }

       var allWeaknesses = getAllPokemonWeakness();
       console.log(allWeaknesses);

       //use weakness in url and find the list of pokemon with that weaknesses

       let found = false;
       let message = '';
       let arr = [];


       for (var i = 0; i< data.pokemon.length; i++){
         for (var j = 0; j< data.pokemon[i].weaknesses.length; j++){
           if(data.pokemon[i].weaknesses[j].toLowerCase() === request.params.weakness){
             arr.push(data.pokemon[i].name);
             found = true;
           }
         }
       }

       if(found === true){
         message = `These pokemon <br> ${arr.toString()} <br>  are afraid of ${request.params.weakness}`;
         response.send(200, message);
       }


       if(found === false){
         message = `${request.params.weakness} is not a valid weakness. Try list of ${allWeaknesses.toString()}`;
         response.send(404, message);
       }


   })
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// get pokemon next evolution
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


var getPokemonNextEvolutionRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     }

       let found = false;
       let nextEvolute = false;
       let message = '';
       let arr = [];


       for( var i = 0 ; i < data.pokemon.length; i++){
         //if pokemon match
         if( data.pokemon[i].name.toLowerCase() === request.params.name){
           found = true;
           // if pokemon has next evolutions
           if(data.pokemon[i].hasOwnProperty('next_evolution')){
             for (let j = 0; j < data.pokemon[i].next_evolution.length; j ++){
               arr.push(data.pokemon[i].next_evolution[j].name);
               nextEvolute = true;
             }
           } else {
              // if pokemon dont'have next evolution
             nextEvolute = false;
           }
         }
       }

       if(found === true && nextEvolute === true ){
         message = `${request.params.name} next evolution is ${arr.toString()}.`
         response.send(200, message);
       } else if (found === true && nextEvolute === false){
         message = `${request.params.name} does not have next evolution`;
         response.send(200, message);
       } else if (found === false && nextEvolute === false){
         message = `Could not find information about ${request.params.name} - Is that a new pokemon? Gotta catch em' all!`;
         response.send(404, message);
       }


   })
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// get pokemon prev evolution
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


var getPokemonPrevEvolutionRequest = function(request, response){
  jsonfile.readFile(file, function (err, data) {
     if (err){
       console.error(err);
     }

       let found = false;
       let prevEvolute = false;
       let message = '';
       let arr = [];


       for( var i = 0 ; i < data.pokemon.length; i++){
         //if pokemon match
         if( data.pokemon[i].name.toLowerCase() === request.params.name){
           found = true;
           // if pokemon has prev evolutions
           if(data.pokemon[i].hasOwnProperty('prev_evolution')){
             for (let j = 0; j < data.pokemon[i].prev_evolution.length; j ++){
               arr.push(data.pokemon[i].prev_evolution[j].name);
               prevEvolute = true;
             }
           } else {
              // if pokemon dont'have previous evolution
             prevEvolute = false;
           }
         }
       }

       if(found === true && prevEvolute === true ){
         message = `${request.params.name} previous evolution is ${arr.toString()}.`
         response.send(200, message);
       } else if (found === true && prevEvolute === false){
         message = `${request.params.name} does not have previous evolution`;
         response.send(200, message);
       } else if (found === false && prevEvolute === false){
         message = `Could not find information about ${request.params.name} - Is that a new pokemon? Gotta catch em' all!`;
         response.send(404, message);
       }


   })
}

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/', defaultRequest);
 app.get('/pokemon/:name', getPokemonByNameRequest);
 app.get('/type/:type', getPokemonByTypeRequest);
 app.get('/weakness/:weakness', getPokemonByWeaknessRequest);
 app.get('/nextevolution/:name', getPokemonNextEvolutionRequest);
 app.get('/prevevolution/:name', getPokemonPrevEvolutionRequest);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */


app.listen(5000, () => console.log('~~~ Tuning in to the waves of port 5000 ~~~'));
