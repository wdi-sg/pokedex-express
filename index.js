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

    let splitReq = request.path.split("/");
    console.log(splitReq);
    //console.log(request.path.split("/"));




    jsonfile.readFile(file, (err, obj)=>{
        const pokemonObj = obj.pokemon;
        if (err){
            console.log(err);
        }
        else if (splitReq[1] == ""){
            response.send('<h1>Welcome to the online pokedex!</h1>');
        }
        else if (splitReq[1] == "type"){
            var typePath = splitReq[2];
            //console.log(typePath);
            let emptyArray = [];
            for (let i = 0; i < pokemonObj.length; i++){
                for (let j = 0; j < pokemonObj[i].type.length; j++){
                    if (typePath == pokemonObj[i].type[j].toLowerCase()){
                        emptyArray.push(pokemonObj[i].name);
                    }

                }
            }
            response.send(emptyArray);

        }
        else{
            let parseSplitReq = parseInt(splitReq[1]);
            //use id to compare pokemon
            for (let i = 0 ; i < pokemonObj.length; i++) {
                if (pokemonObj[i].id === parseSplitReq){
                    var html = '';
                    html += '<html>';
                    html += '<body><h1>' + pokemonObj[i].name + '</h1>';
                    html += '<p> The weight of this pokemon is: ' + pokemonObj[i].weight + '</p>';
                    html += '<p> The height of this pokemon is: ' + pokemonObj[i].height + '</p>';
                    html += "<br>His favorite candy is the " + pokemonObj[i].candy + ", so get that for your pokemon so that they can love you";
                    html += '<br><img src="'+ pokemonObj[i].img +'"/>';
                    html += "</body>";
                    html += "</html>";
                    // html += "<html>";
                    // html += "<html>";
                    response.send(html);
                }
                // else if(  ) {
                //     var html = '';
                //     html += '<html>';
                //     html += '<body><p>Could not find information about ' + parseSplitReq + ". Is that a new pokemon? Gotta catch em' all!" + '</p>';
                //     html += "</body>";
                //     html += "</html>";
                //     response.send(html);
                // }
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




