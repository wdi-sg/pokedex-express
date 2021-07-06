const express = require('express');

const jsonfile = require('jsonfile');

const app = express();
const file = 'pokedex.json'

 const doPokemon = (request, response)=>{
  console.log("pokemon request");
   jsonfile.readFile(file, (err, obj) => {
     for(let i = 0;i<obj.pokemon.length;i++){
       const chosenPokemon = obj.pokemon[i].name;
       if(request.params.name.toLowerCase() === chosenPokemon.toLowerCase()){
         console.log("Name: " + obj.pokemon[i].name);
         console.log("Name: " + obj.pokemon[i].weight);
         response.send("<h1>" +"Name: "+ obj.pokemon[i].name + "<h2>" + "Weight: " + obj.pokemon[i].weight );
         // response.send("<h2>" + obj.pokemon[i].weight);
         // response.send("<h3>" + obj.pokemon[i].img);
       }
       //Have an issue where i cant add [else if statment or else statment]
       // returns an throw new Err_HTTP_HEADERS_SENT('set');



       // console.log(chosenPokemon);
       // console.log(request.params.name);
     }
   });
 };

app.get('/pokemon/:name', doPokemon);

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//target obj & keys
//create loop to search through entire obj for match
//if match  -> response.send
//if no match -> log"tryagain"
//*** Note readfile function automatically targets obj.pokemon[insert number].keys
// function to check user input vs obj for match
