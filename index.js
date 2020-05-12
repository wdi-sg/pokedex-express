const express = require('express');
const pokedex = 'pokedex.json';
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/:filepath',(request,response)=>{
    console.log("Only filepath");
    response.send("<h1>Welcome to the SUPER AMAZING POKEDEX 3000!</h1>");
 })




app.get('/:filepath/:argument', (request, response) => {
    //Declare variables
    let path = request.params.filepath;
    path = path.toLowerCase();
    let argument = request.params.argument;
    argument = argument.toLowerCase();
    let match = false;
    console.log("Argument: "+argument)
    console.log("path: "+path)


    jsonfile.readFile(pokedex,(err,obj)=>{
        if(path === "pokemon"){
            for(var i=0; i<obj.pokemon.length; i++){
                let pokedexPkm = obj.pokemon[i]["name"];
                pokedexPkm = pokedexPkm.toLowerCase();
                if(argument === pokedexPkm){
                    match = true;
                    console.log(pokedexPkm + " found!");
                    console.log(obj.pokemon[i]);
                    response.send(`<img src="${obj.pokemon[i]["img"]}"></img> </br><h1>${obj.pokemon[i]["name"]}</h1></br><h3>Height: ${obj.pokemon[i]["height"]}</br>Weight: ${obj.pokemon[i]["weight"]}</br>Weakness: ${obj.pokemon[i]["weaknesses"]}</h3>`);
                }
            }
            if(match === false){
                console.log("No match found");
                response.send("No matching pokemon. Maybe spelling error?");
            }
        } else if (path === "type"){
            let str = "Pokemons with matching types: <ul>"
            for(var i=0; i<obj.pokemon.length; i++){
                let pokedexType = obj.pokemon[i]["type"];
                for(var j=0; j<pokedexType.length; j++){
                    let type = pokedexType[j];
                    type = type.toLowerCase();
                    if(argument === type){
                        match = true;
                        str = str + `<li>${obj.pokemon[i]["name"]}</li><img src="${obj.pokemon[i]["img"]}"></img>`
                    }
                }
            }
            str = str + "</ul>";

            if (match === true) {
                console.log("Matched!");
                response.send(str);
            } else {
                console.log("No matching type");
                response.send("No matching types. Perhaps check your spelling?</br>List of types:</br><ul><li>Normal</li><li>Fighting</li><li>Flying</li><li>Poison</li><li>Ground</li><li>Rock</li><li>Bug</li><li>Ghost</li><li>Steel</li><li>Fire</li><li>Water</li><li>Grass</li><li>Electric</li><li>Psychic</li><li>Ice</li><li>Dragon</li><li>Dark</li><li>Fairy</li></ul>")
            }
        } else if (path === "weakness"){
            let str = "Pokemons with matching weakness: <ul>"
            for(var i=0; i<obj.pokemon.length; i++){
                let pokedexWeakness = obj.pokemon[i]["weaknesses"];
                for(var j=0; j<pokedexWeakness.length; j++){
                    let weakness = pokedexWeakness[j];
                    weakness = weakness.toLowerCase();
                    if(argument === weakness){
                        match = true;
                        str = str + `<li>${obj.pokemon[i]["name"]}</li><a href="http://localhost:3000/pokemon/${obj.pokemon[i]["name"]}"><img src="${obj.pokemon[i]["img"]}"></img></a>`
                    }
                }
            }
            str = str + "</ul>";

            if (match === true) {
                console.log("Matched!");
                response.send(str);
            } else if (argument === "normal"){
                response.send("No pokemon is weak to Normal!")
            } else {
                console.log("No matching weaknesses");
                response.send("No matching weaknesses. Perhaps check your spelling?</br>List of types:</br><ul><li>Normal</li><li>Fighting</li><li>Flying</li><li>Poison</li><li>Ground</li><li>Rock</li><li>Bug</li><li>Ghost</li><li>Steel</li><li>Fire</li><li>Water</li><li>Grass</li><li>Electric</li><li>Psychic</li><li>Ice</li><li>Dragon</li><li>Dark</li><li>Fairy</li></ul>")
            }
        } else if(path === "evolution"){
            for(var i=0; i<obj.pokemon.length; i++){
                let pokedexPkm = obj.pokemon[i]["name"];
                pokedexPkm = pokedexPkm.toLowerCase();
                if(argument === pokedexPkm){
                    match = true;
                    let str = `<a href="http://localhost:3000/pokemon/${pokedexPkm}"><img src="${obj.pokemon[i]["img"]}"></img></a></br><h1>${obj.pokemon[i]["name"]}</h1></br>`;
                    if('prev_evolution'in obj.pokemon[i]){
                        str = str + `<h3>Previous evolution:</h3> <ul>`
                        for(var j=0; j<obj.pokemon[i]["prev_evolution"].length; j++){
                            str = str + `<a href="http://localhost:3000/evolution/${obj.pokemon[i]["prev_evolution"][j]["name"]}"><img src="http://www.serebii.net/pokemongo/pokemon/${obj.pokemon[i]["prev_evolution"][j]["num"]}.png"></img></a><li>${obj.pokemon[i]["prev_evolution"][j]["name"]}</li>`
                        }
                        str = str + "</ul>"
                    }
                    if('next_evolution'in obj.pokemon[i]){
                        str = str + `<h3>Next evolution:</h3> <ul>`
                        for(var j=0; j<obj.pokemon[i]["next_evolution"].length; j++){
                            str = str + `<a href="http://localhost:3000/evolution/${obj.pokemon[i]["next_evolution"][j]["name"]}"><img src="http://www.serebii.net/pokemongo/pokemon/${obj.pokemon[i]["next_evolution"][j]["num"]}.png"></img></a><li>${obj.pokemon[i]["next_evolution"][j]["name"]}</li>`
                        }
                        str = str + "</ul>"
                    } else if (!('next_evolution'in obj.pokemon[i])) {
                        str = str + "</br><h4>This pokemon is at its final evolution!</h4>"
                    }

                    console.log(pokedexPkm + " found!");
                    console.log(obj.pokemon[i]);
                    response.send(str);
                }
            }
            if(match === false){
                console.log("No match found");
                response.send("No matching pokemon. Maybe spelling error?");
            }

        } else {
            console.log("No match found");
            response.send("<h1>Welcome to the SUPER AMAZING POKEDEX 3000!</h1>");
        }
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));