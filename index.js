//inputs
const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = './pokedex.json';

//Get from json file
jsonfile.readFile(file, (err, obj) => {
    //check against URL === return pokemon OBJ
    let check = (key, value) =>{
        let pokeArray = obj.pokemon;
        let information;
        pokeArray.forEach(function(ele, num){
            if(ele[key] === value){
                information = ele;
            }
        });
        return information;
    };
    //SENDING INFO
    //helper functions
    var extType = "name";
    //response Handlers
    const rHname = (request, response) => {
        let req = request.params.pokemon;
        let objReceived = check("name", req);
        //iterate over pokemon's details
        let details = ``;
        for(let key in objReceived){
        let arrayDetails = ``;
            if(Array.isArray(objReceived[key])){
                arrayDetails += `${key}: `;
                objReceived[key].forEach(function(ele, num){
                    arrayDetails += `${ele} /`;
                });
                arrayDetails = arrayDetails.slice(0,(arrayDetails.length-1));
                details += `${arrayDetails}:)\n`;
            }else {
                details += `${key}: ${objReceived[key]}\n`;
            }
        }
        //send response (all poke details)
        if(details === undefined){
            response.send(`Could not find information about ${req}`);
        } else{
            response.send(`Pokemon ${req}\'s ${details}`);
            console.log(details)
        }

    };
    const rHhome = (request, response) => {
        response.send(`Welcome to the online Pokdex!`)
    };
    // const extWeakness = () => {}
    //app GETS
    app.get('/pokemon/:pokemon', rHname);
    // app.get('/weakness/:pokemon', extWeakness);
    // app.get('/type/:pokemon', rHname);
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));