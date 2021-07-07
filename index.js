const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();

app.get('/pokemon/:name', (request, response) => {

    jsonfile.readFile(file,(err,obj)=>{
        let pokemonFound = false;
        let result="";
        if (err){
            console.log(err);
        }
        else{
            for(var i=0;i<obj.pokemon.length;i++){
                if(obj.pokemon[i].name === (request.params.name)){
                 response.send(`
                    <h2>${obj.pokemon[i].name}</h2>
                    <img src="${obj.pokemon[i].img}"><br>
                    He weighs ${obj.pokemon[i].weight} and is ${obj.pokemon[i].height} tall.`);
                 pokemonFound = true;
                 break;
             }
         }
     }
     if(!pokemonFound){
        response.status(404).send("Is that a new pokemon? Gotta catch em' all!");
    }
    })
});

app.get('/type/:type',(request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        else{
            let pokemonFound = false;
            let result ="";
            for(var i=0; i<obj.pokemon.length;i++){
                if(obj.pokemon[i].type.includes(request.params.type)){
                    result = result +`<li>${obj.pokemon[i].name}</li>`
                    pokemonFound=true;
                }
            }
            if(!pokemonFound){
                response.status(404).send("Is that a new pokemon? Gotta catch em' all!");
            }
            else{
                response.send(`Pokemon Type: ${request.params.type} <br> ${result}`);
            }
        }
    })
});

app.get("/weaknesses/:weaknesses",(request,response) =>{
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        else{
            let pokemonFound = false;
            let result ="";
            for(var i=0; i<obj.pokemon.length; i++){
                if(obj.pokemon[i].weaknesses.includes(request.params.weaknesses)){
                    result = result + `<li> ${obj.pokemon[i].name}</li>`;
                    pokemonFound= true;
                }
            }
            if(!pokemonFound){
                response.status(404).send("Is that a new pokemon? Gotta catch em' all!");
            }
            else{
                response.send(`Pokemon weak against: ${request.params.weaknesses}<br> ${result}`);
            }
        }
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 const PORT = 3000;
 app.listen(PORT);