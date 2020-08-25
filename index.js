const express = require('express');
const jsonfile = require('jsonfile');

let app = express()

const reactEngine = require("express-react-views").createEngine()
app.engine('jsx', reactEngine)

app.set("views", __dirname+'/views')
app.set('view engine', 'jsx')


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  jsonfile.readFile('pokedex.json', (err, obj)=>{
    obj.responseText = "Welcome to the online pokedex!"
    response.render('home', obj);
  })

});

app.get('/pokemon', (request, response) => {
  jsonfile.readFile('pokedex.json', (err, obj)=>{
    obj.responseText = "Welcome to the online pokedex!"
    response.render('home', obj);
  })

});

app.get("/pokemon/:pokemonspecies", (request, response)=>{
    jsonfile.readFile('pokedex.json', (err, obj)=>{
        let name = request.params.pokemonspecies
        let pokemonList = obj.pokemon
        let chosenPokemonObj;
        for(i=0;i<pokemonList.length;i++){
            if(pokemonList[i].name.toLowerCase()==name){
                chosenPokemonObj = pokemonList[i]
            }
        }
        if(!chosenPokemonObj){
            response.status(404).send("Could not find information about "+name+". Is that a new pokemon? Gotta catch them all!<br><a href='/'>Back to home page</a>")
        } else {
            response.render('pokemon', chosenPokemonObj)
        }

    })
})

app.get("/type/:poketype", (request, response)=>{
    jsonfile.readFile('pokedex.json', (err, obj)=>{
        let type = request.params.poketype
        let pokemonList = obj.pokemon
        let chosenPokemon = [];
        for(i=0;i<pokemonList.length;i++){
            let lowerCaseType = pokemonList[i].type.map(item=>item.toLowerCase())
            if(lowerCaseType.includes(type)){
                chosenPokemon.push(pokemonList[i].name)
            }
        }
        if(chosenPokemon.length==0){
            response.status(404).send("Could not find pokemon with type "+type+".<br><a href='/'>Back to home page</a>")
        } else {
            let data = {pokemonType: type, pokemon: chosenPokemon}
            response.render('type', data)
        }

    })

})

app.get("/weakness/:pokeweakness", (request, response)=>{
    jsonfile.readFile('pokedex.json', (err, obj)=>{
        let weakness = request.params.pokeweakness
        let pokemonList = obj.pokemon
        let chosenPokemon = [];
        for(i=0;i<pokemonList.length;i++){
            let lowerCaseWeakness = pokemonList[i].weaknesses.map(item=>item.toLowerCase())
            if(lowerCaseWeakness.includes(weakness)){
                chosenPokemon.push(pokemonList[i].name)
            }
        }
        if(chosenPokemon.length==0){
            response.status(404).send("Could not find Pokemon with weakness "+weakness+".<br><a href='/'>Back to home page</a>")
        } else {
            let data = {weaknessType: weakness, pokemon: chosenPokemon}
            response.render('weakness', data)
        }
    })
})

app.get("/nextevolution/:pokemon", (request, response)=>{
    jsonfile.readFile('pokedex.json', (err, obj)=>{
        let pokemon = request.params.pokemon
        let pokemonList = obj.pokemon
        let prevEvolutions = null;
        for(i=0;i<pokemonList.length;i++){
            if(pokemon == pokemonList[i].name.toLowerCase()){
                    prevEvolutions = pokemonList[i].prev_evolution
                }
            }
        if(prevEvolutions==undefined || prevEvolutions){
            let data = {chosen: pokemon, previous: prevEvolutions}
            response.render('evolution', data)

        } else {
            response.status(404).send("Pokemon not found.<br><a href='/'>Back to home page</a>")

        }

    })
})

app.get("/search/:searchparam", (request, response)=>{
    let searchParam = request.params.searchparam
    jsonfile.readFile("pokedex.json", (err, obj)=>{
        let pokemonList = obj.pokemon
        let result = []
        if(request.query.compare=="less"){
            pokemonList.forEach((item)=>{
                if(item[searchParam]<request.query.amount){
                    result.push(item)
                }
            })

        } else if (request.query.compare=="more"){
            pokemonList.forEach((item)=>{
                if(item[searchParam]>request.query.amount){
                    result.push(item)
                }
            })

        }
        if(result.length<1){
            response.send("No pokemon matches your search.<br><a href='/'>Back to home page</a>")
        } else {
            let data = {searchParameter: searchParam, amountReq: request.query.amount, compare: request.query.compare, returnedRes: result}
            response.render('searchresults', data)
        }
    })
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));