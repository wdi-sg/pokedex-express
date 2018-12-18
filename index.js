const express = require('express');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const jsonfile = require('jsonfile');
const file = 'pokedex.json';



// Init express app
const app = express();



app.get('/', (request, response) => {
  response.send(request.path)
});

app.get("/:name", (request, response) => {
  
    //let status = false;
    jsonfile.readFile(file, (err, obj) => {
      var pokemon = obj.pokemon;
      for (var i=0;i<pokemon.length;i++)
        {
          if (pokemon[i].name === request.params.name)
          {
            //status = true;
            //console.log(request.params);
             
            response.send("Pokemon name is " + request.params.name + "weight is "+ pokemon[i].weight);
          }
          else
          {
            response.send("Failed to find the pokemon " + request.params.name);
          }
            
        }  
       });
});



app.listen(3000);




