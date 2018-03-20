const express = require('express');
const handlebars = require('express-handlebars');

const jsonfile = require('jsonfile');
const file = "pokedex.json";


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

app.get('/names/:pokemon', (request, response) => {
  // send response with some data (a string)
  	jsonfile.readFile(file, (err,obj) => {		
		const pokedex = obj.pokemon;
		let output;
		let allDetails = [];
		let notFound = true;
		let status = false;
		let showType = false;
		let evo = [];
		for(let i=0; i<pokedex.length; i++){
			if(pokedex[i].name == request.params.pokemon){
				output = pokedex[i].weight;
				for (let key in pokedex[i]){
					if(key=="next_evolution"){
						for(let k=0; k<pokedex[i][key].length;k++){
							let evoObj = pokedex[i][key][k];
							for (let name in evoObj){
								if(name == "name"){
									evo.push(evoObj[name]);
								}
							}
						}
					}
					else{
						let currAdd = key + ": " + pokedex[i][key];
						allDetails.push(currAdd);
					}
				}
				//console.log("weight:" + output);
				notFound = false
				//response.send(request.params.pokemon + " -> weight: " + output);
			}
		}

		let context = {
			name: request.params.pokemon,
			weight: output,
			wrong: notFound,
			show: status,
			details: allDetails,
			nxtEvo: evo,
			type: showType
		}
		response.render('home',context);
	});
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)

	jsonfile.readFile(file, (err,obj) => {
		const pokedex = obj.pokemon;
		let output = [];
		let status = true;
		let showType = false;
		for(let i=0; i<pokedex.length; i++){
			output.push(pokedex[i].name);
		}

		let context = {
			pokeList: output,
			show: status,
			type: showType
		}
		response.render('home',context); 
	});

	//response.send('Welcome to the online Pokedex!'); 
});

app.get('/types/:type', (request, response) => {

	jsonfile.readFile(file, (err,obj) => {
		const pokedex = obj.pokemon;
		let output = [];
		let showType = true;
		for(let i=0; i<pokedex.length; i++){
			for(let k=0; k<pokedex[i].type.length;k++){
				if(pokedex[i].type[k].toUpperCase() == request.params.type.toUpperCase()){
					output.push(pokedex[i].name);
				}
			}
		}
		let context = {
			typeList: output,
			type: showType,
			typeName: request.params.type
		}
		response.render('home',context); 
	});
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
