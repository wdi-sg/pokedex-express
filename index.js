const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json'
var display;

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

var pokemon = (request, response) => {
    var pokemonName = request.params.name
    //console.log(request.params);
    jsonfile.readFile(file,(err,obj) =>{
        // console.log("BOOYEAH");
        // console.log(obj);
        for (let i = 0; i < obj.pokemon.length; i++){
            if(pokemonName === obj.pokemon[i].name) {
                console.log("The name of the pokemon: " + obj.pokemon[i].name)
                display = obj.pokemon[i].name + " weight is: " + obj.pokemon[i].weight;
                break;
            }
            else {
                response.status(404)
                display = "Could not find information about " + pokemonName + ". Is that a new pokemon? Gotta catch em' all!";
            };
        };
        response.send(display);
    });
};

var showHome = (request, response) =>{
    // console.log("Welcome to the online Pokdex!");
    display = "Welcome to the online Pokedex!";
    response.send(display);
}


app.get('/pokemon/:name', pokemon);
app.get('/', showHome);

  //   console.log("test ", pokemon("Bulbasaur"));
  // send response with some data (a string)
  // var pokemonName = request.params.name;
  // console.log("Params: ",request.params.name);
  // var displayPokemon = pokemon(pokemonName);
  // console.log("This Works");
  // response.send(displayPokemon);


// app.get("/", (request, response) => {
//     response.send('test')
// })

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
const PORT = 3000;
console.log("start listening from port: " + PORT);
app.listen(PORT);
// console.log("HELLO WORLD");
console.log("now listening from port: " + PORT);