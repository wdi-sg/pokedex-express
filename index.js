//Require - Packages
const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json'

// Init read - Note Async
jsonfile.readFile(FILE, function(err, obj) {
	
var pokedex = obj;
// Store entire pokedex into obj

// create an instance of the library app server
const app = express();

// this line sets handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars')
////////////////////////////////////


//// ROUTES //////
app.get('/', (request,response) => {
  response.render('home', { pokemon: pokedex.pokemon } );
  // NOTE that render only accepts an object... sigh..
});

app.get('/name/:queryName', (request, response) => {
  console.log("Handling Name request");
  let pokemonName = request.params.queryName;

  for (var i=0; i<pokedex.pokemon.length; i++){
  	if (pokemonName === pokedex.pokemon[i].name){
		  var content = pokedex.pokemon[i];
   	}
  }
  console.log(content);
  if (content == undefined){
    response.status(404).render('404', { name : pokemonName });
  } else {
  response.render('pokemon', content );
  }
});

app.get('/type/:queryName', (request, response) => {
  console.log("Handling Type request");
  let pokemonType = request.params.queryName;

  var content = 
  {
    type : undefined,
    pokemonName : []
  }

  for (var i=0; i<pokedex.pokemon.length; i++){
    for (var k=0; k<pokedex.pokemon[i].type.length; k++){
      if (pokemonType === pokedex.pokemon[i].type[k]){
        content.type = pokemonType;
        content.pokemonName.push( { name : pokedex.pokemon[i].name} );
      }
    }
  }

  console.log(content);
  if (content.type == undefined){
    response.status(404).render('404', { name : pokemonType });
  } else {

  response.render('type', content );
  }
});

app.listen(3000);
console.log("starting server");

}); // Enclosed within READjson.