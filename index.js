const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('view engine', 'jsx');
app.set('views', __dirname + "/views");


//get pokemon by name + handle error
app.get('/pokedex/:somename', (req, res) => {
    let searchName = req.params.somename;
  jsonfile.readFile('./pokedex.json', (err, obj) => {
    let pokemonarray = [];
    for(i=0; i<obj.pokemon.length; i++){
        if(obj.pokemon[i].name.toLowerCase() === searchName){
        pokemonarray.push(obj.pokemon[i].name);
    }
    if (pokemonarray.length < 1) {
        const error = `Could not find information on ${searchName}. Is that a new pokemon? gotta catch em all!`
        res.status(404).send(error);
        res.render('pokemon', error)
    } else {
         const data = {
        name: obj.pokemon[i].name,
        weight:obj.pokemon[i].weight,
        candy :obj.pokemon[i].candy,  }
        res.render('pokemon', data)
        }
    }
})
})







app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));