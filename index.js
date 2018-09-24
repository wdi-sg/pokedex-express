
const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json'
const PORT_NUMBER = 3001;


var searchByName = (object, pokeName) => {

    for (i in object.pokemon) {

        if (object.pokemon[i].name.toLowerCase() === pokeName.toLowerCase()) {

            return object.pokemon[i].weight;
        };
    };
};


var stripSlashes = (string) => {

    if (string.charAt(0) === "/") string = string.substr(1);
    if (string.charAt(string.length - 1) === "/") string = string.substr(0, string.length - 1);
    return string;
};


var handleRequest = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);

    let result;

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        result = searchByName(obj, stripSlashes(request.path));
        response.send(result);

        });
};


app.get('*', handleRequest );

app.listen(PORT_NUMBER, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));








// var handleRequest = (request, response) => {
//   console.log("request path: "+ request.path );
//   console.log("handling response rn")
//   response.status( 404 );
//   response.send('hello brian!!! YAY');
// };
// var handleOtherRequest = (request, response) => {
//   console.log("request path: "+ request.path );
//   console.log("handling response rn")
//   response.status( 404 );
//   response.send('hello brian!!! YAY');
// };

// app.get('/foo', handleRequest );
// app.get('/bar', handleOtherRequest );
// const PORT_NUMBER = 3001;
// app.listen(PORT_NUMBER);


// jsonfile.writeFile(file, obj, (err) => {
//   console.log(err)
// };
