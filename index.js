/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const app = express()
const file = 'test.json'

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
app.get('/', (req, res) => {
	res.render('Home');
})

app.post('/sort', (req, res) => {
	let sort_method = Object.values(req.body)[0]
	console.log(sort_method)
	switch(sort_method){
		case 'id':
			res.send('Page with pokemons sorted by Id!')
			break;
		case 'num':
			res.send('Page with pokemons sorted by Num!')
			break;
		case 'name':
			res.send('Page with pokemons sorted by Name!')
			break;
		case 'height':
			res.send('Page with pokemons sorted by Height!')
			break;
		case 'weight':
			res.send('Page with pokemons sorted by Weight!')
			break;
	}
})

app.get('/pokemon/new', (req, res) => {
	res.render('form');
})

app.post('/pokemon', (req, res) => {
	let missing_info = false;
	let new_pokemon = req.body;
	let missing_msg = ['Please fill in the following details: '];
	for (key in new_pokemon) {
		if (new_pokemon[key] === ''){
		missing_info = true;
		missing_msg.push(`${key} `);
		};
	};
	if (missing_info) {
		res.render('form', {error: missing_msg})
	} else {
		jsonfile.readFile(file, (err, data) => {
			//check for errors
			let pokemon_list = data.pokemon
			for (pokemon of pokemon_list ){
				if (new_pokemon.id === pokemon.id){
					return res.render('form', {error:  `Pokemon id ${pokemon.id} already exists! Please re-enter pokemon`})
				} else if (new_pokemon.num === pokemon.num){
					return res.render('form', {error:  `Pokemon number ${pokemon.num} already exists! Please re-enter pokemon`})
				} else if (new_pokemon.name === pokemon.name){
					return res.render('form', {error:  `Pokemon with name: ${pokemon.name} already exists! Please re-enter pokemon`})
				};		
			};
			//no errors	
			new_pokemon.id = pokemon_list.length + 1;
			if (new_pokemon.id < 10){
				new_pokemon.num = `00${new_pokemon.id}`					
			} else if (new_pokemon.id < 100){
				new_pokemon.num = `0${new_pokemon.id}`
			} else {
				new_pokemon.num = `${new_pokemon.id}`
			};
			pokemon_list.push(new_pokemon)
			jsonfile.writeFile(file, data, (err) => {
				err ? console.log(err): "";
				res.send(new_pokemon)
			});
		});
	};
})


/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/pokemon', (req, res) => {
	res.send(`Welcome to the online Pokedex!`)
});

app.get('/pokemon/:name', (req, res) => {
	jsonfile.readFile('pokedex.json', (err, data) => {
		let pokemon_list = data.pokemon;
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon){
			res.send(`This is ${searched_pokemon.name}.<br>
				<img src=${searched_pokemon.img}><br>
				These are its stats:<br>
				Height: ${searched_pokemon.height}<br>
				Weight: ${searched_pokemon.weight}<br>
				Weaknesses: ${searched_pokemon.weaknesses}<br>`);
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});
});

app.get('/type/:type', (req, res) => {
	jsonfile.readFile('pokedex.json', (err, data) => {
		let pokemon_list = data.pokemon;
		let intype = req.params.type
		type = intype[0].toUpperCase() + intype.slice(1);
		let filtered_list = pokemon_list.filter(pokemon => pokemon.type.includes(type));
		type_list = `These pokemons are of ${intype} type:<br>`;
		filtered_list.forEach(pokemon => type_list += `<br>${pokemon.name}`);
		res.send(type_list);
	});
});

app.get('/weakness/:weakness', (req, res) => {
	jsonfile.readFile('pokedex.json', (err, data) => {
		let pokemon_list = data.pokemon;
		let weakness = req.params.weakness
		weakness = weakness[0].toUpperCase() + weakness.slice(1);
		let filtered_list = pokemon_list.filter(pokemon => pokemon.weaknesses.includes(weakness));
		weakness_list = `These pokemons are weak against ${weakness}:<br>`;
		filtered_list.forEach(pokemon => weakness_list += `<br>${pokemon.name}`);
		res.send(weakness_list);
	});
});

app.get('/prevevolution/:name', (req, res) => {
	jsonfile.readFile('pokedex.json', (err, data) => {
		let pokemon_list = data.pokemon;
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon && searched_pokemon.prev_evolution){
			name_list = 
				`This pokemon is ${name}.<br>
				<img src=${searched_pokemon.img}><br>
				It evolves from:`;
			searched_pokemon.prev_evolution.forEach(pokemon => name_list += `<br>${pokemon.name}`);
			res.send(name_list);
		} else if (searched_pokemon) {
			res.send(`This pokemon does not have a previous evolution.`)
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});
});

app.get('/nextevolution/:name', (req, res) => {
	jsonfile.readFile('pokedex.json', (err, data) => {
		let pokemon_list = data.pokemon;
		let name = req.params.name
		let searched_pokemon = pokemon_list.find(pokemon => pokemon.name.toLowerCase() === name);
		if (searched_pokemon && searched_pokemon.next_evolution){
			name_list = 
				`This pokemon is ${name}.<br>
				<img src=${searched_pokemon.img}><br>
				It evolves into:`;
			searched_pokemon.next_evolution.forEach(pokemon => name_list += `<br>${pokemon.name}`);
			res.send(name_list);
		} else if (searched_pokemon) {
			res.send(`This pokemon does not have a next evolution.`)
		} else {
			res.status(404).send(`Could not find information about ${name}. Is that a new pokemon? Gotta catch em' all!`)
		};
	});
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
