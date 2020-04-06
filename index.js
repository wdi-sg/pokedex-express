const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Get Types if pokemon
 * ===================================
 */
 const wordSplit = (currentIndex, length)=>{
    let seperator = "";
    if(currentIndex === (length - 1)){
        seperator
        += `. `;
    }else if(currentIndex === (length - 2)){
        seperator
        += ` and `;
    }else{
        seperator
        += `, `;
    }
    return seperator;
 }
 const getTypes = (types)=>{
    let typeSentence = "";
    if(types.length !== 0){
        typeSentence = ` He is also of type `
        for(let j= 0 ; j < types.length;j++){
            let type = types[j].toLowerCase();
            typeSentence += `${type}${wordSplit(j, types.length)}`;
        }
    }
    return typeSentence;
 }
 const getSpawn = (pokemon) => {
    let spawnText = "";
    spawnText += ` He needs ${pokemon["candy_count"]} ${pokemon["candy"]} to evolve. His spawn chance is ${pokemon["spawn_chance"]}, average spawn chance is ${pokemon["avg_spawns"]} and spawn time is ${pokemon["spawn_time"]}. `;
    return spawnText;
 }
 const getWeakness = (pokemon) => {
    let weaknesses = "";
    if(pokemon["weaknesses"].length !== 0){
        weaknesses += `His weaknesses is `;
        for(let i = 0; i < pokemon["weaknesses"].length;i++){
            weaknesses +=  `${pokemon["weaknesses"][i].toLowerCase()}${wordSplit(i,(pokemon["weaknesses"].length))}`;
        }
    }
    return weaknesses;
 }

 const prevEvo = (pokemon) =>{
    let prevEvolution = "";
    if(typeof pokemon["prev_evolution"] !== "undefined"){
        prevEvolution += `His previous evolution is `;
        for(let i = 0; i < pokemon["prev_evolution"].length;i++){
            console.log(pokemon["prev_evolution"][i]["name"]);
            prevEvolution +=  `${pokemon["prev_evolution"][i]["name"]}${wordSplit(i,(pokemon["prev_evolution"].length))}`;
        }
    }else{
        prevEvolution += `A ${pokemon["name"]} egg will hatch after ${pokemon["egg"]}. `;
    }
    return prevEvolution;
 }
 const nextEvo = (pokemon) =>{
    let nextEvolution = "";
    if(typeof pokemon["next_evolution"] !== "undefined"){
        nextEvolution += `His next evolution is `;
        for(let i = 0; i < pokemon["next_evolution"].length;i++){
            nextEvolution += `${pokemon["next_evolution"][i]["name"]}${wordSplit(i, pokemon["next_evolution"].length)}`;
        }
    }
    return nextEvolution;
 }


/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/pokemon/:nameOfPokemon', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err, obj)=>{
    if(err === null){
        let name = request.params.nameOfPokemon;
        let listOfPokemon = obj["pokemon"];
        for(let i = 0 ; i< listOfPokemon.length; i ++){
            if(listOfPokemon[i]["name"] == name){
                let pokemon = listOfPokemon[i];
                let displayPokemon = `<img src='${pokemon["img"]}'><br>This is ${ pokemon["name"]}, he is ${ pokemon["weight"]} in weight and ${pokemon["height"]} in height.`;
                let listOfTypes = pokemon["type"];
                displayPokemon += getTypes(listOfTypes);
                displayPokemon += getSpawn(pokemon);
                displayPokemon += getWeakness(pokemon);
                displayPokemon += prevEvo(pokemon);
                displayPokemon += nextEvo(pokemon);
                response.send(displayPokemon);
            }
        }
        response.status("404").send(`Could not find information about ${name} - Is that a new pokemon? Gotta catch em' all!`);

    }else{
        response.send(err);
    }
  });
});

 app.get('/type/:someType', (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err, obj)=>{
    if(err === null){
        let type = request.params.someType;
        let listOfPokemon = obj["pokemon"];
        let pokemonOfType = "<h1>Type "+type +"</h1><ul>";
        for(let i = 0 ; i< listOfPokemon.length; i ++){
            for(let j = 0; j < listOfPokemon[i]["type"].length; j++){
                if(listOfPokemon[i]["type"][j] == type){
                    pokemonOfType += `<li>${listOfPokemon[i]["name"]}</li>`;
                }
            }
        }
        pokemonOfType+="</ul>";
        response.send(pokemonOfType);
    }else{
        response.send(err);
    }
  });
});

 app.get('/weaknesses/:someWeakness', (request,response)=>{
    jsonfile.readFile(file, (err, obj)=>{
        if(err === null){
            let weakness = request.params.someWeakness;
            let listOfPokemon = obj["pokemon"];
            let pokemon = "<h1>Weakness "+ weakness +"</h1><ul>";
            for(let i = 0 ; i< listOfPokemon.length; i ++){
                for(let j = 0; j < listOfPokemon[i]["weaknesses"].length; j++){
                    if(listOfPokemon[i]["weaknesses"][j] == weakness){
                        pokemon += `<li>${listOfPokemon[i]["name"]}</li>`;
                    }
                }
            }
            pokemon+="</ul>";
            response.send(pokemon);
        }else{
            response.send(err);
        }
    });
 });


app.get('/nextevolution/:someName', (request, response)=>{
 jsonfile.readFile(file, (err, obj)=>{
        if(err === null){
            let pokemon = request.params.someName;
            let listOfPokemon = obj["pokemon"];
            let pokemonDisplay = "<h1>"+pokemon +" evolved from:</h1><ul>";
            for(let i = 0 ; i< listOfPokemon.length; i ++){
             if(listOfPokemon[i]["name"]=== pokemon && typeof listOfPokemon[i]["prev_evolution"] !== "undefined"){
                            console.log("Matched");
                for(let j = 0; j < listOfPokemon[i]["prev_evolution"].length; j++ ){
                    pokemonDisplay += "<li>"+listOfPokemon[i]["prev_evolution"][j]["name"]+"</li>";
                }
                    }
                }
                pokemon += "</ul>";
            response.send(pokemonDisplay);
        }else{
            response.send(err);
        }
    });
});


 app.get('/',(request, response) =>{
    response.send('Welcome to the online Pokdex!');
 });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));