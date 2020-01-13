//Configurations and setup
const jsonfile = require('jsonfile');
const file = "pokedex.json";

const express = require('express');
const app = express();


//Routes

const whenPokemonRequest = (request, response) => {

        jsonfile.readFile(file, (err, obj) => {

        request.path === "/pokemon/:index";

        for (let i = 0; i < obj['pokemon'].length; i++) {
            if (parseInt(request.params.index) === i) {
            response.send(obj['pokemon'][i - 1]);
            console.log(obj['pokemon'][i - 1]);
        }
      };
    });
  };

app.get("/pokemon/:index", whenPokemonRequest);

//Listen to port
app.listen(3000);





// app.get('/pokemon/:index', whenPokemonRequest );
// const whenPokemonRequest = (request, response) => {
//   response.send(obj.['pokemon'][i]);
