const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

const app = express();

app.get('/pokemon/:name', (request, response) => {

  let pokeName = request.params.name
  let pokeFound = false


    jsonfile.readFile(file, (err, obj) => {

        console.log("reading")

          for (let i=0; i<obj.pokemon.length; i++){

            var dataName = obj.pokemon[i].name
            var dataIndex = obj.pokemon[i]

                 if (pokeName === dataName || pokeName === dataName.toLowerCase() ){
                    response.send(`This is ${pokeName}! ${pokeName}'s ID number is ${dataIndex.id}. ${pokeName}'s height is ${dataIndex.height} and ${pokeName}'s weight is ${dataIndex.weight}.`)
                    pokeFound = true
                }
          }

          if (pokeFound === false){
            response.send (`Could not find information about ${pokeName}. Is that a new pokemon? Gotta catch em' all!`)
          }


          jsonfile.writeFile(file, obj, {spaces:2},(err) => {
            console.log(err)
          });
    });
});









app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));