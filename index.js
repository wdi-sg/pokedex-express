const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


const app = express();


app.get('/pokemon/:name', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let pokeName = "";
        let pokeWeight = "";
        let pokeFound = false;
        let pokeToFind = request.params.name;

        console.log(pokeToFind);

        //find pokeToFind in obj and return its name and weight
        for (let i = 0; i < obj.pokemon.length-1; i++) {
            if (obj.pokemon[i].name === pokeToFind) {
                pokeName = obj.pokemon[i].name;
                pokeWeight = obj.pokemon[i].weight;
                pokemonFound = true;

                console.log(obj.pokemon[i].name);
                console.log(obj.pokemon[i].weight);
            }
        }

        if (!pokeFound) {
            response.status(404).send(`<html><body><h1>Pikaboo:(</h1><br><p>Could not find information on ${pokeToFind} - Is that a new pokemon? Gotta catch em all!</p></body></html>`);
        } else if (pokeFound) {
            response.send(`<html><body><h1>${pokeName}</h1><br><p>Weight: ${pokeWeight}</p></body></html>`);
        }
    });
});


//setting port as 8080
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));