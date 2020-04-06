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

    app.get(`/pokemon/:submittedName/`, (req, res) => {
        let found = false;
        for (let element of obj["pokemon"]){
            if (element["name"].toLowerCase() === req.params.submittedName.toLowerCase()){
                found = true;
                res.send("The Pokemon's name is " + element["name"] + ", and it weighs " + element["weight"])
            }
        }
        if (!found){
            res.status(404).send("Could not find information about " + req.params.submittedName + " - Is that a new pokemon? Gotta catch em' all!")
        }
    })

    app.get('*', (request, response) => {
        response.send("whoops");
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));