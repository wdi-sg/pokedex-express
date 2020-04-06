const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        console.log(obj.pokemon.length);
    });


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


/**
 * ===================================
 * Routes
 * ===================================
 */




// app.get('/pokemon/:x', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         response.send(obj.pokemon[parseInt(request.params.x)].name);
//     });
// });

app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++){
            if(obj.pokemon[i].name.toLowerCase() == request.params.name.toLowerCase()){
                response.send("Weight: "+obj.pokemon[i].weight);
            }
        };
    });
});

app.get('*', (request, response) => {
    response.send(request.path);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));