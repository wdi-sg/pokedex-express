//Configurations and setup
const jsonfile = require('jsonfile');
const file = "pokedex.json";

const express = require('express');
const app = express();


//Routes
//When valid pokemon request sent
const whenPokemonRequest = (request, response) => {

        jsonfile.readFile(file, (err, obj) => {

        request.path === "/pokemon/:index";

        for (let i = 0; i < obj['pokemon'].length; i++) {
            if (parseInt(request.params.index) === i) {
            response.send(obj['pokemon'][i - 1]);
            console.log(obj['pokemon'][i - 1]);
            // console.log(obj['pokemon'].name)
        }
      };
    });
  };

app.get("/pokemon/:index", whenPokemonRequest);



//When invalid pokemon request sent
const whenInvalidPokemonRequest = (request, response) => {

        jsonfile.readFile(file, (err, obj) => {

        request.path === "/pokemon/:random";
        let randomName = request.params.random;

        for (let i = 0; i < obj['pokemon'].length; i++) {
            if (randomName !== obj['pokemon'][i].name) {

            response.send("Could not find information about " + randomName + " - Is that a new pokemon? Gotta catch em' all!");
            console.log(randomName);
        }
      };
    });
  };

app.get("/pokemon/:random", whenInvalidPokemonRequest);


//Listen to port
app.listen(3000);



