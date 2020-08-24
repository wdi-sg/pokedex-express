const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:poke', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile('pokedex.json', (err, obj) => {
    let unknown = obj.pokemon.find(element=>element.name.toLowerCase()===request.params.poke);
if(!unknown){
    response.status(404).send(`Could not find information about ${request.params.poke} - Is that a new pokemon? Gotta catch em' all!`)
}
    for(let i = 0;i<obj.pokemon.length;i++){
    if(request.params.poke === obj.pokemon[i].name.toLowerCase()){
        response.send(`This is: ${request.params.poke}! His weight is:${obj.pokemon[i].weight}! He has a spawn time of ${obj.pokemon[i].spawn_time}`);
    } else if(request.params.poke == obj.pokemon[i].id){
        response.send(`${obj.pokemon[i].name}`);
    }
}

})
});


app.get("/type/:someType",(request,response)=>{
    jsonfile.readFile('pokedex.json', (err, obj) => {
        let pokeArr = [];
        for(let i = 0;i<obj.pokemon.length;i++){
            if(obj.pokemon[i].type.includes(request.params.someType)){pokeArr.push(obj.pokemon[i].name)
            }
            }
            response.send(`The list of pokemon of type: ${request.params.someType} are ${pokeArr}`);
        })
})

app.get("/weaknesses/:someWeaknesses",(request,response)=>{
    jsonfile.readFile('pokedex.json', (err, obj) => {
        let pokeArr = [];
        for(let i = 0;i<obj.pokemon.length;i++){
            if(obj.pokemon[i].weaknesses.includes(request.params.someWeaknesses)){pokeArr.push(obj.pokemon[i].name)
            }
            }
            response.send(`The list of pokemon of weakness: ${request.params.someWeaknesses} are ${pokeArr}`);
        })
})

app.get("/nextevolution/:someName",(request,response)=>{
    jsonfile.readFile('pokedex.json', (err, obj) => {
        let pokeArr = [];
        for(let i = 0;i<obj.pokemon.length;i++){
            if(request.params.someName == obj.pokemon[i].name && obj.pokemon[i].prev_evolution){
                obj.pokemon[i].prev_evolution.forEach(poke=>pokeArr.push(poke.name))
            }
            }
            response.send(`The list of pokemon evolved to: ${request.params.someName} are ${pokeArr}`);
        })
})



app.get("/",(request,response)=>{
    response.send("<h1>Welcome to the online Pokedex!</h1>")
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
