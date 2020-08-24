const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const filename = 'pokedex.json'
jsonfile.readFile(filename, (err, obj) => {
    app.get("/", (request, response) => {
        response.send("Welcome to the online Pokedex!");
    })
    app.get("/type/:type", (request, response) => {
        let list = ["<ol>"], type = request.params.type;
        for(let i = 0; i < obj.pokemon.length;i++) {
            for(let j = 0; j < obj.pokemon[i].type.length;j++){
                if(obj.pokemon[i].type[j].toLowerCase() == type ){
                    list.push(`<li> ${obj.pokemon[i].name} <br> <img src=${obj.pokemon[i].img}> </li> <br>`);
                }
            }
        }
        list.push("</ol>")
        response.send(list.join(''));
    })
    app.get("/weakness/:weakness", (request, response) => {
        let list = ["<ol>"], weakness = request.params.weakness;
        for(let i = 0; i < obj.pokemon.length;i++) {
            for(let j = 0; j < obj.pokemon[i].weaknesses.length;j++){
                if(obj.pokemon[i].weaknesses[j].toLowerCase() == weakness ){
                    list.push(`<li> ${obj.pokemon[i].name} <br> <img src=${obj.pokemon[i].img}> </li> <br>`);
                }
            }
        }
        list.push("</ol>")
        response.send(list.join(''));
    })
    app.get("/nextevolution/:poke", (request, response) => {
        let list = ["<ol>"], evo = request.params.poke;
        for(let i = 0; i < obj.pokemon.length;i++) {
            if(obj.pokemon[i].next_evolution && obj.pokemon[i].next_evolution.length){
                for(let j = 0; j < obj.pokemon[i].next_evolution.length;j++){
                    if(obj.pokemon[i].next_evolution[j].name.toLowerCase() == evo){
                        list.push(`<li> ${obj.pokemon[i].name} <br> <img src=${obj.pokemon[i].img}> </li> <br>`);
                    }
                }
            }
        }
        list.push("</ol>")
        response.send(list.join(''));
    })
    app.get("/pokemon/:id", (request, response) => {
        if(parseInt(request.params.id)) {
            let index = request.params.id - 1;
            response.send(obj.pokemon[index].name);
        }
        else {
            let name = request.params.id;
            for(let i = 0; i < obj.pokemon.length; i++) {
                if(name.toLowerCase() === obj.pokemon[i].name.toLowerCase()) {
                    let image = obj.pokemon[i].img;
                    let height = obj.pokemon[i].height;
                    let weight = obj.pokemon[i].weight;
                    response.send(`<img src=${image}> <br> This is ${name}, it has a weight of ${weight} and a height of ${height}.`);}
            }
            response.status(404).send(`Could not find information of ${name}. Is that a new pokemon? Gotta catch em all!`);
        }
    })
})
app.listen(3000, () => {
    console.log("This server is listening at port 3000.");
})