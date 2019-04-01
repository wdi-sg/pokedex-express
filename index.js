const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

//Deliverables
app.get("/:pokemonName", (request, response) => {

    let pokemonName = (request.params.pokemonName).toLowerCase();

    jsonfile.readFile(file, (err, obj) => {

        let isFound = false;

        for (i=0; i<obj.pokemon.length; i++) {
            if (pokemonName === (obj.pokemon[i].name).toLowerCase()) {
                response.send("Pokemon: " + obj.pokemon[i].name + ", Weight: " + obj.pokemon[i].weight);
                isFound = true;
            }
        };

            if (!isFound) {
                response.send("Pokemon not found");
            }
    });
});


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



// app.get("/pokemon/:number", (request, response) => {

//   let pokemonNumber = request.params.number;


  //jsonfile.readFile()
  // when you read the file, get the specific pokemon that is being requested

  //response.send(pokemon that was requested);
// });