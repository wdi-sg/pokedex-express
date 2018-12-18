const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const pokedex = 'pokedex.json'

jsonfile.readFile(pokedex,(err,obj) => {
const objPokemon = obj.pokemon;
let length = obj.pokemon.length; //length of pokemon object
    //if name cannot be found display status code 404
    app.get('/:name',(request, response) => {
        //loop in the pokemon objects
        for(let b=0; b < length ; b++) {
            if (request.params.name === objPokemon[b].name) {
                response.send(objPokemon[b].name);
            } else {
                response.send("Could not find information about <span style ='font-weight:bold;''>" + request.params.name +"</span> Is that a new pokemon? Gotta catch em' all! Status code: 404");
            }
        }
    });

});

app.listen(3000, () => console.log('~~~ Pokedex Tuning in to the waves of port 3000 ~~~'));
