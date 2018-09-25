
const express = require("express");
const jsonfile = require("jsonfile");
const pokeFile = "./pokedex.json";

// Get the object with pokemon

jsonfile.readFile(pokeFile, (err, obj) => {
  if (err) {
    console.error(err);
  } else {
    pokedex = obj;
 //    console.log(pokedex)
  }
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
//const app = express();


/**
 * ===================================
 * Routes
 * ===================================
 */

//  app.get('*', (request, response) => {
//    response.send("HI");
//
//      let exist = false;
//
//  app.get('*', (request, response) => {
//  send response with some data (a string)
//
//  let exist = false;
//
//  for(var i=0;i<pokemon.length;i++){
//  if("/"+pokemon[i].name.toLowerCase() == request.path){
//  response.status(200).send("This is "+pokemon[i].name+ ", he is "+pokemon[i].weight+" in weight!");
//  exist = true;
//  }
//  }

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
