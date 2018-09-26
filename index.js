/////////////////////////////////////////////
//Part one
////////////////////////////////////////////



// const express = require('express');
// const jsonfile = require('jsonfile');

// const file = 'pokedex.json'

// const app = express();

// var results

// var handleRequest = (request, response) => {
//     jsonfile.readFile(file, function(err, obj) {
//         var route = request.path
//         var routeSplit = route.split('/')

//         // search for type
//         if (routeSplit[1] === 'type') {
//             results = searchForType(obj, routeSplit[2]);
//             response.send(results);
//         }
//         // search for weakness
//         else if (routeSplit[1] === 'weakness'){
//             results = searchForWeakness(obj, routeSplit[2]);
//             response.send(results);
//         }
//         // search for rev
//         else if (routeSplit[1] === 'nextevolution'){
//             results = searchForNextRev(obj, routeSplit[2]);
//             response.send(results);
//         }
//         // landing page
//         else if (request.path === '/' ){
//             response.send('<html><body><h1>Welcome to Pokedex</h1></body></html>');
//         }
//         // search by name
//         else if (routeSplit.length === 2){
//         route = route.replace('/', '');
//         results = searchByName(obj, route)

//         if (err){
//             console.log(err);
//         }

//         else{
//             if( results === 'notFound' ){
//                 response.status( 404 );
//             response.send(`Could not find information about ${route} - Is that a new pokemon? Gotta catch em' all!`)
//             }
//             else{
//             response.send(results);
//             }
//         }
//     }
//     });
// }

// var searchByName = (obj, name) => {
//     const pokemons = obj.pokemon;
//     for (var i = 0; i < pokemons.length; i++) {
//         if (name.toLowerCase() === pokemons[i].name.toLowerCase()) {
//             //var string= pokemons[i].name + pokemons[i].weight;
//             return `This is ${pokemons[i].name}, he is ${pokemons[i].weight} in weight and ${pokemons[i].height} in height! He also a ${pokemons[i].type[0]} type pokemon.`
//         }
//     }
//     return 'notFound'
// }


// var searchForType = (obj, poketype) => {
//     const pokemons = obj.pokemon;
//     var arr = []
//     for (var i = 0; i < pokemons.length; i++) {
//         for (var j = 0; j < pokemons[i].type.length; j++) {
//             if (poketype === pokemons[i].type[j].toLowerCase()) {
//                 arr.push(pokemons[i].name)
//             }
//         }
//     }
//     return arr
// }

// var searchForWeakness = (obj, pokeWeakness) => {
//     const pokemons = obj.pokemon;
//     var arr = []
//     for (var i = 0; i < pokemons.length; i++) {
//         for (var j = 0; j < pokemons[i].weaknesses.length; j++) {
//             if (pokeWeakness === pokemons[i].weaknesses[j].toLowerCase()) {
//                 arr.push(pokemons[i].name)
//             }
//         }
//     }
//     return arr
// }

// var searchForNextRev = (obj, rev) => {
//     const pokemons = obj.pokemon;
//     var arr =[]
//     for (var i =0; i<pokemons.length; i ++){
//         if (pokemons[i].prev_evolution !== undefined && pokemons[i].name.toLowerCase() === rev){
//             for (var j =0; j<pokemons[i].prev_evolution.length; j++){
//                 arr.push(pokemons[i].prev_evolution[j].name)
//             }
//         }
//     }
//     return arr
// }



// app.get('*', handleRequest);

// const PORT_NUM = 3000;

// app.listen(PORT_NUM);




/////////////////////////////////////////////
//Part two
////////////////////////////////////////////


const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'
const app = express();
const PORT_NUM = 3000;


// get type
app.get('/type/:pokeType', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>pokedex:</h1>";
        for (let i = 0; i < pokemons.length; i++) {
            for (var j = 0; j < pokemons[i].type.length; j++) {
                if (request.params.pokeType === pokemons[i].type[j].toLowerCase()) {
                    html += "<p>" + pokemons[i].name + "</p>"
                }
            }
        }
        html += "</body>";
        html += "</html>";

        return response.send(html);
    });
});

// get Weakness
app.get('/weaknesses/:pokeWeakness', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<h2>List of Pokemon with " + request.params.pokeWeakness + " weakness: </h2>";
        for (let i = 0; i < pokemons.length; i++) {
            for (var j = 0; j < pokemons[i].weaknesses.length; j++) {
                if (request.params.pokeWeakness === pokemons[i].weaknesses[j].toLowerCase()) {
                    html += "<p>" + pokemons[i].name + "</p>"
                }
            }
        }
        html += "</body>";
        html += "</html>";

        return response.send(html);
    });
});

// get nextEvolution
app.get('/nextevo/:pokeEvo', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].prev_evolution !== undefined && pokemons[i].name.toLowerCase() === request.params.pokeEvo.toLowerCase()) {
                for (var j = 0; j < pokemons[i].prev_evolution.length; j++) {
                    html += "<p>" + pokemons[i].name + "'s previous evolutions are: " + pokemons[i].prev_evolution[j].name + "</p>"
                }
                html += "</body>";
                html += "</html>";

                return response.send(html);
            } else if (pokemons[i].next_evolution !== undefined && pokemons[i].name.toLowerCase() === request.params.pokeEvo.toLowerCase()) {
                html += "<p>" + pokemons[i].name + "'s next evolutions are: " + pokemons[i].next_evolution[j].name + "</p>"
                html += "</body>";
                html += "</html>";

                return response.send(html);
            }
        }
        response.status(304);
        response.redirect('/');
    });
});


// get Name
app.get('/:pokeName', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        for (i in pokemons) {
            if (request.params.pokeName.toLowerCase() === pokemons[i].name.toLowerCase()) {
                html += "<h1>" + pokemons[i].name + "</h1>";
                html += "<img src=" + pokemons[i].img + ">"
                html += "<p>Height: " + pokemons[i].height + "<br>"
                html += "<br>Weight: " + pokemons[i].weight + "<br>"
                html += "<br>Weaknesses: <br><ul>"
                for (let j = 0; j < pokemons[i].weaknesses.length; j++) {
                    html += "<li>" + pokemons[i].weaknesses[j] + "</li>"
                }
                html += "</ul>Type: <ul>"
                for (let k = 0; k < pokemons[i].type.length; k++) {
                    html += "<li>" + pokemons[i].type[k] + "</li>"
                }
                html += "</ul>"
                html += "</body>";
                html += "</html>";

                return response.send(html);
            }

        }
        response.status(304);
        response.redirect('/');

    });
});

// Landing page
app.get('/', (request, response) => {
    //response.send('<html><body><h1>Welcome to the online Pokedex</h1></body></html>');
    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<ul>"

        for (let i = 0; i < pokemons.length; i++) {
            html += "<li><a href='" + pokemons[i].name + "'>" + pokemons[i].name + "</li>"
        }
        html += "</ul>"
        html += "</body>";
        html += "</html>";

        return response.send(html);

    });

});

app.get('/search/:spawn_chance', (request, response) => {
    console.log("REQUEST PARAMS:", request.params);
    console.log("QQUERY PARAMS:", request.query.compare);

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<ul>"

        for (let i = 0; i < pokemons.length; i++) {
            if (request.query.compare === "less") {
                if (parseInt(pokemons[i].spawn_chance) < parseInt(request.query.amount)) {
                    html += "<li>" + pokemons[i].name + "</li>"
                }
            } else if (request.query.compare === "more") {
                if (pokemons[i].spawn_chance > request.query.amount) {
                    html += "<li>" + pokemons[i].name + "</li>"
                }
            }
        }
        html += "</ul>"
        html += "</body>";
        html += "</html>";

        return response.send(html);

    });
});

app.get('/search/:avg_chance', (request, response) => {
    console.log("REQUEST PARAMS:", request.params);
    console.log("QQUERY PARAMS:", request.query.compare);

    jsonfile.readFile(file, (err, obj) => {
        const pokemons = obj.pokemon;

        var html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<ul>"

        for (let i = 0; i < pokemons.length; i++) {
            if (request.query.compare === "less") {
                if (parseInt(pokemons[i].avg_chance) < parseInt(request.query.amount)) {
                    html += "<li>" + pokemons[i].name + "</li>"
                }
            } else if (request.query.compare === "more") {
                if (pokemons[i].avg_chance > request.query.amount) {
                    html += "<li>" + pokemons[i].name + "</li>"
                }
            }
        }
        html += "</ul>"
        html += "</body>";
        html += "</html>";

        return response.send(html);

    });
});

app.listen(PORT_NUM);