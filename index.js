const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
var pokemon;
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
 //getting obj.pokemon arrary of objects
jsonfile.readFile(file, function (err,obj){
	if(err){console.error(err)}
		//console.dir(obj);
		pokemon = obj["pokemon"];
		//console.log(pokemon[0].name);
})

// // Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

var startWeb = (request, response) => {
  // send response with some data (a string)
	let exist = false;
	console.log(request.path);
	console.log(pokemon[28].name.replace(/\s/g, ''));
	for(var i=0;i<pokemon.length;i++){
		//some pokemons have spaces in their names
		var pokeName = pokemon[i].name.replace(/\s/g, '');
	  	if("/"+pokeName.toLowerCase() == request.path.toLowerCase()){
	  		response.status(200).send("<html><body><div>This is "+pokemon[i].name+ ", he is "+pokemon[i].weight+" in weight!<div><img src='"+pokemon[i].img+"'></body></html>");
	  		exist = true;
	  	}
  	}
	if(exist==false&&request.path!="/"){
	  	var name = request.path.split("/")[1];
	  	response.status(404).send("Could not find "+name+". Is that a new pokemon? Gotta catch em' all!");
	}
	if(request.path=="/"){
	  	response.status(200).send("Welcome to Pokedex!");
	}
 }
	
var typePoke = (request, response ) => {
	console.log(request.path);
	var list = "<ul>";
	for(var i=0;i<pokemon.length;i++){
		for(var j=0;j<pokemon[i].type.length;j++){
			if(pokemon[i].type[j].toLowerCase() == request.path.split("/")[2]){
				list = list+"<li>"+pokemon[i].name+"</li>";
			}
		}
	}
	response.send("<html><style> li {color: blue;}</style><body>"+list+"</ul></body></html>");
}

var linkPoke = (request, response ) => {
	console.log(request.path);
	var list = "<ul>";
	for(var i=0;i<pokemon.length;i++){
		list=list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
	}
	var htmlBuild = "<html><body><h1>Welcome to Pokedex</h1><div>" + list +"</div></body></html>";
	response.status(200).send(htmlBuild);
}

var linkPoke = (request, response ) => {
	console.log(request.path);
	var list = "<ul>";
	for(var i=0;i<pokemon.length;i++){
		list=list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
	}
	var htmlBuild = "<html><body><h1>Welcome to Pokedex</h1><div>" + list +"</div></body></html>";
	response.status(200).send(htmlBuild);
}

var spawnChance = (request, response ) => {
	console.log(request.path);
	var list = "<ul>";

	for(var i=0;i<pokemon.length;i++){
		if(request.query.compare=="more"&&pokemon[i].spawn_chance>parseInt(request.query.amount)){
			list = list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
		}
		if(request.query.compare=="less"&&pokemon[i].spawn_chance<parseInt(request.query.amount)){
			list = list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
		}
	}
	if (list == "<ul>"){
		response.status(404).send("retype the inputs");
	}
	var htmlBuild = "<html><body><h1>Welcome to Pokedex</h1>" + list +"</ul></body></html>";
	response.status(200).send(htmlBuild);
}

var avgSpawns = (request, response ) => {
	console.log(request.path);
	var list = "<ul>";

	for(var i=0;i<pokemon.length;i++){
		if(request.query.compare=="more"&&pokemon[i].avg_spawns>parseInt(request.query.amount)){
			list = list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
		}
		if(request.query.compare=="less"&&pokemon[i].avg_spawns<parseInt(request.query.amount)){
			list = list+"<li><a href='/"+pokemon[i].name+"'>"+pokemon[i].name+"</a></li>";
		}
	}
	if (list == "<ul>"){
		response.status(404).send("retype the inputs");
	}
	var htmlBuild = "<html><body><h1>Welcome to Pokedex</h1>" + list +"</ul></body></html>";
	response.status(200).send(htmlBuild);
}
// need the /* to capture everything after type. if just '/type' it will just catch /type
app.get('/search/spawn_chance', spawnChance);
app.get('/search/avg_spawns', avgSpawns);
app.get('/type/*', typePoke);
app.get('/', linkPoke);
app.get('*', startWeb);

// /**
//  * ===================================
//  * Listen to requests on port 3000
//  * ===================================
//  */


const PORT = 3000;

app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
