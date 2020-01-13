const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const pokemonData = 'pokedex.json';


app.get('/pokemon/:iden', (request, response) => {
    let idenNum = parseInt(request.params.iden);
    jsonfile.readFile(pokemonData, (err, obj) => {
        if (idenNum > 0) {
            let pokemon = obj.pokemon[idenNum-1];
            if (pokemon !==  undefined) {
                response.send("<img src=" + pokemon.img + "><br>This is " + pokemon.name + "<br>It weights " + pokemon.weight + "<br>It is " + pokemon.height + " tall.<br>It is a " + pokemon.type + " Type");
            } else {
                response.redirect(301, "/");
            } //else 1 close
        } else {
            let iden = request.params.iden;
            let pokedex = obj.pokemon;
            let count = 0;
            for (i = 0; i < pokedex.length; i++) {
                if (iden.toLowerCase() == pokedex[i].name.toLowerCase()) {
                    response.send("Name : " + pokedex[i].name + "<br>Weight : " + pokedex[i].weight);
                } else {
                    count++
                }
                if (count == pokedex.length) {
                    response.send("Unable to find pokemon with that name. Please Try again");
                }
            }//for loop end
        }// number check else end
    })//readFile end
})//app.get end


app.get('/type/:type', (request, response) => {
    let type = request.params.type;
    let pokemonNames = [];
    jsonfile.readFile(pokemonData, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++) {
            let pokemonType = obj.pokemon[i].type;
            for (let j = 0; j < pokemonType.length; j++) {
                if (type.toLowerCase() == pokemonType[j].toLowerCase()) {
                    pokemonNames.push(obj.pokemon[i].name);
                }//if end
            }// for j loop
        }// for i loop
        if (pokemonNames[0] == undefined) {
            response.send("There are no pokemon with that Type. Please try something else.");
        } else {
                let pokemonNameStr = "";
            for (let i = 0; i < pokemonNames.length; i++) {
                pokemonNameStr = pokemonNameStr + "<br><a href='../pokemon/" + pokemonNames[i] + "'>" + pokemonNames[i] + "</a>";
            }//for i loop
            response.send(pokemonNameStr);
        } //else end
    })//readFile end
})//app.get end


app.get('/weakness/:weak', (request, response) => {
    let weak = request.params.weak;
    let pokemonNames = [];
    jsonfile.readFile(pokemonData, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++) {
            let pokemonWeak = obj.pokemon[i].weaknesses;
            for (let j = 0; j < pokemonWeak.length; j++) {
                if (weak.toLowerCase() == pokemonWeak[j].toLowerCase()) {
                    pokemonNames.push(obj.pokemon[i].name);
                }//if end
            }// for j loop
        }// for i loop
        if (pokemonNames[0] == undefined) {
            response.send("There are no pokemon with that Weakness. Please try something else.");
        } else {
                let pokemonNameStr = "";
            for (let i = 0; i < pokemonNames.length; i++) {
                pokemonNameStr = pokemonNameStr + "<br><a href='../pokemon/" + pokemonNames[i] + "'>" + pokemonNames[i] + "</a>";
            }//for i loop
            response.send(pokemonNameStr);
        } //else end
    })//readFile end
})//app.get end



//catch all if wrong input is entered
app.get('*', (request, response) => {
    response.send("Welcome to the online Pokedex!<br>Type /pokemon/'number or name' in the address bar");
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));