/*
Personal Notes 

JSON.parse -> JSON to string
JSON.stringify --> string to JSON

*/


const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

var returnInformation = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    console.log(array[request.params.id])
    response.send(array[request.params.id])
  })
}



// Routes 

app.get('/pokemon/:id', returnInformation);







/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => {console.log("Listening for requests at port 3000")})
