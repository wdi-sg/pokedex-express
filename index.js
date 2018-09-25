const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();
const file = 'pokedex.json';
// var searchByName = (object, )



jsonfile.readFile(file, function(err, obj){
  if(err){
    console.log('error is: ', err);
  }
  for(let i = 0; i < obj.pokemon.length; i++){
    let pokemon = obj.pokemon[i];
    console.log(pokemon);
  }

  var searchArray = (object, pokeName) => {
    if(object.name.toLowerCase() === pokeName){
      ob
    }
  };
});

app.get('/:name', (request, response) => {
  // send response with some data (a string)
  console.log('request path: ', request.path);
  console.log('request params: ', request.params);
  response.send(request.path);
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let name = 0;
// let i = 0;
// while(request.path[i] !== undefined){
//   name += request.path[i];
//   i++;
//   console.log(name);
// }
