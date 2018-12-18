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
            console.log("value of exist before the loop: " + exist);
        for (let b=0; b < objOfPokemon.length ; b++) {
            //if name in path is equal as curent pokmon name
            //name exist in the pokemen object, exist is TRUE
            //response send the weight of the pokemon
            //change exist back to false then exit
            if (request.params.name === objOfPokemon[b].name) {
            exist = true;
            response.send(objOfPokemon[b].name + ' weight is ' + objOfPokemon[b].weight);
            console.log('It is ' + objOfPokemon[b].name);
            console.log("value of exist after the loop: " + exist);
            exist= false;
            console.log("value of exist after print weight and set exist to false :" + exist);
            return;
            }
        }
            //if pokemon name did not exist in pokemon obj
            // exist is still false, display response send status 404
        if (exist === false) {
            response.send("Could not find information about " + request.params.name + " Is that a new pokomen? Gotta catch em' all! STATUS CODE: 404");
            console.log("no such name");
            return;
            }
     });

     app.get("/",(request, response) => {
        response.send("Welcome to the online Pokedex!");

     });
});

app.listen(3000, () => console.log('~~~ Pokedex Tuning in to the waves of port 3000 ~~~'));



