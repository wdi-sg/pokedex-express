const express = require('express');

const app = express();

const jsonfile = require('jsonfile')

const file = 'pokedex.json'


jsonfile.readFile(file, (err, obj) => {
    app.get('/:pokemon', (req, res) => {
        const pokemonName = req.params.pokemon;
        const arr = obj["pokemon"];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["name"].toLowerCase() === pokemonName.toLowerCase()) {
                const weight = arr[i]["weight"];
                res.send(`${pokemonName}'s weight is ${weight}`);
            } else if (arr[i]["name"].toLowerCase() !== pokemonName.toLowerCase()) {
                res.status(404).send(`Could not find information about ${pokemonName}. Is that a new pokemon? Gotta catch em' all!`);
    }
}
        })

});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));