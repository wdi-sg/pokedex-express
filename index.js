const express = require('express');

const jsonfile = require('jsonfile');

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
const whenRequestisReceived = (request,response) => {
  const file = 'pokedex.json'

  jsonfile.readFile(file, (err, obj) => {

    if(request.path === '/pokemon/:num'){
      let myNum = req.params[0].split("/");
      for (myNum = 0; myNum < pokemon.length; myNum++);
      response.send(pokemon.weight[i]);
    }
    // else{
    //   let name = request.params.some-name;
    //   response.status(404).send("Could not find information about" + name + "- Is that a new pokemon? Gotta catch em' all!" );
    // }


}
app.get('/pokemon/:some-name', whenRequestisReceived) => {
  // send response with some data (a string)
  response.send(pokemon.weight[i]);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
