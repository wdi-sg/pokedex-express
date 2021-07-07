const express = require('express');
const app = express();

const jsonfile = require('jsonfile');

let pokeName;
let pokeWeight;



let showPokemon = function(request,response) {
const file = 'pokedex.json';
    jsonfile.readFile(file, (err, obj) => {
    let errorPoke = false;
        for (var i = 0; i < obj.pokemon.length; i++){
            pokeName = obj.pokemon[i].name;
            pokeWeight = obj.pokemon[i].weight;
            if (pokeName === request.params.name){
                errorPoke = true;
                response.send("My name is " + pokeName + ". " + "My weight is " + pokeWeight + ".")
                }
        }
            if (errorPoke === false){
                response.status(404).send("Could not find information about " + request.params.name + "- Is this the new pokemon? Gotta catch 'em all!");
            }
    });

};

app.get("/pokedex/:name", (showPokemon));
app.get("/pokedex/:weight", (showPokemon));

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));