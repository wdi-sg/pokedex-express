const express = require('express');

// const jsonfile = require('jsonfile');

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

app.get('*', (request, response) => {
  //send response
    let exist = false;
app.get('*', (request, response) => {
send response with some data (a string)
let exist = false;
for(var i=0;i<pokemon.length;i++){
if("/"+pokemon[i].name.toLowerCase() == request.path){
response.status(200).send("This is "+pokemon[i].name+ ", he is "+pokemon[i].weight+" in weight!");
exist = true;
}
}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
