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

app.get("/:name", (request, response) => {
    var searchPoke = request.params.name.toLowerCase();
      jsonfile.readFile(pokedex, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++){
            var searchInput = obj.pokemon[i].name.toLowerCase();
                if(searchInput === searchPoke){
                    response.send("Its weight is: " + obj.pokemon[i].weight);
                    console.log(obj.pokemon[i].weight);
                }
        }
    });
});

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
