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

app.get("/:name", (request, response) => {
    let x = true;
    var searchPoke = request.params.name.toLowerCase();
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            var searchInput = obj.pokemon[i].name.toLowerCase();
                if(searchInput === searchPoke){
                    x = false;
                    var infoPoke = JSON.stringify(obj.pokemon[i]);
                    response.send("Its full information is: " + infoPoke);
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
