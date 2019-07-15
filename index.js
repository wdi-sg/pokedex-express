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
            if(pokemonName === obj.pokemon[i].name.toLowerCase()) {
                console.log("The name of the pokemon: " + obj.pokemon[i].name)
                display = "This is " + obj.pokemon[i].name + ". This pokemon weighs " + obj.pokemon[i].weight + ". To increase the happiness of the pokemon, trainer MUST give " + obj.pokemon[i].candy + ".";
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

var type = (request, response) => {
    var pokemonType = request.params.colorType;
    console.log(pokemonType);
    //console.log(request.params);
    var pokemon = [];
    jsonfile.readFile(file,(err,obj) =>{
        // console.log("BOOYEAH");
        // console.log(obj);
        for (let i = 0; i < obj.pokemon.length; i++){
            // console.log("The name of the pokemon: " + obj.pokemon[i].name);
            for (let j = 0; j < obj.pokemon[i].type.length; j++){
                if(pokemonType === obj.pokemon[i].type[j].toLowerCase()){
                    console.log("The name of the pokemon: " + obj.pokemon[i].name);
                    pokemon.push(obj.pokemon[i].name);
                }
                else {
                    response.status(404)
                    display = "No such type";
                    response.send(display);
                }
            };
        };
        var pokemonJoin = pokemon.join(", ");
        response.send(pokemonJoin);
    });
};

var showHome = (request, response) =>{
    // console.log("Welcome to the online Pokdex!");
    display = "Welcome to the online Pokedex!";
    response.send(display);
}


app.get('/pokemon/:name', pokemon);
app.get("/type/:colorType", type)
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