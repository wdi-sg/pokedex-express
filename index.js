

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const express = require('express');
const app = express();


/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, respo) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });
app.get('/', (req, res) => {
    res.send('<h1>Poke Land!</h1>');
});

app.get('/pokedex/:pokemon/:name', (req, res) => {
  response.send("Hello " + req.params.name + " " + req.params.name)
});


app.get('/pokemon/:type')




//
// app.get('/pokedex/:pokemon', (req, res)=>{
// //do a readFile/
//   jsonfile.readFile(file, (err,obj) => {
//     let pokeDetails = '';
// //get request to pokemon
//     for(var i = 0; i < pokemon.length; i++){
//
//     }
// })
//
//
//   const data = "";
//   // get data from the file
//
//   response.send("stuff");
// });




const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server started on port 3000`));
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
