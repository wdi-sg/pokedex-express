const express = require('express');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'

/**
 * ===================================
 * Routes
 * ===================================
 */

 // app.get('*', (request, response) => {
 //   // send response with some data (a string)
 //   response.send(request.path);
 // });

 app.get('', (request, response) => {
   response.send("Welcome to the online Pokdex! To use, pls type '/pokedex/' followed by 'name' of pokemon!");
 });
  app.get("/pokedex/:name", (request, response) => {
    let match = null;
    let pokemonName;
    let pokemonWeight;
    let pokemonHeight;
    let pokemonHatch;
    let pokemonNumber;
    console.log(request.params);
    console.log(request.params.name);
    let search = request.params.name.toLowerCase(); //uppercase the first letter of the search word
    jsonfile.readFile(file, (err, obj) => {
      for (let i =0; i<obj.pokemon.length; i++){
        if (search == obj.pokemon[i].name.toLowerCase()){
          pokemonName = obj.pokemon[i].name;
          pokemonWeight = obj.pokemon[i].weight;
          pokemonHeight = obj.pokemon[i].height;
          pokemonHatch = obj.pokemon[i].egg;
          pokemonNumber = obj.pokemon[i].num;
          console.log(pokemonName);
          match = true;
        } else if (match==null && (i==(obj.pokemon.length-1))){
           match = false;
         }
      }console.log(match);
       if (match == true) {
         response.send(`${pokemonName} is number ${pokemonNumber} in the pokedex. It has a height of ${pokemonHeight} and a weight of ${pokemonWeight}. Trainer needs to walk ${pokemonHatch} to hatch this pocket monster from its egg.`);//deliberately coded it this way to return the entire pokemon's data as an object
       } else if (match == false) {
            response.status(404).send(`Could not find information about ${search} - Is that a new pokemon? Gotta catch em' all!` );
        }
   })
  });

  app.get("/pokedex/type/:type", (request,response) => {
    let typeArray = [];
    let search = request.params.type.toLowerCase();
    jsonfile.readFile(file, (err,obj) => {
      for (let i=0; i<obj.pokemon.length; i++){
        console.log(i+" first loop is running");
        for (let j=0; j<obj.pokemon[i].type.length;j++){
          console.log(j+" second loop is running");
          if (search == obj.pokemon[i].type[j].toLowerCase()){
            console.log(obj.pokemon[i].type[j]);
            typeArray.push(obj.pokemon[i].name);
          }
        }
      }
      console.log(typeArray);
      console.log(typeArray.join(', '))
      response.send(typeArray.join(', '));
    });
  });

  app.get("/pokedex/weakness/:weakness", (request,response) => {
    let weaknessArr = [];
    let search = request.params.weakness.toLowerCase();
    jsonfile.readFile(file, (err,obj) => {
      for (let i=0; i<obj.pokemon.length; i++){
        console.log(i+" first loop is running");
        for (let j=0; j<obj.pokemon[i].type.length;j++){
          console.log(j+" second loop is running");
          if (search == obj.pokemon[i].weaknesses[j].toLowerCase()){
            console.log(obj.pokemon[i].weaknesses[j]);
            weaknessArr.push(obj.pokemon[i].name);
          }
        }
      }
      console.log(weaknessArr);
      console.log(weaknessArr.join(', '))
      response.send(weaknessArr.join(', '));
    });
  });

  app.get("/pokedex/nextevolution/:name", (request,response) => {
    let evoArr = [];
    let containerArr = [];
    let search = request.params.name.toLowerCase();
    jsonfile.readFile(file, (err,obj) => {
      for (let i=0; i<obj.pokemon.length; i++){
        console.log(obj.pokemon[i].name+" first loop is running");
        for (let j=0; j<obj.pokemon[i].next_evolution.length; j++){
          console.log(" second loop is running");
          checkAdult = () => {
            if(obj.pokemon[i].next_evolution = "undefined"){
              return false;
            }
          }
          containerArr = obj.pokemon[i].filter(checkAdult);
          for (let i=0; i<obj.pokemon.length; i++){
            for(let j=0; j<obj.pokemon[i].next_evolution.length;j++){
              if(search == obj.pokemon[i].next_evolution[j].toLowerCase()){
                evoArr.push(pokemon[i].name);
              }
            }
          }
        }
      }
      console.log(evoArr);
      console.log(evoArr.join(', '))
      response.send(evoArr.join(', '));
    });
  });



// }else{
//   response.send("Welcome to the online Pokdex!");
// }


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
