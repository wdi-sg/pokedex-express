const express = require('express');
const jsonfile = require('jsonfile');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const file = 'pokedex.json';

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

 var handleRequest = (request, response) =>{
    console.log("Handling response now...");
    console.log("request path: "+ request.path );

    let splitReq = request.path.split("/")[1];
    //console.log(splitReq);

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log(err);
        }
        else{
            const pokemonObj = obj.pokemon;
            // for (let i = 0; i < pokemonObj.length; i++){
            //     if (pokemonObj[i].name.toLowerCase() === splitReq.toLowerCase()){
            //         response.send("Weight of pokemon is: " + pokemonObj[i].weight);
            //     }
            // }

            //use id to compare pokemon
            for (let i = 0 ; i < pokemonObj.length; i++) {
                if (pokemonObj[i].id === parseInt(splitReq)){
                    var html = '';
                    html += '<html>';
                    html += '<body><h1>' + pokemonObj[i].name + '</h1>';
                    html += '<p> The weight of this pokemon is: ' + pokemonObj[i].weight + '</p>';
                    html += '<p> The height of this pokemon is: ' + pokemonObj[i].height + '</p>';
                    html += '<img src="'+ pokemonObj[i].img +'"/>';
                    html += "</body>";
                    html += "</html>";
                    // html += "<html>";
                    // html += "<html>";
                    response.send(html);
                }
            }
        }


    })
 }

app.get('*', handleRequest);






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




