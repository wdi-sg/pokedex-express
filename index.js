console.log('js is running');
//1) think of require as a need to import something
const express = require('express');
//its the same as fs with an addition of JSON.parse which converts a string to a JSON object
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

//2) creating the express app by setting it to the app variable
var app = express();
let pokemon;

//(1)url (2)function that tells express what to send back to the person making the request.
var handleRequest = (request, response) => {

  console.log("request.path: ", request.path.split('/')[1]);
  let requestedPokemon = request.path.split('/')[1];
  let pokemonMsg;

  if(request.path === "/"){
    console.log(request.path);
    response.status(200);
    response.send("Welcome to the online Pokedex!");
  }
  else{
    //call the readFile method that gets: the name of the file and a function.
    //This function is called when the file-reading operation has finished.
    //The function will get two parameters.
    //The first is the information about any error conditions, the second is the
    //actual content of the file. In this case, an object.
    jsonfile.readFile(file, function(err, obj){
      //console.log(contents);
      if(err) console.log("error: ", err);
      let i;
      found = false;
      for(i = 0; i < obj.pokemon.length; i++){
        pokemon = obj.pokemon[i];
        if(requestedPokemon === pokemon.name.toLowerCase()){
          response.status(200);
          pokemonMsg = `This is ${pokemon.name}. It is ${pokemon.height} in height
          and ${pokemon.weight} in weight. Its candy is ${pokemon.candy}. Its
          candy count is ${pokemon.candy_count}. Its egg is ${pokemon.egg}. Its
          spawn chance is ${pokemon.spawn_chance}, the average spawn is
          ${pokemon.avg_spawns} and the spawn time is ${pokemon.spawn_time}.
          Its multipler is ${pokemon.multiplers}. Its weakness is ${pokemon.weaknesses}.
          Its next evolution is ${pokemon.next_evolution[0].name}`
          response.send(pokemonMsg);
          //response.send(pokemon.weight);
          found = true;
          break;
        }
      }

      if(i === obj.pokemon.length && found === false){
        response.status(404);
        response.send("Could not find information about " + requestedPokemon +
        " - Is that a new pokemon? Gotta catch em' all!");
      }
    });
  }


}

//.get is saying that when it gets that path it should give the response that is specified in the function.
app.get('/type/:type', (request, response) => { //":type" <=> request.params.type
  console.log("request.params.type: ", request.params.type);
  jsonfile.readFile(file, (err, obj) => {
    if(err){
      console.log("error: ", err);
    }
    requestedType = request.params.type.charAt(0).toUpperCase() +
    request.params.type.slice(1);
    let pokemonNames = [];
    for(let i = 0; i < obj.pokemon.length; i++){
      pokemon = obj.pokemon[i];
      let pokemonLowerCase = pokemon.type;
        if(pokemonLowerCase.includes(requestedType)){
          pokemonNames.push(pokemon.name)
        }
    }
    console.log(pokemonNames);
    response.send(`All the pokemons that are ${request.params.type} type:
      ${pokemonNames}`);
  });
});

app.get('*', handleRequest);

const PORTNUMBER = 3000;

//.listen is going to bind the application to the port on our machine.
app.listen(PORTNUMBER, function(){
  console.log("Node server is running");
});
