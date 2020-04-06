const express = require('express');

const jsonfile = require('jsonfile');

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

jsonfile.readFile(file, (err, obj) => {
    //error check
    if (err){
        console.log("error at read file");
    }
    // app.get('/pokemon/:arrayPosition/', (request, response) => {
    //     response.send("The Pokemon is " + obj["pokemon"][request.params.arrayPosition]["name"]);
    // });

    app.get(`/nextevolution/:submittedPokemon/`, (req, res) => {
        let found = false;
        let listOfPokemon = [];
        for (let element of obj["pokemon"]){
            if (element["name"].toLowerCase() === req.params.submittedPokemon.toLowerCase()){
                found = true;
                for (let i = 0; i < element["prev_evolution"].length; i++){
                    listOfPokemon.push(element["prev_evolution"][i]["name"])
                }
            }
        }

        res.send("List of Pokemon that it evolves from: " + listOfPokemon.join(" / "))

        if (!found){
            res.status(404).send("Could not find information about " + req.params.submittedPokemon + " - Is that a new pokemon? Gotta catch em' all!")
        }
    })



    app.get(`/type/:submittedType/`, (req, res) => {
        let found = false;
        let listOfPokemon = [];
        for (let element of obj["pokemon"]){
            for (let i = 0; i < element["type"].length; i++){
                if (element["type"][i].toLowerCase() === req.params.submittedType.toLowerCase()){
                    found = true;
                    listOfPokemon.push(element["name"])
                }
            }
        }

        res.send("List of Pokemon: " + listOfPokemon.join(" / "))

        if (!found){
            res.status(404).send("No pokemon with the type: " + req.params.submittedName + " - Is that a new type? Gotta catch em' all!")
        }
    })

    app.get(`/pokemon/:submittedName/`, (req, res) => {
        let found = false;
        for (let element of obj["pokemon"]){
            if (element["name"].toLowerCase() === req.params.submittedName.toLowerCase()){
                found = true;
                res.send("The Pokemon's name is " + element["name"] + ", and it weighs " + element["weight"] + " , and its type is " + element["type"])
            }
        }
        if (!found){
            res.status(404).send("Could not find information about " + req.params.submittedName + " - Is that a new pokemon? Gotta catch em' all!")
        }
    })

    app.get('*', (request, response) => {
        response.send("Welcome to the online Pokedex!");
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));