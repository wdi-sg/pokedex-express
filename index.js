const express = require('express');

// Init express app
const app = express();

const jsonfile = require('jsonfile');

const file = 'pokedex.json';


const showPokemon = (request, response) => {
  // send response with some data (a string)

  let foundPoke = false;
  let pokeName;
  let pokeWeight;

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("ERR", err );
    }
    for (i=0; i<obj.pokemon.length; i++){
        pokeName = obj.pokemon[i].name;
        pokeWeight = obj.pokemon[i].weight;
        if(pokeName === request.params.name){
            foundPoke = true;
            response.send("<html><head><title>Pokedex</title></head><body><h1>" + pokeName+ "</h1><img src=" + obj.pokemon[i].img + "><p>" + pokeName + "'s weight is " + pokeWeight + " and height is " + obj.pokemon[i].height + " </p><p>" + pokeName + " is a " + obj.pokemon[i].type + " type Pokemon!</p>")
            // response.send("This is " + pokeName + ", it's weight is "+ pokeWeight);
            console.log(pokeName + "'s weight is "+ pokeWeight);
        }
    }
    if (foundPoke == false) {
            response.status(404).send("Could not find information about " + request.params.name + ". Is that a new pokemon? Gotta catch em' all!");
            console.log("Could not find information about " + request.params.name + ". Is that a new pokemon? Gotta catch em' all!");
        }
  });
};

const pokeType = (request, response) => {

  let pokeName;
  let pokeType;
  let pokeArray = [];

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("ERR", err );
    }
    for (i=0; i<obj.pokemon.length; i++){
        pokeName = obj.pokemon[i].name;
        for (j=0; j <obj.pokemon[i].type.length; j++){
            pokeType = obj.pokemon[i].type[j];
            if(pokeType === request.params.someType){
                pokeArray.push(pokeName);
                // response.send("<html><head><title>Pokedex</title></head><body><h1>" + pokeName+ "</h1><img src=" + pokeImg + "><p>" + pokeName + " is a " + pokeType + " type Pokemon!</p>");
                console.log(pokeName + "'s type is "+ pokeType);
            }
        }
    }
    response.send("This is a list of " + request.params.someType + " type Pokemons:\n" +pokeArray);
  });
};


const pokeWeakness = (request, response) => {

  let pokeName;
  let pokemonWeakness;
  let pokeArray = [];

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("ERR", err );
    }
    for (i=0; i<obj.pokemon.length; i++){
        pokeName = obj.pokemon[i].name;
        for (j=0; j <obj.pokemon[i].weaknesses.length; j++){
            pokemonWeakness = obj.pokemon[i].weaknesses[j];
            if(pokemonWeakness === request.params.someWeakness){
                pokeArray.push(pokeName);
                // response.send("<html><head><title>Pokedex</title></head><body><h1>" + pokeName+ "</h1><img src=" + pokeImg + "><p>" + pokeName + " is a " + pokeType + " type Pokemon!</p>");
                console.log(pokeName + " is weak against "+ pokemonWeakness);
            }
        }
    }
    response.send("This is a list of Pokemons that are weak against " + request.params.someWeakness + ":\n" +pokeArray);
  });
};



var welcomeMessage = (request, response) => {
    response.send("Welcome to online Pokedex!");
    console.log("Welcome to online Pokedex!");
};

app.get("/pokedex/:name", showPokemon);
app.get("/pokedex/type/:someType", pokeType);
app.get("/pokedex/weakness/:someWeakness", pokeWeakness);
app.get("/pokedex", welcomeMessage);




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));