const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = "pokedex.json";

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

app.get("/", (request, response) => {
    response.send("Welcome to the online Pokedex!");
});

app.get("/type/:sometype", (request, response) => {
    var typeList = '';
    var searchPoke = request.params.sometype.toLowerCase();
    var searchPokeNew = searchPoke.charAt(0).toUpperCase() + searchPoke.slice(1);
    // response.send("The pokemon with " + searchPokeNew + " type are:- \n");
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            var typePoke = obj.pokemon[i].type;
            for(var j = 0; j < typePoke.length; j++){
                // console.log(typePoke[j]);
                if(searchPokeNew === typePoke[j]){
                    typeList += (obj.pokemon[i].name + "\n");
                }
            }
        }
        response.send("The pokemon with " + searchPokeNew + " type are:- \n\n" + typeList);
    });
});

app.get("/weaknesses/:someweakness", (request, response) => {
    var weaknessesList = '';
    var searchPoke = request.params.someweakness.toLowerCase();
    var searchPokeNew = searchPoke.charAt(0).toUpperCase() + searchPoke.slice(1);
    // console.log("The pokemon with " + searchPokeNew + " weaknesses are:- \n");
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            var weaknessPoke = obj.pokemon[i].weaknesses;
            for(var j = 0; j < weaknessPoke.length; j++){
                if(searchPokeNew === weaknessPoke[j]){
                    weaknessesList += (obj.pokemon[i].name + "\n");
                }
            }
        }
        response.send("The pokemon with " + searchPokeNew + " type weaknesses are:- \n\n" + weaknessesList);
    });
});

app.get("/nextevolution/:someevolution", (request, response) => {
    var nextEvoList = '';
    var searchPoke = request.params.someevolution.toLowerCase();
    var searchPokeNew = searchPoke.charAt(0).toUpperCase() + searchPoke.slice(1);
    // console.log("The pokemon with " + searchPokeNew + " evolution are:- \n");
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            if(obj.pokemon[i].hasOwnProperty('next_evolution')){
                var evoPoke = obj.pokemon[i].next_evolution;
                for(var j = 0; j < evoPoke.length; j++){
                    if(searchPokeNew === obj.pokemon[i].name){
                        nextEvoList += (evoPoke[j].name + "\n");
                    }
                }
            }
        }
        response.send("The pokemon that evolves from " + searchPokeNew + " are:- \n\n" + nextEvoList);
    });
});

app.get("/:name", (request, response) => {
    let x = true;
    var searchPoke = request.params.name.toLowerCase();
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            var searchInput = obj.pokemon[i].name.toLowerCase();
                if(searchInput === searchPoke){
                    x = false;
                    var infoPoke = JSON.stringify(obj.pokemon[i]);
                    var fullPoke = JSON.parse(infoPoke);
                    response.send(fullPoke.name + " has a height and weight of " + fullPoke.height + " and " + fullPoke.weight + " respectively. " + "It has a spawn chance of " + fullPoke.spawn_chance + " with an average spawn rate of " + fullPoke.avg_spawns + "\nIt usually spawn at " + fullPoke.spawn_time + " hrs." + " One or more of its weaknesses is " + fullPoke.weaknesses + " typing");
                    // response.send("Its weight is: " + obj.pokemon[i].weight);
                }
        }
        if(x === true){
        response.status(404).send("Could not find information about " + searchPoke + " Is that a new pokemon? Gotta catch em' all!");
      }
    });
});

// var invalidPoke = function(poke){
//     jsonfile.readFile(pokedex, (err, obj) => {
//     for(var i = 0; i < obj.pokemon.length; i++){
//         var searchInput1 = obj.pokemon[i].name.toLowerCase();
//             if(searchInput1 === poke){
//                 console.log("hi");
//             // console.log("Could not find information about " + poke + " Is that a new pokemon? Gotta catch em' all!");
//             }
//             else{
//                 console.log(poke);
//             }
//         }
//     });
// }

// app.get("/:name", (request, response) => {
//     var searchPoke = request.params.name.toLowerCase();
//       jsonfile.readFile(pokedex, (err, obj) => {
//         for(var i = 0; i < obj.pokemon.length; i++){
//             var searchInput = obj.pokemon[i].name.toLowerCase();
//                 if(searchInput === searchPoke){
//                     else if(searchPoke !== searchInput){
                //     console.log("Could not find information about " + searchPoke + " Is that a new pokemon? Gotta catch em' all!");
                // }
//                 }
//         }
//     });
// });

// app.get("/search", (request, response) => {
//     var searchPoke = request.query.q.toLowerCase();
//       jsonfile.readFile(pokedex, (err, obj) => {
//         for(var i = 0; i < obj.pokemon.length; i++){
//             var searchInput = obj.pokemon[i].name.toLowerCase();
//                 if(searchInput === searchPoke){
//                     response.send("Its weight is: " + obj.pokemon[i].weight);
//                     console.log(obj.pokemon[i].weight);
//                 }
//         }
//     });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
