
const jsonfile = require('jsonfile');
const file = 'pokedex.json'

const express = require('express');
var formidable = require('formidable');

var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

const app = express();


//pokemonObj["pokemon"][1]["name"]

app.get('/upload', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});

app.get('/testUpload', (request, response) => {
    response.send(`<form enctype="multipart/form-data" action="/testUpload" method="POST">
  <input type="file" name="myFile">
  <input type="submit" class="btn btn-primary">
</form>`)
})

app.post('/testUpload', upload.single('myFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
});

app.get('/', (request, response) => {
    response.send(`<html><h1>Welcome to the online Pokdex</h1><html>`)
});

app.get("/:pokemonName", (request, response) => {
    let pokemon = request.params.pokemonName;
    let pokemonName;
    jsonfile.readFile(file, (err, pokemonObj) => {
        const pokemonArray = pokemonObj["pokemon"];
        // length is 151
        for (let i = 0; i < pokemonArray.length; i++) {
            //console.log(pokemonArray[i].name)
            if (pokemon === pokemonArray[i]["name"].toLowerCase()) {
                pokemonName = pokemonArray[i]["name"];
                console.log("yes")
                let weight = pokemonArray[i]["weight"];
                let candy = pokemonArray[i]["candy"]

                response.send(`This is ${pokemonName}, he is ${weight} in weight! He loves to eat ${candy}!`);
            } // end of if statement
        }  // end of for loop

        if (pokemonName === undefined) {
            response.send(404, `Could not find information about ${pokemon} - Is that a new pokemon? Gotta catch em' all!`)
        }
    })    // end of read file
});   // end of get pokemon name


app.get("/type/:type", (request, response) => {
    let requestedType = request.params.type;
    const selectedPokemon = [];

    jsonfile.readFile(file, (err, pokemonObj) => {
        const pokemonArray = pokemonObj["pokemon"];

        //console.log(pokemonArray[0]["type"][0]);  // grass

        for (let i = 0; i < pokemonArray.length; i++) {
            const typeArray = pokemonArray[i]["type"];

            for (let t = 0; t < typeArray.length; t++) {
                // if requested type is inside of the type array, take the details
                if (requestedType === typeArray[t].toLowerCase()) {
                    // take the pokemon details
                    //console.log(pokemonArray[i]["name"])
                    selectedPokemon.push(pokemonArray[i]["name"]);

                }
            } // end of for loop for type
        } // end of for loop for pokemon
        //console.log(selectedPokemon);
        response.send(selectedPokemon.join(", "));

    })  // end of reading file

}) // end of get type


app.get("/weakness/:weakness", (request, response) => {
    let requestedWeakness = request.params.weakness;
    const selectedPokemon = [];

    jsonfile.readFile(file, (err, pokemonObj) => {
        const pokemonArray = pokemonObj["pokemon"];

        //console.log(pokemonArray[0]["type"][0]);  // grass

        for (let i = 0; i < pokemonArray.length; i++) {
            const weaknessArray = pokemonArray[i]["weaknesses"];

            for (let w = 0; w < weaknessArray.length; w++) {
                // if requested type is inside of the type array, take the details
                if (requestedWeakness === weaknessArray[w].toLowerCase()) {
                    // take the pokemon details
                    //console.log(pokemonArray[i]["name"])
                    selectedPokemon.push(pokemonArray[i]["name"]);

                }
            } // end of for loop for type
        } // end of for loop for pokemon
        //console.log(selectedPokemon);
        response.send(selectedPokemon.join(", "));

    })  // end of reading file

})// end of get weakness


app.get("/nextevolution/:pokemonName", (request, response) => {
    //// enter your code
})// end of get nextevolution



// weijun's code
app.get('/nextevolution/:someEvolution', (request, response) => {

    var inputType = request.params.someEvolution.charAt(0).toUpperCase() + request.params.someEvolution.slice(1);
        jsonfile.readFile(file, (err, list)=>{
            var listType =[];
            for(let i = 0; i<list.pokemon.length; i++){
                if(list.pokemon[i].name.includes(inputType) > 0){
                    listType.push(list.pokemon[i].prev_evolution);
                }
            }
            if(listType.length > 0){
                response.send(listType);
            } else {
                response.send(404, 'Pokemon is the lowest scrub-form. Or does not have evolve from other forms. Please request again.')
            }
    });
});





const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));