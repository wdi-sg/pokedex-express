const express = require('express');
const handlebars = require('express-handlebars');
const FILE = 'pokedex.json'

const jsonfile = require('jsonfile');

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
//  */
// Answer for Part1==============================
//===============================================
//===============================================
// var weight 

// app.get('/names/:name', (request, response) => {

// 	jsonfile.readFile(FILE, function(err, obj) {
// 		var name = request.params.name;
	
// 		// obj is the podedex json file
// 		for(let i=0; i<obj.pokemon.length; i++){
// 			if(obj.pokemon[i].name===name){
// 				console.log(obj.pokemon[i].name)
// 				weight = obj.pokemon[i].weight;
// 				console.log("weight", weight);
// 			}
// 		}
// 	response.send("The pokemon's weight is "+ weight);
// })

  
// });


// ==============================================
//===============================================
//===============================Answer for Part1

// Answer for Part2&3============================
//===============================================
//===============================================


// app.get('/names/:name', (request, response) => {
	
// 	jsonfile.readFile(FILE, function(err, obj) {
// 		var name = request.params.name;
		
// 		for(let i=0; i<obj.pokemon.length; i++){
// 			if(obj.pokemon[i].name===name){
// 				var pokemonWeight = obj.pokemon[i].weight;
// 				var ptype = obj.pokemon[i].type;
// 				var pheight = obj.pokemon[i].height;
// 				var pNextEvolution = obj.pokemon[i].next_evolution[0].name;
// 				var pimage = obj.pokemon[i].img

// 				//problematic area	
// 			}
// 		}

// 			if(pokemonWeight===undefined){
// 				response.render('nopokemon', {name: name});
// 			} else {
// 				var context = {
// 					name: name,
// 					weight: pokemonWeight,
// 					height: pheight,
// 					type: ptype,
// 					evolution: pNextEvolution,
// 					image :pimage 


// 				};
// 				response.render('home', context);}
//   // send response with some data (a HTML file) 	    
//     })
// })

// ==============================================
//===============================================
//===============================Answer for Part2&3

// Answer for Part4==============================
//===============================================
//===============================================

//TBC

app.get('/type/:types', (request, response) => {
	
	jsonfile.readFile(FILE, function(err, obj) {
		var type = request.params.types;
		
		for(let i=0; j=0 i<obj.pokemon.length; j<obj.pokemon[i].type.length; i++; j++)
			{if(obj.pokemon[i].type[j]===type){
				var name[i] = obj.pokemon[i];
			}
			console.log(obj.pokemon[i]);}

				var context ={
					type: 
				};

				response.render('home', context);}
				
		)})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


