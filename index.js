const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

console.log(file.pokemon);


// app.get('/', (request, response) => {
//   response.send("Welcome to this Pokemon Search Engine");
// });


// app.get('/pokemon/:number', (request, response) => {
//   console.log("Entered No. " + request.params.number);

//   jsonfile.readFile(file, (err,obj) => {
//     if( err ) {console.log("ERR", err )};
//     const x = request.params.number; 
//     const chosenPoke = obj.pokemon[x]["name"];
  

//     response.send ("You have found: " + chosenPoke);
//   })
// });

//OOOOOOKKKKK

app.get('/pokemon/:name', (request, response) => {
  console.log ("Searching for: " + request.params.name);
  
  jsonfile.readFile(file, (err, obj) => {
    if( err ) {console.log("ERR", err )};
    let pokemonName = request.params.name;
    let foundPoke;
    for ( let i=0; i < obj["pokemon"].length; i++ ){
      if (obj["pokemon"][i]["name"] === pokemonName);
        foundPoke = obj["pokemon"][i];
        
    }
    response.send (foundPoke);
  })
});
    

 







app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
