
const express = require('express');
// Init express app
const app = express();


const jsonfile = require('jsonfile');
const file = "pokedex.json"

app.get("/pokemon/:name", (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        for (i = 0; i < obj.pokemon.length; i++) {
            if (request.params.name === obj.pokemon[i].name) {
                response.send(`${obj.pokemon[i].name}'s weight is ${obj.pokemon[i].weight}`)
            }
        }
    });
});

// app.get('/pokemon/:name', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         for (i = 0; i < obj.pokemon.length; i++) {
//             if (request.params.name === obj.pokemon[i].name) {
//             response.send(`${obj.pokemon[i].name}'s weight is ${obj.pokemon[i].weight}`)
//         }
//         }
// });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));