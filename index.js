const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const pokedex = 'pokedex.json'

jsonfile.readFile(pokedex,(err,obj) => {
const objPokemon = obj.pokemon;

    app.get('/bulbasaur', (request, response) => {
      //length of pokemon object
      let length = obj.pokemon.length;


      for (let i=0; i < length; i++) {
        if (objPokemon[i].name === "Bulbasaur") {
            response.send("Bulbasaur weight is  " + objPokemon[i].weight);
        }

      }

    });
});





app.listen(3000, () => console.log('~~~ Pokedex Tuning in to the waves of port 3000 ~~~'));
