const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = "pokedex.json";
/**
 * ===================================
 * Routes
 * ===================================
 */

// finding pokemon through number
// app.get('/pokemon/:number', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         if(err) {
//             console.log("ERROR", err);
//         }
//         let i = parseInt(request.params.number);
//         response.send("name :" + obj.pokemon[i].name)
//         });
//     });

// finding pokemon name and weight through names
app.get('/pokemon/:name', (request, response) =>{
    jsonfile.readFile(file, (err, obj) => {
        if(err){
            console.log("ERROR", err);
        }
        let found = false;
        for(i=0; i < obj.pokemon.length; i++){
            const pokeName = obj.pokemon[i].name;
            const pokeWeight = obj.pokemon[i].weight;
            if(pokeName === request.params.name) {
                found = true;
                response.send("Name :" + pokeName + ", Weight :" + pokeWeight)
            }
        }
        if(found === false){
            response.status(404).send(request.params.name + " could not be found. Think Rayquaza ate it...")
            }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));