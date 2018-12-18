const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

//http://localhost:3000/search?q=bananas => You are search for bananas



// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

app.get("/:name", (request, response) => {

        let search = request.params.name;

        jsonfile.readFile(file, (err, obj) => {

            let pokedex = obj.pokemon;

            for (i = 0; i < pokedex.length; i++) {
                if (pokedex[i].name.toLowerCase() == search) {
                response.send(
                    `<html>
                        <body>
                            <p>This is <img src = ` +pokedex[i].img+ `></p>
                            <p>He weighs ` +pokedex[i].weight+ `.</p>
                        </body>
                        </html>`
                    );
                } else if (err) {
                    response.sendStatus(404);
                    response.send("Could not find information about " + search + " - Is that a new pokemon? Gotta catch em' all!");
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
