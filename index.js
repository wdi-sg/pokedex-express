const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

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

jsonfile.readFile(file, (err, obj) => {

//console.log(pokeMons);
 app.get('/', (request, response) => {
  // send response with some data (a string)

console.log(request.params);
   // console.log(file.length);
    for (let i = 0; i < file.length; i++)
        if (obj.pokemon[i].name == 'Wartortle')
            response.send(obj.pokemon[i]);
        //    console.log(obj.pokemon[i].weaknesses);
  //  console.log(obj.pokemon[7].name == "Ivysaur");
  //  console.log(obj.pokemon[7]);

  //response.send(file);
});

app.get('/:name', (request, response) => {
  // send response with some data (a string)
//  response.send(request.path);
 //console.log(request.params.name);

    for (let i = 0; i < file.length; i++)
        if (obj.pokemon[i].name.toLowerCase() == request.params.name)
            response.send(obj.pokemon[i].weight);
        //console.log("1" + obj.pokemon[i].name);
        //if (obj.pokemon[i].name == request)
           // poke = obj.pokemon[i].weight;
  //res.send(req.path == '/bulbasaur' ? '' : 'Hello there!')
});

function sendPokemon(req, res) {
    console.log("HERE");
    for (let i = 0; i < file.length; i++)
        if (obj.pokemon[i].name == req)
            console.log("2" + obj.pokemon[i].name);
           // poke = obj.pokemon[i].weight;
  //res.send(req.path == '/bulbasaur' ? '' : 'Hello there!')
}

app.get('/:name', sendPokemon); //(request, response) => {
  // send response with some data (a string)
   // console.log(request.path);
//        sendPokemon

//});

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});
})

/*function sendPokemon(req, res) {
    console.log("HERE");
    for (let i = 0; i < file.length; i++)
        if (obj.pokemon[i].name == req)
            console.log("2" + obj.pokemon[i].name);
           // poke = obj.pokemon[i].weight;
  //res.send(req.path == '/bulbasaur' ? '' : 'Hello there!')
}*/
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
