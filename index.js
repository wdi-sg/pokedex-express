const express = require('express');

const app = express();

const jsonfile = require('jsonfile')

const file = 'pokedex.json'

app.get("/pokemon/:name", (req, res) => {
    console.log(req.params.name)
    const arr = obj["pokemon"]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]["name"].toLowerCase() === pokemonName.toLowerCase()) {
        const weight = arr[i]["weight"]
        res.send(`This is ${pokemonName} and its weight is ${weight} `)
    }
    }
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));