/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = 'test.json';

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * routes involving React.js
 * ===================================
 */


 //index/GET/Display a list of pokemons
app.get('/', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const data = {'pokemon_lst': pokemon_lst}
		res.render('index', data)
	})
})

//new/GET/Display a form to create new pokemon
app.get('/pokemon/new', (req, res) => {
	res.render('form');
})

//show/GET/Display data for a single pokemon
app.get('/pokemon/:name', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const name = req.params.name
		const data = {'name': name, 'pokemon_lst': pokemon_lst}
		res.render('name', data)
	})
})

//show/GET/Display a list of pokemon of the same type
app.get('/type/:type', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
		const data = {'type': type, 'pokemon_lst': pokemon_lst}
		res.render('type', data)
	})
})

//show/GET/Display a list of pokemon of the same weakness
app.get('/weakness/:weakness', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const weakness = req.params.weakness[0].toUpperCase() + req.params.weakness.slice(1);
		const data = {'weakness': weakness, 'pokemon_lst': pokemon_lst}
		res.render('weakness', data)
	})
})

//show/GET/Display a pokemon with its previous evolution
app.get('/prevevolution/:name', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const name = req.params.name
		const data = {'name': name, 'pokemon_lst': pokemon_lst}
		res.render('prev_evol', data)
	})
})

//show/GET/Display a pokemon with its next evolution
app.get('/nextevolution/:name', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const name = req.params.name
		const data = {'name': name, 'pokemon_lst': pokemon_lst}
		res.render('next_evol', data)
	})
})

//show/GET/Display a drop down menu to sort all pokemon
app.get('/sort', (req, res) => {
	res.render('choosesort');
})

//show/GET/Display all sorted pokemons
app.get('/sorted', (req, res) => {
	jsonfile.readFile('test.json', (err, obj) => {
		const pokemon_lst = obj.pokemon;
		const query = req.query.option;
		const data = {'query': query, 'pokemon_lst': pokemon_lst};
		res.render('sort', data);
	})

})

//create/POST/Accept a new request for creating a pokemon
app.post('/pokemon', (req, res) => {
	let missing_info = false;
	const new_pokemon = req.body;
	let missing_msg = ['Please fill in the following details: '];
	for (key in new_pokemon) {
		if (new_pokemon[key] === ''){
		missing_info = true;
		missing_msg.push(`${key} `);
		}
	}
	//missing inputs
	if (missing_info) {
		res.render('form', {error: missing_msg})
	} else {
		//check for duplicates with readFile
		jsonfile.readFile(file, (err, obj) => {
			const pokemon_lst = obj.pokemon;
			for (pokemon of pokemon_lst ){
				if (parseInt(new_pokemon.id) === pokemon.id){
					return res.render('form', {error:  `Pokemon id ${pokemon.id} already exists! Please re-enter pokemon`})
				} else if (new_pokemon.num === pokemon.num){
					return res.render('form', {error:  `Pokemon number ${pokemon.num} already exists! Please re-enter pokemon`})
				} else if (new_pokemon.name === pokemon.name){
					return res.render('form', {error:  `Pokemon with name: ${pokemon.name} already exists! Please re-enter pokemon`})
				}		
			}
			//no errors; prepare to writeFile
			new_pokemon.id = pokemon_lst.length + 1;
			if (new_pokemon.id < 10){
				new_pokemon.num = `00${new_pokemon.id}`					
			} else if (new_pokemon.id < 100){
				new_pokemon.num = `0${new_pokemon.id}`
			} else {
				new_pokemon.num = `${new_pokemon.id}`
			};
			pokemon_lst.push(new_pokemon)
			jsonfile.writeFile(file, obj, (err) => {
				err ? console.log(err): "";
				res.redirect('/pokemon/'+new_pokemon.name)
			})
		})
	}
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'))
