const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
// const pokedex = require('pokedex.json');


const app = express();

//allows pokedex file to be read
jsonfile.readFile(file, (err, obj) => {

    //can move the below into a callback function?
    app.get('/pokemon/:name', (request, response) => {

        //if path exists, do this
            console.log('Searching for Pokemon!')

            let pokeToFind = request.params.name;
            console.log(pokeToFind);

            //find pokeToFind in obj and return its name and weight
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].name === pokeToFind) {
                    console.log(obj.pokemon[i].name);
                    console.log(obj.pokemon[i].weight);
                    // get data from the file
                    let pokeName = obj.pokemon[i].name;
                    let pokeWeight = obj.pokemon[i].weight;
                    response.send(`<html><body><h1>${pokeName}</h1><br><p>Weight: ${pokeWeight}</p></body></html>`);
                }
            }
    });
})

//setting port as 8080
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));