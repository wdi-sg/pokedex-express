const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// *
//  * ===================================
//  * Routes
//  * ===================================
const getInfo = function(request, response){
    const file = "pokedex.json";
    let input = request.params.name;
    console.log("Before read");

    jsonfile.readFile(file,(err,obj) => {
        const pokedex = obj.pokemon;
        console.log("Reading file");

        for (var i = 0; i < pokedex.length; i++) {
            let name = pokedex[i].name;
            let weight = pokedex[i].weight
            if (name.toLowerCase() == input.toLowerCase()) {//browser will automatically set things to lower case
                response.send("Pokemon name: " + name + " Weight: " + weight)
            }
        }
    })
}
// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });``
app.get('/pokemon/:name', getInfo)







/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));