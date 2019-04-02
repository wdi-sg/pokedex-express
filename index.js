const express = require('express');
// Init express app
const app = express();


const jsonfile = require('jsonfile');
const file = "pokedex.json"




//Send pokemon's weight based on user input
app.get("/pokemon/:name", (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let nameExist = false;
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (request.params.name.toLowerCase() === obj.pokemon[i].name.toLowerCase()) {
                response.send(`${obj.pokemon[i].name}'s weight is ${obj.pokemon[i].weight}`);
                nameExist = true;
            }
        }
        if (!nameExist) {
            response.send(404, "Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em all!");
        }
    });
});



 //Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));