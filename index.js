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

// app.get('/', (request, response) => {
//     console.log(request.params)
//     response.send('hello brian')
// });

// app.get('/pokedex/:name', (request, response)=>{
//     console.log(request.params);
//     console.log(request.params.name);

//     // const weight = "";
//     // // get data from the file

//     jsonfile.readFile(file, (err, data) => {
//         let weight = "";

//         for (i=0; i<data.pokemon.length; i++) {
//             if (data["pokemon"][i].name.toLowerCase() === request.params.name) {
//                 console.log("pokemon name matched");
//                 weight = `${request.params.name} weight is ${data.pokemon[i].weight}`;
//                 //response.send(weight);
//                 break

//             } else {
//                 weight = "<html><body><h1>No Such Pokemon!</h1></body></html>"
//                 //response.status( 404 );
//             }
//         }
//         response.send(weight);
//         console.log(weight);
//         // response.send(weight);
//     })

//     // console.log(data.pokemon.length);

//     // response.send(weight);
// });


// //////////////////////////
// //      New Route      //
// //Get details on pokemon//
// //////////////////////////
// app.get('/pokedex/:name', (request, response)=>{
//     console.log(request.params);
//     console.log(request.params.name);

//     jsonfile.readFile(file, (err, data) => {
//             let details = "";
//             let type = [];

//             for (i=0; i<data.pokemon.length; i++) {
//                 if (data.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
//                     console.log("pokemon name matched");
//                     for (j=0; j<data.pokemon[i].type.length; j++) {
//                         type.push(data.pokemon[i].type[j]);
//                     }
//                     if (data.pokemon[i].type.length === 1) {
//                         details = `<html><body><img src='${data.pokemon[i].img}'</img></body></html><br>
//                         This is ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}. It's weight is ${data.pokemon[i].weight}<br>
//                         It is a ${type[0]} type Pokemon`;
//                     } else if (data.pokemon[i].type.length === 2) {
//                         details = `<html><body><img src='${data.pokemon[i].img}'</img></body></html><br>
//                         This is ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}. It's weight is ${data.pokemon[i].weight}<br>
//                         It is a ${type[0]} and ${type[1]} type Pokemon`;
//                     }
//                     break;

//                 } else {
//                     details = "<html><body><h1>No Such Pokemon!</h1></body></html>"
//                     response.status( 404 );
//                 }
//             }
//             response.send(details);
//             console.log(details);
//     });
// });

//////////////////////////
//      New Route       //
//.  Pokemon Types     //
//////////////////////////
app.get('/pokedex/type/:someType', (request, response)=>{
    console.log(request.params);
    console.log(request.params.someType);

    jsonfile.readFile(file, (err, data) => {
            let  sameTypeList= "";
            let sameType = [];
            let typePage = "";

            for (i=0; i<data.pokemon.length; i++) {
                for (j=0; j<data.pokemon[i].type.length; j++) {
                    if (data.pokemon[i].type[j].toLowerCase() === request.params.someType.toLowerCase()) {
                        console.log("pokemon type matched");
                        sameType.push(data.pokemon[i].name);
                        console.log(sameType);
                    }
                    break;
                }
            }
            for (i=0; i<sameType.length; i++) {
                sameTypeList = `${sameTypeList} ${sameType[i]}<html><br></html>`
            }

            typePage = `List of ${request.params.someType} type pokemon<br><br>${sameTypeList}`;

            response.send(typePage);
            console.log(sameTypeList);
    });
});









// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));