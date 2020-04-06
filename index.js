const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = './pokedex.json';
//obj = pokedex
//pokedex obj -> pokemon array ->each pokemon object


//routes
app.get("/", (request, response) => {
    response.send("Welcome to the online Pokedex!")
})

app.get("/pokemon/:name", (request, response) => {
  let inputName = request.params.name.toLowerCase();

  jsonfile.readFile(file, function(err, obj) {
    for (let i=0; i<obj.pokemon.length; i+=1){
        let pokemonName = obj.pokemon[i].name.toLowerCase();
        if (pokemonName === inputName){
            let target = obj.pokemon[i];
            response.send(`Found ${target.name}! Its ID is ${target.id}, its height is ${target.height}, and its weight is ${target.weight}.`)
        } else {
            response.status(404);
            response.send(`Could not find info about ${inputName} - is that a new pokemon? Gotta catch em' all!`);
        }
    }
  })
  //end jsonFile readFile
});

//list the names of all pokemon that have the specified type
app.get("/type/:type", (request, response) => {
    let inputType = request.params.type.toLowerCase();
    let arr = [];

    jsonfile.readFile(file, function(err, obj) {
        for (let i=0; i< obj.pokemon.length; i+=1){
        let pokemonType = obj.pokemon[i].type;
        for (let j=0; j<pokemonType.length; j+=1){
            let eachPokemonType = pokemonType[j].toLowerCase();
            if (eachPokemonType === inputType){
                let targetName = obj.pokemon[i].name;
                arr.push(targetName)
            }
        }
    }
    })
    //end jsonFile
    //DOESNT WORK :((((

    response.json(arr);
})


//port
const PORT = 3000;
app.listen(PORT);
console.log("listening to "+PORT);


// var jsonfile = require('jsonfile')
// var file = '/tmp/data.json'
// jsonfile.readFile(file, function(err, obj) {
//   console.dir(obj)
// })