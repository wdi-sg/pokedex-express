const express = require('express');
const handlebars = require('express-handlebars');

// * Return a string response "Welcome to the online Pokedex!" when a request for the root route (`/`) is received
const jsonfile = require('jsonfile');
const pokemonFile = "pokedex.json"
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Q1
// app.get(('/'), (request,response) => {
// 	response.send("Welcome to the online Pokedex");
// });

// Q2
//  app.get('/names/:pokemon', (request, response) => {
//   // send response with some data (a string)
//   var pokemonName = request.params.pokemon;
//   var pokemonWeight;
//   jsonfile.readFile(pokemonFile,function(err,obj){
//   	var pokemonItem=obj["pokemon"];
//   	for(i=0;i<pokemonItem.length;i++){
//   		if(pokemonItem[i]["name"]==pokemonName){
//   			pokemonWeight=pokemonItem[i]["weight"];
//   			response.send(pokemonWeight);
//   		};
//   	}
//   });
// });

// Q3
// app.get('/names/:pokemon', (request, response) => {
//   // send response with some data (a HTML file)
//   jsonfile.readFile(pokemonFile,function(err,obj){
//   	var pokemonItem=obj["pokemon"];
//   	var pokemonName=request.params.pokemon;
//   	for(i=0;i<pokemonItem.length;i++){
//   		if(pokemonItem[i]["name"]==pokemonName){
//   			var pokemonWeight=pokemonItem[i]["weight"];
//   		};
//   	}
//   	var context = {
//   		introName: "online Pokedex",
//   		pokemonName: pokemonName,
//   		pokemonWeight: pokemonWeight
//   	};
//   	response.render('home',context);
//   });
// });


//Q4
// app.get('/names/:pokemon', (request, response) => {
//   // send response with some data (a HTML file)
//   jsonfile.readFile(pokemonFile,function(err,obj){
//   	var pokemonItem=obj["pokemon"];
//   	var pokemonName=request.params.pokemon;
//   	for(i=0;i<pokemonItem.length;i++){
//   		if(pokemonItem[i]["name"]==pokemonName){
//   			var pokemonWeight=pokemonItem[i]["weight"];
//   			var context = {
//   				introName: "online Pokedex",
//   				pokemonName: pokemonName,
//   				pokemonWeight: pokemonWeight
//   			};
//   			response.render('home',context);
//   		}else{
//   			context = {
//   				pokemonName: pokemonName
//   			};
//   			response.render('q4',context);
//   		}
//   	};
//   });
// });

//Q5
// app.get('/',(request,response)=>{
// 	jsonfile.readFile(pokemonFile,function(err,obj){
// 		var pokemonItem=obj.pokemon;
// 		var pokemonList=[];
// 		for(i=0;i<pokemonItem.length;i++){
// 			pokemonList.push(pokemonItem[i]["name"]);
// 		}
// 		context ={
// 			pokemonList:pokemonList
// 		};
// 		response.render('q5',context);
// 	});
// });

//Q6 P1
app.get('/:pokemon',(request,response)=>{
	jsonfile.readFile(pokemonFile,(err,obj)=>{
		var pokemonName=request.params.pokemon;
		var pokemonItem=obj.pokemon;
		for(i=0;i<pokemonItem.length;i++){
			if(pokemonItem[i]["name"]==pokemonName){
				var pokemonKeys = Object.keys(pokemonItem[i])
				console.log(pokemonKeys);
				// var pokemonValues= [];
				// var pokemonPrint = [];
				for(a=0;a<pokemonKeys.length; a++){
					pokemonKeys[a]=pokemonKeys[a]+" : "+ pokemonItem[i][pokemonKeys[a]];
				};
			}
		}
		console.log(pokemonKeys);
		context={
			pokemonKey:pokemonKeys
		};
		response.render('q6',context);
	});
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
