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
                response.send(
                    "Name: " + obj.pokemon[i].name + "<br>" +
                    "Weight: " + obj.pokemon[i].weight + "<br>" +
                    "Height: " + obj.pokemon[i].height + "<br>" +
                    "<img src='" + obj.pokemon[i].img + "'>" + "<br>" +
                    "Type: " + obj.pokemon[i].type
                    );
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