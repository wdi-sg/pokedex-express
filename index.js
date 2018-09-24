const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const file = 'pokedex.json';

var pokeObj;
var result;

jsonfile.readFile (file, function(err, obj) {

    console.log(file);

    pokeObj = obj.pokemon;

    // var resultFile = 'result.json';

//     for (i in pokeObj) {
//     console.log(pokeObj[i].name.toLowerCase());
//     }


//     if (process.argv[2] === pokeObj[i].name.toLowerCase())
//     {
//         result = (`${pokeObj[i].name} is ${pokeObj[i].weight}!`);
//     }


// jsonfile.writeFile(resultFile, result, function (err) {


// });
});

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {




    var req = request.path.substr(1).toLowerCase();

    for (i in pokeObj) {

        if (req.includes(pokeObj[i].name.toLowerCase())) {

                var pokeWeight = pokeObj[i].weight;

                response.status(200);

                response.send(`${pokeObj[i].name} is ${pokeWeight}!`);


        } else if (request.path == "/") {
            response.status(200);

            response.send(`Welcome to Pokedex!`);

        } else {
            response.status(404);

            response.send(`Could not find information about ${request.path.substr(1)} - Is that a new pokemon? Gotta catch em' all!`);
        }
    };



  // send response with some data (a string)
  // response.send(request.path);
  console.log(request.path);
});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
