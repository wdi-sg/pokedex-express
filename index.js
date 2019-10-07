const express = require('express');

const jsonfile = require('jsonfile');
const app = express();

const selectPoke = (request, response) => {
    console.log("choosing pokemon")
    const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("ERR", err);
        } else {
            console.log("Detected" + obj.pokemon[0]);
            let firstPoke = obj.pokemon[0];
            console.log("You chose" + firstPoke.name)
            response.send("Whoa " + firstPoke.name);
        }
    })
};

app.get('/pokemon-example/:name', selectPoke);


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));