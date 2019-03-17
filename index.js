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

 //Main Page
app.get("/", (request, response) => {
    //response.send("Welcome to the Pokedex");

    jsonfile.readFile(pokedex, (err, obj) => {
        
        const pokemon = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<body>";
        html += "<h1>PokeDex</h1>";
        html += "<ul>"

        for(let i = 0; i < obj.pokemon.length; i++) {
            html += "<li><a href='" + pokemon[i].name + "'>" + pokemon[i].name + "</li>"
        }
        html += "</ul>"
        html += "</body>";
        html += "</html>";

        return response.send(html);
    });
});


/*
app.get("/:name", (request, response) => {
    let isFound = false;
    // reads pokemon.json

    jsonfile.readFile(pokedex, (err, obj) => {

        for (let i = 0; i < obj.pokemon.length; i++) {
            //console.log(obj.pokemon);
            
            Object.keys(obj.pokemon[i].forEach((key) => {
                if (obj.pokemon[i].name === name) {
                    isFound = true;
                    let weight = obj.pokemon[i].weight;
                    response.status(200).send("Return result: " + request.params.name + "Weight: " + obj.pokemon[i].weight);
                };
            }));
            if (isFound == false) {
                response.status(404).send("No information found" + request.params.name);
            };
        };
    });

});

*/

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


