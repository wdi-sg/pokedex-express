console.log('js is running');
//1) think of require as a need to import something
const express = require('express');
//its the same as fs with an addition of JSON.parse which converts a string to a JSON object
const jsonfile = require('jsonfile');

//2) creating the express app by setting it to the app variable
var app = express();

//(1)url (2)function that tells express what to send back to the person making the request.
var handleRequest = (request, response) => {

  console.log("request.path: ", request.path.split('/')[1]);
  let requestedPokemon = request.path.split('/')[1];
  //call the readFile method that gets: the name of the file and a function.
  //This function is called when the file-reading operation has finished.
  //The function will get two parameters.
  //The first is the information about any error conditions, the second is the
  //actual content of the file. In this case, an object.
  jsonfile.readFile('pokedex.json', function(err, obj){
    //console.log(contents);
    let i;
    for(i = 0; i < obj.pokemon.length; i++){
      console.log("requestedPokemon: ", requestedPokemon);
      let pokemon = obj.pokemon[i];
      if(requestedPokemon === pokemon.name.toLowerCase()){
        response.send(pokemon.weight);
        break;
      }
    }
    if(i === obj.pokemon.length){
      response.status(404);
      response.send("Could not find information about " + requestedPokemon +
      " - Is that a new pokemon? Gotta catch em' all!");
    }
  });

}

//.get is saying that when it gets that path it should give the response that is specified in the function.
app.get('*', handleRequest);
const PORTNUMBER = 3000;

//.listen is going to bind the application to the port on our machine.
app.listen(PORTNUMBER, function(){
  console.log("Node server is running");
});
