const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

var pokemonsArr = [];
var pokemonsWeight = [];

jsonfile.readFile(file, function(err, obj){
  if(err){
    console.log('error is: ', err);
  }
  for(let i = 0; i < obj.pokemon.length; i++){
    let pokemon = obj.pokemon[i].name;
    let pokemonWg = obj.pokemon[i].weight
    pokemonsArr.push(pokemon);
    pokemonsWeight.push(pokemonWg);

  }
});

app.get('*', (request, response) => {

for(let i = 0; i < pokemonsArr.length; i++) {

  if ( request.path == '/foo' ){
  response.send('foofoofoo');

  } else if ( request.path == '/' + pokemonsArr[i] ) {
    response.send('this is ' + pokemonsArr[i]);

  } else{
  response.send(pokemonsArr);
}
}
});

app.listen(3001);
/*
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
function sendPokemon(req, res) {
    console.log("HERE");
    for (let i = 0; i < file.length; i++)
        if (obj.pokemon[i].name == req)
            console.log("2" + obj.pokemon[i].name);
           // poke = obj.pokemon[i].weight;
  res.send(req.path == '/bulbasaur' ? '' : 'Hello there!')
}
*/