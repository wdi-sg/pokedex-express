const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const pokedex = 'pokedex.json';
let objOfPokemon = [];

jsonfile.readFile(pokedex,(err,obj) => {
objOfPokemon = obj.pokemon;

    //if name cannot be found display status code 404
    app.get("/:name",(request, response) => {
        let exist = false;
        //loop in the pokemon objects
        for (let b=0; b < objOfPokemon.length ; b++) {
            //if name in path is equal as curent pokmon name
            //name exist in the pokemen object, exist is TRUE
            //response send the weight of the pokemon
            //change exist back to false then exit
            if (request.params.name === objOfPokemon[b].name) {
            exist = true;
            response.send('This is ' + objOfPokemon[b].name + ' it is ' + objOfPokemon[b].weight + ' in weight! ' + objOfPokemon[b].height + ' in height!');
            exist= false;
            return;
            }
        }
            //if pokemon name did not exist in pokemon obj
            // exist is still false, display response send status 404
        if (exist === false) {
            response.send("Could not find information about " + request.params.name + " Is that a new pokomen? Gotta catch em' all! STATUS CODE: 404");
            return;
            }
     });

     app.get("/",(request, response) => {
        response.send("Welcome to the online Pokedex!");
     });

     //To continue some other time

     // app.get("/type/:typename",(request, response) => {
     //    let typeArray = [];
     //    for(let c=0; c < objOfPokemon; c++) {

     //        if (request.params.typename === )
     //    }
     //    response.send("Welcome to the online Pokedex!");
     // });


});

app.listen(3000, () => console.log('~~~ Pokedex Tuning in to the waves of port 3000 ~~~'));



