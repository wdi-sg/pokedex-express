const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const methodOverride = require('method-override')

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();



app.use(methodOverride('_method'));
app.use(express.static('public'))

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */


function pokeName(x) {
    return x.name;
}


// probably buggy code? neeed testing
function prevE(x) {
    let p;

    if (x.prev_evolution) {
        //p = Object.keys(x.prev_evolution).map(function (k) { return x.prev_evolution[k].name});
        p = Object.keys(x.prev_evolution).map(k => x.prev_evolution[k].name);
         //   console.log("p: " + p);
        return p;
    }
    return "No previous evolutions";
}

// pobably buggy code? to test
function nextE(x) {
    var p = "";
    if (x.next_evolution) {
        for (let i in x.next_evolution) {
       //     console.log(x.next_evolution[i]);
            p += x.next_evolution[i].name + " ";
        }
        return p;
    }
    return p +="No next evolutions";
}

var candyCount = () => {
    //TODO: parseINt for candy count?
};

jsonfile.readFile(file, (err, obj) => {


//detect if the user didn't put anthing in the path. Return a message saying "Welcome to the online Pokdex!"
var size = Object.keys(obj.pokemon);
console.log("size " + size);
console.log("size " + size.length);
var pokey = obj.pokemon; // another way

app.get('/', (request, response) => {
  // send response with some data (a string)
   // response.send("Welcome to the online Pokdex!");

});

app.get('/:id', (request, response) => {

   //   let requestedPokemonId = request.path.split('/')[1];
   let requestedPokemonId = request.params.id;
      console.log( "THING IM LOOKING FOR:",requestedPokemonId );

    for( var i=0; i< pokey.length; i++){

        if( pokey[i].id === parseInt( requestedPokemonId )){

            var pokemon = pokey[i];
        }
      }

      if( pokemon ){
          console.log("FOUND:", pokemon );
          var nextId = pokemon.id + 1;

          var html = "";
          html += "<html>";
          html += "<body>";
          html += "<h1>pokedex:</h1>";

          for( var i=0; i< 5; i++){
            html =+ "<h1>i</h1>"
          }

          html += '<a href="/'+nextId+'">LINK TO NEXT POKEMON</a>';
          html += "<h3>"+pokemon.name+"</h3>";
          html += "<h3> weight: "+pokemon.weight+"</h3>";
          html += '<img src="'+pokemon.img+'"/>';
          html += "</body>";
          html += "</html>";

          response.send(html);
      }else{
          response.send("not a pokemon");
      }

});




app.put('/pokemon/:id', (request, response) => {

    console.log("REQ BODY:", request.body )


    // get what is currently in file

        //n change it with what's in the request

    // write the file

          // console.log( "obj:",obj );
          console.log( "err:",err );

          let requestedPokemonId = request.params.id

          for( let i=0; i< pokey.length; i++){

            if( pokey[i].id === parseInt( requestedPokemonId )){
                var foundPokemonIndex = i;

                var foundPokemon = pokey[i];
            }
          }

          if( foundPokemon ){

            console.log("FOUND:", foundPokemon );


            pokey[foundPokemonIndex] = request.body;

            pokey[foundPokemonIndex].id = parseInt( pokey[foundPokemonIndex].id )

            jsonfile.writeFile(file, banana, function (err) {
                if (err) console.log("ERROR:",err)


                response.send("FOUND, WORKS")
                // response.send(request.body);
                // response.send(request.body);
            })


          }else{
              response.send("not a pokemon");
          }

})



//Handle the case where an invalid pokemon name is provided (eg. `/some-name`). Return a message that says "Could not find information about `<pokemon_name>` - Is that a new pokemon? Gotta catch em' all!" (replace `<pokemon_name>` with the requested for pokemon name) Set the status code to 404
app.get('/name/:name', (request, response) => {

        for (let i = 0; i < size.length; i++) {
        if (obj.pokemon[i].name.toLowerCase() == request.params.name.toLowerCase()) {

           return response.send(`This is ${pokey[i].name}, he is ${pokey[i].weight} in weight! His id is ${pokey[i].id}, num is ${pokey[i].num}, type is ${pokey[i].type}, height is ${pokey[i].height}, candy is ${pokey[i].candy}, candy count is ${pokey[i].candy_count} .. blah blah weaknesses are ${pokey[i].weaknesses}, previous evolution is ${prevE(pokey[i])}, next evolution is ${nextE(pokey[i])} and to be continued .. ?`);

        }
    }
    response.status(404).send(`Could not find information about ${request.params.name}. - Is that a new pokemon? Gotta catch em' all!`);
});

//Expose a new route for `/type/some-type` that returns a message listing the names of all pokemon that have the specified type (eg. `/type/grass` should show a page with names of all pokemon of grass type).
app.get('/type/:name', (request, response) => {

    console.log("path " + request.path);
 console.log("params " + request.params.name);

 response.write("<html>\r\n<body>\r\n<ul>\r\n");
    Object.keys(pokey).forEach((key) => {
        if(pokey[key].type) {
            for (j in pokey[key].type){
                if(pokey[key].type[j].toLowerCase() == request.params.name.toLowerCase())

              response.write("<li>" + pokey[key].name + ": " + pokey[key].type[j] + "</li>");
            }
        }
    });
     response.write("\r\n</ul>\r\n</body>\r\n</html>");
    response.end();
    // need error message
});

// Expose a new route for `/weaknesses/some-weakness` that returns a message listing the names of all pokemon that have the specified weakness (eg. `/weakness/rock`).
app.get('/weaknesses/:name', (request, response) => {


    Object.keys(pokey).forEach((key) => {
        if (pokey[key].name.toLowerCase() == request.params.name.toLowerCase())
        {
            response.write("<html>\r\n<body>\r\n" + "<h3>" + pokey[key].name+ " weaknesses</h3>\r\n"+ "<ul>\r\n");
            for (let j = 0; j<pokey[key].weaknesses.length; j++){
                if(pokey[key].weaknesses[j])
              response.write("<li>" + pokey[key].weaknesses[j] + "</li>");
            }
            response.write("\r\n</ul>\r\n</body>\r\n</html>");
        }
    });
    response.end();
    // need error message
});

//buggy
//Expose a new route for `/nextevolution/some-name` that returns a message listing the names of all pokemon that the pokemon evolves *from* (eg. `/nextevolution/charizard`).
app.get('/nextevolution/:name', (request, response) => {
  // send response with some data (a string)
    console.log("path " + request.path);
 console.log("params " + request.params.name);

    response.write("<html>\r\n<body>\r\n<ul>");
    Object.keys(pokey).forEach((key) => {
        if(pokey[key].prev_evolution) {
                if(pokey[key].name.toLowerCase() == request.params.name.toLowerCase()) {
                    response.write("\n" + pokey[key].name  + ": " + prevE(pokey[key]) + "</li>");
                }
        }
    });
    response.write("</ul>\r\n</body>\r\n</html>");
    response.end();

    // need error message
});



//Access Query Parameters:
//http://localhost:3000?hello=bye query parameter can be accessed with request.query.hello.
//Notice that these are keys and values. hello becomes a key in the query object.

app.get('*', (request, response) => {
  // send response with some data (a string)
  console.log("params " + request.params[0]); // params /bu/wrger/erherh/

  let myParams = request.params[0].split("/");

  //http://127.0.0.1:3000/bu/wrger/erherh/
  console.log("myParams: " + myParams); // myParams: ,bu,wrger,erherh
  myParams = myParams[1];

  console.log("myParams: " + myParams[0] + " !! " + myParams[1]); // myParams: b !! u
  console.log("queryhello "+ request.query.hello);

  console.log("requestpathsplit: " + request.path.split('/')[1]); // requestpathsplit: bu
  console.log("requestpathsplit1: " + typeof(request.path)); // requestpathsplit1: string
  /*const result = myParams.reduce(function(total, num) {
    return total + parseInt(num)
  }, 0);
  response.send("The answer is  " + result)*/

  response.send(request.path);
});
//}
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
