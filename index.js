console.log('js is running');
//1) think of require as a need to import something
const express = require('express');
//its the same as fs with an addition of JSON.parse which converts a string to a JSON object
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

//2) creating the express app by setting it to the app variable
var app = express();
let pokemon;

//Created functions
var createHtml = (content) => {
  let html = "<html>";
  html += "<h1>Pokedex</h1>";
  html += "<body>";
  html += "<p>"+content+"</p>";
  html += "</body>";
  html += "</html>";

  return html;
}
const getPokemonInfo = (pokemon) => {
  let content = "";
  content += "<h3> Id: "+pokemon.id+"</h3>";
  content += "<h3> Num:"+pokemon.num+"</h3>";
  content += "<h3> Name: "+pokemon.name+"</h3>";
  content += '<img src="'+pokemon.img+'"/>';
  content += "<ul> Type: ";
  pokemon.type.forEach(type => {
    content += "<li>"+type+"</li>";
  });
  content += "</ul>";
  content += "<h3> Height: "+pokemon.height+"</h3>";
  content += "<h3> Weight: "+pokemon.weight+"</h3>";
  content += "<h3> Candy:"+pokemon.candy+"</h3>";
  content += "<h3>"+pokemon.candy_count+"</h3>";
  content += "<h3>"+pokemon.egg+"</h3>";
  content += "<h3>"+pokemon.spawn_chance+"</h3>";
  content += "<h3>"+pokemon.avg_spawns+"</h3>";
  content += "<h3>"+pokemon.spawn_time+"</h3>";
  content += "<ul>";
  pokemon.multipliers.forEach((multipliers) => {
    content += "<li>"+multipliers+"</li>"
  });
  content += "</ul>";
  pokemon.weaknesses.forEach((weaknesses) => {
    content += "<li>"+weaknesses+"</li>"
  });
  content += "</ul>";
  content += "</ul>";
  pokemon.next_evolution.forEach((next_evolution) => {
    content += "<li>"+next_evolution+"</li>"
  });
  content += "</ul>";
  return content;
}

//(1)url (2)function that tells express what to send back to the person making the request.
var handleRequest = (request, response) => {

  console.log("request.path: ", request.path.split('/')[1]);
  let requestedPokemon = request.path.split('/')[1];
  let outputs;

  if(request.path === "/"){
    console.log(request.path);
    response.status(200);
    outputs = "Welcome to the online Pokedex!";
    response.send(createHtml(outputs));
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
          console.log(pokemon);
          console.log(pokemon.id);
          outputs = getPokemonInfo(pokemon);
          console.log(outputs);
          response.send(createHtml(outputs));
          //response.send(pokemon.weight);
          found = true;
          break;
        }
      }

      if(i === obj.pokemon.length && found === false){
        response.status(404);
        outputs = "Could not find information about " + requestedPokemon +
        " - Is that a new pokemon? Gotta catch em' all!";
        response.send(createHtml(outputs));
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
          response.status(200);
          pokemonNames.push(pokemon.name)
        }
    }
    console.log(pokemonNames);
    outputs = `All the pokemons that are ${request.params.type} type: <br>
      ${pokemonNames}`;
    response.send(createHtml(outputs));
  });
});

app.get('*', handleRequest);

const PORTNUMBER = 3000;

//.listen is going to bind the application to the port on our machine.
app.listen(PORTNUMBER, function(){
  console.log("Node server is running");
});
