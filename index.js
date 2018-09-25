const express = require('express');

const jsonfile = require('jsonfile');

const file = "pokedex.json"
// *
//  * ===================================
 jsonfile.readFile(file, (err, obj) => {
    // console.log(err);
    //const pokename = [];
    for (var i = 0; i<obj.length; i++){

        let pokename = obj[i];

        // console.log("name", obj[i])
        //get the object key name
    // if ()

    }
    //console.log(obj)
});
 // * ===================================


// Init express app
const app = express();

// *
//  * ===================================
 // * Routes
 var handleRequest = (request,response)=>{
    console.log("request path" + request.path);
    console.log("handling response rn");

    if(request.path == pokename.name){
        response.send(pokename);
    } else {
        response.send("Not Valid");
    }

 }
 // * ===================================


app.get('*', (request, response) => {
  // send response with some data (a string)
  // response.send("halo")
  response.send(request.path);
});

const PORT_NUMBER = 3000;

// *
//  * ===================================
  // Listen to requests on port 3000

 // * ===================================

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
