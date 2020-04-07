const express = require('express');
// Init express app
const app = express();

const jsonfile = require('jsonfile');

const fileName = 'pokedex.json'


app.get("/pokemon/:name", (request, response) => {

    jsonfile.readFile(fileName, (err, obj) =>{
    //console.log(obj.pokemon[1].name)
      let pokeDetails;

      let nameOfPokeAsked = request.params.name;
          for ( i = 0; i < obj.pokemon.length; i ++){
              if (nameOfPokeAsked === obj.pokemon[i].name){
                pokeDetails = obj.pokemon[i];
                //console.log(pokeDetails)

              }
              if ( nameOfPokeAsked == undefined){
                response.send("Could not find information about" + nameOfPokeAsked + "- Is that a new pokemon? Gotta catch em' all!")
              }
              else{
                response.send(pokeDetails);
              }

          }
      })
// send response with some data (a string)

});
//read pokedex.json


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


