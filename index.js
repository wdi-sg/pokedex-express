const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

// app.get('/pokemon/:index', (request, response) => {

  

//   jsonfile.readFile(file, (err, obj) => {
//     console.log("Reading File");

  // response.send("The Pokemon is: " + obj.pokemon[request.params.index - 1].name + "</br></br> The Weight of it is: " + obj.pokemon[request.params.index - 1].weight
  // + "</br></br>The Type is " + obj.pokemon[request.params.index - 1].type + "</br></br></br>" + "<img src='" + obj.pokemon[request.params.index - 1].img + "'>"
  // + "</br></br>The Height is " + obj.pokemon[request.params.index - 1].height + "</br></br> The Weaknesses is " + obj.pokemon[request.params.index - 1].weaknesses );
  // });
  
// });

app.get('/pokemon/:name', (request, response) => {

  jsonfile.readFile(file,(err,obj) => {
    console.log("Reading Names");

    for ( i=0; i<obj.pokemon.length; i++){
      if (request.params.name.toLowerCase() == obj.pokemon[i].name.toLowerCase()){
        response.send("The Pokemon is: " + obj.pokemon[i].name + "</br></br> The Weight of it is: " + obj.pokemon[i].weight
        + "</br></br>The Type is " + obj.pokemon[i].type + "</br></br></br>" + "<img src='" + obj.pokemon[i].img + "'>"
        + "</br></br>The Height is " + obj.pokemon[i].height + "</br></br> The Weaknesses is " + obj.pokemon[i].weaknesses );
        
      }
    }
  });
});







app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
