const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

app.get('/pokemon/:index', (request, response) => {

  

  jsonfile.readFile(file, (err, obj) => {
    console.log("Reading File");

  response.send("The Pokemon is: " + obj.pokemon[request.params.index - 1].name + "</br></br> The Weight of it is: " + obj.pokemon[request.params.index - 1].weight
  + "</br></br>The Type is " + obj.pokemon[request.params.index - 1].type + "</br></br></br>" + "<img src='" + obj.pokemon[request.params.index - 1].img + "'>"
  + "</br></br>The Height is " + obj.pokemon[request.params.index - 1].height + "</br></br> The Weaknesses is " + obj.pokemon[request.params.index - 1].weaknesses );
  });

  
});


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
