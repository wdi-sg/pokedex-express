const express = require('express');

const jsonfile = require('jsonfile');
const jsonfile = require('jsonfile');
const fs = require ("fs");

const pokedex = require("./pokedex.json");


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.get ("/:x" , function (req , res){


    jsonfile.readFile ("./pokedex.json", function (err, data) {
        console.log(data);
        // res.send (data);
        for (var i=0 ; i < data.pokemon.length ; i ++){
            var pokemonName = data.pokemon[i].name.toLowerCase();
            if (req.params.x === pokemonName){
                pokeDetails = data.pokemon[i];
                res.send (pokeDetails);
            }
        }
            if (req.params.x !== pokemonName) {
                res.send ("No such Pokemon")}


        })
});

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));