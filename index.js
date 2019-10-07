const express = require('express');

const jsonfile = require('jsonfile');

const fun = require('./fun');
// Init express app
const app = express();

const file = 'pokedex.json';

app.get('/', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to the online Pokedex!");
});

app.get('/:fun/:value', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err, obj) => {
    let output = fun[request.params.fun](obj, request.params.value);
    if (output === "") {
      response.status(404).send(`Could not find information about ${request.params.value} - Is that new? Gotta catch em' all!`);
    } else {
      response.send(output);
    }
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));