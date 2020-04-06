const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/pokemon/:name', (req, res) => {
   // send response with some data (a string)

   jsonfile.readFile(file, (err, obj) => {
     const pokeArray = obj.pokemon
     const query = capitalize(req.params.name)
     let result = pokeArray.find((obj) => obj.name===query)
     console.log(result)

     let output = `<h1>${query}</h1> is ${result.height} tall and ${result.weight}!`

     res.send(output);

   })
 });

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(`Welcome to the Pokedex!`);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
