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


// ///////////////
// //Get Weight//
// //////////////
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


//////////////////////////
//      New Route      //
//Get details on pokemon//
//////////////////////////
app.get('/pokedex/:name', (request, response)=>{
    console.log(request.params);
    console.log(request.params.name);

    jsonfile.readFile(file, (err, data) => {
            let details = "";
            let type = [];

            for (i=0; i<data.pokemon.length; i++) {
                if (data.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
                    console.log("pokemon name matched");
                    for (j=0; j<data.pokemon[i].type.length; j++) {
                        type.push(data.pokemon[i].type[j]);
                    }
                    if (data.pokemon[i].type.length === 1) {
                        details = `
                        <html>
                        <body style="text-align: center; background-color: black; color: yellow">
                        <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
                        <h1>${data.pokemon[i].num}. ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}</h1>
                        <img style="margin: 0 auto" src='${data.pokemon[i].img}'</img></body></html><br>
                        Number: ${data.pokemon[i].num}<br>
                        Name: ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}<br>
                        Weight: ${data.pokemon[i].weight}<br>
                        Height: ${data.pokemon[i].height}<br>
                        Type: ${type[0]}<br>`;;
                    } else if (data.pokemon[i].type.length === 2) {
                        details = `
                        <html>
                        <body style="text-align: center; background-color: black; color: yellow">
                        <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
                        <h1>${data.pokemon[i].num}. ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}</h1>
                        <img style="margin: 0 auto" src='${data.pokemon[i].img}'</img></body></html><br>
                        Number: ${data.pokemon[i].num}<br>
                        Name: ${request.params.name.charAt(0).toUpperCase()}${request.params.name.slice(1)}<br>
                        Weight: ${data.pokemon[i].weight}<br>
                        Height: ${data.pokemon[i].height}<br>
                        Type: ${type[0]}/${type[1]}<br>`;
                    }
                    break;

                } else {
                    details = `
                    <html>
                    <body style="text-align: center; background-color: black; color: yellow">
                    <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
                    <h1>No Such Pokemon!</h1>
                    <h2> Please add pokemon data to pokedex!</h2>
                    </body>
                    </html>`
                    response.status( 404 );
                }
            }
            response.send(details);
            console.log(details);
    });
});

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

            for (let i=0; i<data.pokemon.length; i++) {
                for (let j=0; j<data.pokemon[i].type.length; j++) {
                    if (data.pokemon[i].type[j].toLowerCase() === request.params.someType.toLowerCase()) {
                        console.log("pokemon type matched");
                        let pokemon = {};
                        pokemon.name = data.pokemon[i].name;
                        pokemon.img = data.pokemon[i].img;
                        sameType.push(pokemon);
                        console.log(sameType);
                    }
                    break;
                }
            }
            for (i=0; i<sameType.length; i++) {
                sameTypeList = `${sameTypeList}<br> <img style="display: block; margin: 0 auto" src='${sameType[i].img}'<br>${sameType[i].name}<br>`
            }

            typePage = `
                    <html>
                    <body style="text-align: center; background-color: black; color: yellow">
                    <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
                    <h1>List of ${request.params.someType} type pokemon</h1><br>
                    <br>${sameTypeList}
                    </body>
                    </html>`;

            response.send(typePage);
             // response.send(sameTypeList);
            // console.log(sameTypeList);
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