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
      console.log("what is here " + nameOfPokeAsked);

          for (let i = 0; i < obj.pokemon.length; i++){
              let content = obj.pokemon[i].name.toLowerCase();
              console.log(content);
              if (nameOfPokeAsked === content){
                pokeDetails = obj.pokemon[i];
                console.log("not again!")
                response.send(pokeDetails);
              }
          }
              if( nameOfPokeAsked == undefined){
                response.send("Could not find information about" + nameOfPokeAsked + "- Is that a new pokemon? Gotta catch em' all!")
                console.log("go go go")
              }
              else{
                console.log("Gin tonic")
              }


      })
// send response with some data (a string)

});
//read pokedex.json


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


