const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)
    const file = 'pokedex.json';
    jsonfile.readFile(file,(err,obj) => {
        let pokemonWeight;
        let i;
        for(i = 0;i<obj.pokemon.length;i++){
            if(obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()){
                pokemonWeight = obj.pokemon[i].weight;
            }
            //console.log(pokemonWeight);
        }
        response.send("Weight of  " + request.params.name + " is " + pokemonWeight);
    });
});
app.listen(3000, () =>
    console.log('~~~ Tuning in to the waves of port 3000 ~~~'));














/*
});

app.get('/', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to online pokedex!!");
});

//Listen to requests on port 3000
app.listen(3000, () =>
    console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
*/