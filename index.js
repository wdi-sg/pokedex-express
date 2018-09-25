const express = require('express');

const jsonfile = require('jsonfile');

const file = "./pokedex.json";

const PORT_NUMBER = 3002;

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// // Init express app
// const app = express();


// Function to read and go through the json file and return weight


var searchPokemon = (object, pokeName) => {

     for (i in object.pokemon) {

         if (object.pokemon[i].name.toLowerCase() === pokeName.toLowerCase()) {

             return object.pokemon[i].weight;
         };
     };
 };

// Function for handle request

var handleRequest = (request, response) => {

     console.log("Loading. . .");
     console.log("Request path: " + request.path);

     let result;

     jsonfile.readFile(file, (err, obj) => {

         if (err) {console.log(err)};

         result = searchByName(obj);
         response.send(result);

         });
 };

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', handleRequest);

app.listen(3004, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));















