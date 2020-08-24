const express = require("express");
const jsonfile = require('jsonfile');
const app = express();

const reactEngine = require('express-react-views').createEngine(); //create the react engine.
app.engine('jsx', reactEngine); //set the engine to be jsx(react). when it encounters a jsx file it will use this reactengine.

// this tells express where to look for the view files
app.set('views', __dirname + '/views'); // express-views/views //for the 'views' it is default to be 'views'.

app.set('view engine', 'jsx'); // render the file as jsx.


app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});


app.get('/search/spawn_chance', (request, response) => {
  // send response with some data (a string)
  let amount = request.query.amount;
  let compare = request.query.compare;
  if (compare === "more"){
  jsonfile.readFile('pokedex.json', (err, obj) => {
    let higherSpawn = obj.pokemon.filter(poke=>{
        return poke.spawn_chance > amount;
    })
let data = {
    pokeArr : higherSpawn
}
response.render('spawn', data)
})
}
});


app.get('/pokemon/:poke', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile('pokedex.json', (err, obj) => {
    let unknown = obj.pokemon.find(element=>element.name.toLowerCase()===request.params.poke);
if(!unknown){
    response.status(404).send(`Could not find information about ${request.params.poke} - Is that a new pokemon? Gotta catch em' all!`)
}
    for(let i = 0;i<obj.pokemon.length;i++){
    if(request.params.poke === obj.pokemon[i].name.toLowerCase()){
        const data = { name: request.params.poke, weight:obj.pokemon[i].weight, spawn: obj.pokemon[i].spawn_time}
        response.render('home',data);
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
                let data = {
                    type: request.params.someType,
                    poke: pokeArr
                }
            response.render('type',data);
        })
})


app.get("/",(request,response)=>{
   jsonfile.readFile('pokedex.json', (err, obj) => {
    let pokeArr = [];
   for(let i = 0;i<obj.pokemon.length;i++){
        pokeArr.push(`/pokemon/${obj.pokemon[i].name.toLowerCase()}`)
   }
   let data = {
    poke: pokeArr
   }
   response.render('root', data);
})
})




app.listen(3000,()=>{
    console.log("server is listening at port 3000...")
});

