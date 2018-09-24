const express = require('express');
const jsonfile = require('jsonfile');
const fileName = 'pokedex.json';
let weight;
let height;
let pokeName;
// const jsonfile = require('jsonfile');
let pokedex;
jsonfile.readFile(fileName, (err, obj) => {
  //console.log(pokedex.pokemon[0].height);
  pokedex = obj;
})

// Init express app
const app = express();

//the function to get requested pokemon details
var getPokemondDetails = function(allPokemonsInfo, requestFromUser){
  for(let i = 0; i < allPokemonsInfo.pokemon.length; i++){
  if (requestFromUser == allPokemonsInfo.pokemon[i].name){
     weight = allPokemonsInfo.pokemon[i].weight;
     height = allPokemonsInfo.pokemon[i].height;
     pokeName = allPokemonsInfo.pokemon[i].name;
    return (pokeName+" "+weight+" "+height);
}
}
}

app.get('*', (request, response) => {
  //the response is to send pokemon name weight and height
  let requestedPokemon = request.path.substring(1);
  
  // send response with some data (a string)
  console.log(pokedex);
  response.send(pokemonDetailsWithHtml(pokedex, requestedPokemon));
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
