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

    })
 }

app.get('/', handleRequest);
app.get('/:name', (request, response) => {
    console.log("Handling response now...");
    console.log("request path: "+ request.path );
    console.log(request.params.name);

    jsonfile.readFile(file, (err, obj)=>{
        const pokemonObj = obj.pokemon;
        for (let i = 0 ; i < pokemonObj.length; i++) {
            if (pokemonObj[i].name.toLowerCase() == request.params.name.toLowerCase()){
                var html = "";
                html += "<html>";
                html += "<body><h1>" + pokemonObj[i].name + "</h1></body></html>";
                //console.log(html);
                response.send(html);
            }
        }

    });
});







/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




