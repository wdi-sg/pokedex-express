const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json'

jsonfile.readFile(FILE, function(err, obj) {
	console.log(obj);
	var pokedex = obj;


// create an instance of the library app server
const app = express()
app.engine('handlebars', handlebars());
// this line sets handlebars to be the default view engine
app.set('view engine', 'handlebars')
////////////////////////////////////


let handleRequest = (request, response) => {
  console.log("handling request");
  let pokemonName = request.params.queryName;

  for (var i=0; i<pokedex.pokemon.length; i++){
  	if (pokemonName === pokedex.pokemon[i].name){
		  var content = pokedex.pokemon[i];
   	}
  }
  response.render('home', content );
};

app.get('/name/:queryName', handleRequest);

app.listen(3000);
console.log("starting server");

});