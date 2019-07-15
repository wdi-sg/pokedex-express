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

// var nextEvolution = (request, response) => {
//     var pokemonName = request.params.name
//     // var evolution = false;
//     jsonfile.readFile(file,(err,obj) =>{
//         // console.log("BOOYEAH");
//         for (let i = 0; i < obj.pokemon.length; i++){
//             if(pokemonName === obj.pokemon[i].name.toLowerCase()) {
//                 // console.log("The name of the pokemon: " + obj.pokemon[i].name);
//                 for (let j = 0; j < obj.pokemon[i].next_evolution.length; j++){
//                     console.log(obj.pokemon[i].next_evolution[j].name);
//                     break;
//                 }
//             }
//             else {
//                 response.status(404)
//             };
//         };
//         // response.send(display);
//     });
// };

var type = (request, response) => {
    var pokemonType = request.params.pokemonsType;
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
        var pokemonTypeJoin = pokemon.join(", ");
        response.send(pokemonTypeJoin);
    });
};

var weakness = (request,response)=>{
    var pokemonWeakness = request.params.pokemonWeakness;
    var pokemon = [];
    // console.log("HELLO");
    jsonfile.readFile(file,(err,obj) =>{
        // console.log("BOOOOO");
        for (let i = 0; i < obj.pokemon.length; i++){
            // console.log(obj.pokemon[i].name);
            for (let j = 0; j < obj.pokemon[i].weaknesses.length; j++){
                if(pokemonWeakness === obj.pokemon[i].weaknesses[j].toLowerCase()){
                    // console.log("The pokemon that is weak against " + pokemonWeakness + " is " + obj.pokemon[i].name);
                    pokemon.push(obj.pokemon[i].name);
                    // console.log("Is it this :" + pokemon);
                }
                // else{
                //     response.status(404)
                //     display = "No such weaknesses";
                //     response.send(display);
                // };
            };
        };
        console.log("Is it this :",pokemon)
        var pokemonWeaknessJoin = pokemon.join(", ");
        response.send(pokemonWeaknessJoin);
    });
};



var showHome = (request, response) =>{
    // console.log("Welcome to the online Pokdex!");
    display = "Welcome to the online Pokedex!";
    response.send(display);
};


app.get("/pokemon/:name", pokemon);
// app.get("/next_evolution/:name", nextEvolution);
app.get("/type/:pokemonType", type);
app.get("/weakness/:pokemonWeakness",weakness);
app.get("/", showHome);


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