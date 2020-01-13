/*
Personal Notes 

JSON.parse -> JSON to string
JSON.stringify --> string to JSON

*/


const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();
/*
const returnInformation = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let index = request.params.id;
    console.log(array[index])
    response.send(array[index])
  })
}
*/

const returnInformation = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let name = request.params.input.toLowerCase();
    let isPokemonFound = false;

    for(let i = 0; i < array.length; i++){

      if(array[i]["name"].toLowerCase() == name){
        let requestedPokemon = array[i];
        isPokemonFound = true
        response.send(requestedPokemon)
        console.log("Response sent")
        break;
      }
    }
    
    if(isPokemonFound == false){
      response.status(404).send(`Could not find information about ${name} - Is that a new pokemon? Gotta catch em' all!`)
    }
    
    
  })


}




// Routes 

app.get('/pokemon/:input', returnInformation);
app.get('/', (req,res) => {res.send(`Welcome to the pokedex!`)});






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => {console.log("Listening for requests at port 3000")})
