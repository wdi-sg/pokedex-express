const express = require('express');
const app = express();
const file = 'pokedex.json'
const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('view engine', 'jsx');
app.set('views', __dirname + "/views");

//get pokemon by type

app.get('/type/:sometype', (req, res) => {
    let searchType = req.params.sometype;
    let matchTypeArr =[];
    jsonfile.readFile(file, (err, obj) =>{
        for(i=0; i<obj.pokemon.length; i++){
            for(j=0; j<obj.pokemon[i].type.length; j++)
                if (obj.pokemon[i].type[j].toLowerCase() === searchType){
                    matchTypeArr.push(obj.pokemon[i].name)
                }
        }
        const data ={
            type: searchType,
            pokemons: matchTypeArr
        }
        res.render('type', data)

    })

})

//get pokemon by weakness

app.get('/weaknesses/:someweakness', (req, res) => {
    let searchWeak = req.params.someweakness;
    let matchWeakArr =[];
    jsonfile.readFile(file, (err, obj) =>{
        for(i=0; i<obj.pokemon.length; i++){
            for(j=0; j<obj.pokemon[i].type.length; j++)
                if (obj.pokemon[i].weaknesses[j].toLowerCase() === searchWeak){
                    matchWeakArr.push(obj.pokemon[i].name)
                }
        }
        const data ={
            weakness : searchWeak,
            pokemons: matchWeakArr
        }
        res.render('weaknesses', data)

    })

})

//get pokemon by next evolve

app.get('/nextevolution/:evolve', (req, res) => {
    let nameEvolve = req.params.evolve;
    let evolveArr =[];
    let matchEvolveArr =[];
    jsonfile.readFile(file, (err, obj) =>{
        for(i=0; i<obj.pokemon.length; i++){
            if(nameEvolve == obj.pokemon[i].name.toLowerCase() && obj.pokemon[i].next_evolution ) {
                obj.pokemon[i].next_evolution.forEach(poke=>evolveArr.push(poke.name))
            }
        }

let data = {
    pokeArr : evolveArr
}

        res.render('nextevolution', data)
        // for(j=0; j< evolveArr.length; j++){
        //     if(evolveArr[j].name.toLowerCase() === nameEvolve){
        //         matchEvolveArr.push(nameEvolve)
        //         const data ={
        //     nextEvolve : nameEvolve,
        //     pokemons: matchEvolveArr
        // }

        //     }
        // }

    })

})





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