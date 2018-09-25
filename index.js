const express = require('express');

const jsonfile = require('jsonfile');

const file = "pokedex.json"
// Init express app
const app = express();

// *
//  * ===================================
 // * Routes
 var handleRequest = (request,response)=>{
    console.log("request path" + request.path);
    console.log("handling response rn");
 }
//=====

app.use(express.static('public'));

app.get('/', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        // if(request.path === "/weaknesses/"){
        //     response.send("please specific the weaknesses *eg weaknesses/fire");
        // }

    let userRequestType = request.path.split('/');
    console.log(userRequestType);


        var html ="";
            html += "<html>";
            html += "<body>";
            html += "<h1>Pokedex</h1>";
            html += '<ul>'

    for (var i = 0; i<obj.pokemon.length; i++){
        var allPokemon = obj.pokemon[i];

            html += '<li><a href="/' +allPokemon.name+ '" >'+allPokemon.name+'</li>';

        }
            html += '<p><a href="http://127.0.0.1:3000/">Return to index</a></p>'
            html += '</ul>'
            html += "</body>";
            html += "</html>";
            console.log("type",html)
            // response.send("Pokemon name: " + userRequest[1] + "\nWeight: " + allPokemon[i].weight);
            response.send(html);

    });

});

// app.get('/search', (request, response) => {

//     jsonfile.readFile(file, (err, obj) => {


//     });

// }


 // * ===================================

app.get('/weaknesses/*', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        // if(request.path === "/weaknesses/"){
        //     response.send("please specific the weaknesses *eg weaknesses/fire");
        // }

    let userRequestType = request.path.split('/');
    console.log(userRequestType);


        var html ="";
            html += "<html>";
            html += "<body>";
            html += "<h1>Pokedex</h1>";

    for (var i = 0; i<obj.pokemon.length; i++){
        var allPokemon = obj.pokemon[i];

        for (var j = 0; j<allPokemon.weaknesses.length; j++){
            console.log(allPokemon.weaknesses)
            if(allPokemon.weaknesses[j].toLowerCase() === userRequestType[2]){
                //html


            html += "<h3>"+allPokemon.name+"</h3>";
            // html += "<p>" +allPokemon.type+"</p>"
            html += '<img src="'+allPokemon.img+'"/>'

        }
        //(userRequest[2]).toLowerCase() === allPokemon[i].name.toLowerCase())

        }//allPokemon[i];

        }
            html += '<p><a href="http://127.0.0.1:3000/">Return to index</a></p>'
            html += "</body>";
            html += "</html>";
            console.log("type",html)
            // response.send("Pokemon name: " + userRequest[1] + "\nWeight: " + allPokemon[i].weight);
            response.send(html);

    });

});

//======
app.get('/type/*', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
    // console.log(err);

   let userRequestType = request.path.split('/');
    console.log(userRequestType);

        var html ="";
            html += "<html>";
            html += "<body>";
            html += "<h1>Pokedex</h1>";

    for (var i = 0; i<obj.pokemon.length; i++){
        var allPokemon = obj.pokemon[i];

        for (var j = 0; j<obj.pokemon[i].type.length; j++){

            if(allPokemon.type[j].toLowerCase() === userRequestType[2]){
                //html


            html += "<h3>"+allPokemon.name+"</h3>";
            // html += "<p>" +allPokemon.type+"</p>"
            html += '<img src="'+allPokemon.img+'"/>'

        }
        //(userRequest[2]).toLowerCase() === allPokemon[i].name.toLowerCase())

        }//allPokemon[i];

        }
            html += '<p><a href="http://127.0.0.1:3000/">Return to index</a></p>'
            html += "</body>";
            html += "</html>";
            console.log("type",html)
            // response.send("Pokemon name: " + userRequest[1] + "\nWeight: " + allPokemon[i].weight);
            response.send(html);

    });

});

//=======

// app.get('*', (request, response) => {

//     jsonfile.readFile(file, (err, obj) => {
//     // console.log(err);

//   let userRequestId = request.path.split('/');
//     console.log(userRequestId);

//     for (var i = 0; i<obj.pokemon.length; i++){
//         var allPokemon = obj.pokemon[i];
//         //(userRequest[2]).toLowerCase() === allPokemon[i].name.toLowerCase())
//         if(allPokemon.id === parseInt(userRequestId[1])){
//                 //html
//             var html ="";
//             html += "<html>";
//             html += "<body>";
//             html += "<h1>Pokedex</h1>";
//             html += "<h3>"+allPokemon.name+"</h3>";
//             html += '<img src="'+allPokemon.img+'"/>'
//             html += "</body>";
//             html += "</html>";
//             console.log("type",html)
//             // response.send("Pokemon name: " + userRequest[1] + "\nWeight: " + allPokemon[i].weight);
//             response.send(html);
//         }//allPokemon[i];

//         }

//     });

// });

//===========
app.get('*', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
    // console.log(err);

  // var pokename = function(obj, userinput){
    const allPokemon = obj.pokemon;
    // var userRequest = request.path; // will come back as "/..."
    // userRequest = userRequest.replace('/','') // remove '/', so userRequest is '...'
    let userRequest = request.path.split('/');
    console.log(userRequest);

    for (var i = 0; i<allPokemon.length; i++){

        if(userRequest[1].toLowerCase() === allPokemon[i].name.toLowerCase()){
                //html
            var html ="";
            html += "<html>";
            html += "<body>";
            html += "<h1>Pokedex</h1>";
            html += "<h3>"+allPokemon[i].name+"</h3>";
            html += '<img src="'+allPokemon[i].img+'"/>'
            html += '<p><a href="http://127.0.0.1:3000/">Return to index</a></p>'
            html += "</body>";
            html += "</html>";
            console.log(html)
            // response.send("Pokemon name: " + userRequest[1] + "\nWeight: " + allPokemon[i].weight);
            response.send(html);
        }//allPokemon[i];

        }

    });

});
//=======
const PORT_NUMBER = 3000;

// *
//  * ===================================
  // Listen to requests on port 3000

 // * ===================================

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
