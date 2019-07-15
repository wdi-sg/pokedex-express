const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
let foundPokemon = 0;

/**
 * ===================================
 * Routes
 * ===================================
 */

// If no valid input provided
app.get('/', (request, response) => {
  // send response with some data (a string)
  //response.send(request.path);
  response.send("Welcome to the online Pokdex!");
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


const file = 'pokedex.json';


app.get('/pokemon/:pokemonName', (request, response)=>{
	  
	jsonfile.readFile(file, (err, obj)=> {
        if (err){
            console.log('Error on reading file: ${err}');
        } else {
            for (let i=0; i<obj['pokemon'].length; i++){
				
                if (obj['pokemon'][i]['name'] == request.params.pokemonName){
                    response.send('The weight of ' + request.params.pokemonName + "is " + obj['pokemon'][i]['weight'] + '; multipliers is ' + obj['pokemon'][i]['multipliers'] + '; weaknesses is ' + obj['pokemon'][i]['weaknesses'] );
					foundPokemon = 1;
                } 
            }
			if (!foundPokemon)
			{
				response.status(404).send("Could not find information about " +  request.params.pokemonName + " - Is that a new pokemon? Gotta catch em' all!");
			}
        }
    }); 
});

app.get('/pokemon/type/:pokemonType', (request, response)=>{
	  
	jsonfile.readFile(file, (err, obj)=> {
        if (err){
            console.log('Error on reading file: ${err}');
        } else {
            let pokemonList = "";
            for (let i=0; i<obj['pokemon'].length; i++){
				for (let j=0; j<obj['pokemon'][i]['type'].length; j++)
				{
					if ( obj['pokemon'][i]['type'][j] == request.params.pokemonType){
						pokemonList += obj['pokemon'][i]['name'] + "; ";
                    }
                } 
            }
			response.send(pokemonList);
        }
    }); 
});


app.get('/pokemon/nextevolution/:next_evolution', (request, response)=>{
	  
	jsonfile.readFile(file, (err, obj)=> {
        if (err){
            console.log('Error on reading file: ${err}');
        } else {
            let pokemonList = "";
            for (let i=0; i<obj['pokemon'].length; i++){
				
				
				if (obj['pokemon'][i].hasOwnProperty('next_evolution'))
				{
					
					
					for (let j=0; j<obj['pokemon'][i]['next_evolution'].length; j++)
					{
					
						let currentEvolution = obj['pokemon'][i]['next_evolution'][j]['name'];
						
						if (currentEvolution == request.params.next_evolution)
						{
							pokemonList += obj['pokemon'][i]['name'] + "; ";
						
						}
					}
				}
				
            }
			response.send(pokemonList);
			
        }
    }); 
});


app.get('/pokemon/weaknesses/:weaknesses', (request, response)=>{
	jsonfile.readFile(file, (err, obj)=> {
        if (err){
            console.log('Error on reading file: ${err}');
        } else {
            let pokemonList = "";
            for (let i=0; i<obj['pokemon'].length; i++){
				for (let j=0; j<obj['pokemon'][i]['weaknesses'].length; j++)
				{
					if ( obj['pokemon'][i]['weaknesses'][j] == request.params.weaknesses){
						pokemonList += obj['pokemon'][i]['name'] + "; ";
                    }
                } 
            }
			response.send(pokemonList);
        }
    }); 
});



