const jsonfile = require('jsonfile');
const express = require('express');
const file = 'pokedex.json'


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

app.get('/', (request, response) => {
    response.send("Welcome to online Pokedex");
});

app.get("/pokemon/:x", (request, response) => {

    let pName;
    let pWeight;
    let pHeight;
    let pType;

    jsonfile.readFile(file, (err, obj) => {

        for(let i=0; i<obj.pokemon.length; i++){
            if(obj.pokemon[i].name.toLowerCase()==request.params.x) {
                pName = obj.pokemon[i].name.toLowerCase()
                pWeight = obj.pokemon[i].weight
                pHeight = obj.pokemon[i].height
                if(obj.pokemon[i].type.length == 1) {
                    pType = obj.pokemon[i].type+" type";
                } else if (obj.pokemon[i].type.length == 2) {
                    pType = "dual-type "+obj.pokemon[i].type[0]+"\/"+obj.pokemon[i].type[1];
                }

                response.send(
                    "This is "+pName+", he is "+pWeight
                    +" in weight,"+pHeight+" in height! he is a "+pType+" Pokemon!")
                return;
            }
        }
        response.send("Could not find information about "+request.params.x+" - Is that a new pokemon? Gotta catch em' all!")
    });
});

app.get("/type/:x", (request, response) => {

    let pName = [];

    jsonfile.readFile(file, (err, obj) => {

        for(let i=0; i<obj.pokemon.length; i++){
                pName.push(obj.pokemon[i].name);
            if(obj.pokemon[i].type[0].toLowerCase()==request.params.x) {
            }
            if(obj.pokemon[i].type.length == 2){
                if(obj.pokemon[i].type[1].toLowerCase()==request.params.x) {
                    pName.push(obj.pokemon[i].name);
                }
            }
        }
        console.log(pName)
        response.send(pName.toString());
    });
});

app.get("/weakness/:x", (request, response) => {
    let pWeak = [];

    jsonfile.readFile(file, (err, obj) => {

        for(let i=0; i<obj.pokemon.length; i++){
            console.log(obj.pokemon[i].weaknesses[0].toLowerCase())
            for(let j=0 ; j<obj.pokemon[i].weaknesses.length; j++) {

                if(obj.pokemon[i].weaknesses[j].toLowerCase()==request.params.x) {
                    console.log("test")
                    pWeak.push(obj.pokemon[i].name);
                }
            }
        }
        console.log(pWeak)
        response.send(pWeak.toString());
    });
});

app.get("/nextevolution/:x", (request, response) => {
    let pEvol1 = [];
    let pEvol2 = [];

    jsonfile.readFile(file, (err, obj) => {
        console.log(obj.pokemon[2].prev_evolution[1].name);
        for(let i=0; i<obj.pokemon.length; i++){

            if(obj.pokemon[i].name.toLowerCase()==request.params.x) {
                if (obj.pokemon[i].prev_evolution != undefined){
                    for(let j=0; j<obj.pokemon[i].prev_evolution.length; j++){
                        pEvol1.push(obj.pokemon[i].prev_evolution[j].name);
                    }
                }
                if (obj.pokemon[i].next_evolution != undefined){
                    for(let j=0; j<obj.pokemon[i].next_evolution.length; j++){
                        pEvol2.push(obj.pokemon[i].next_evolution[j].name);
                    }
                }
            }
        }
        console.log(pEvol1)
        console.log(pEvol2)
        response.send("Previous evolution: "+pEvol1.toString()+"<br>Next evolution: "+pEvol2.toString());
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));