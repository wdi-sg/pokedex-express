const express = require('express');

const jsonfile = require('jsonfile');

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



app.get('/type/:type', (req, res) => {
  
  // get the type of pokemon queried

  const type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1).toLowerCase();

  jsonfile.readFile('pokedex.json', (err, obj) => {
    

    // get the pokemon list
    const pokemon = obj.pokemon;


    // create an unordered list
    let ulContent = "";


    // create a list tag element for each pokemon that matches type query
    pokemon.forEach(el => {
      el.type.forEach(el2 => {
        if (el2 === type) {
          let listItem = "<li>" + el.name + "</li>";
          ulContent += listItem;
        }
      })
    });


    // create a html page with the unordered list
    let page = "<html><body><h1>";
    page = page + type;
    page = page + " Type</h1><ul>";
    page = page + ulContent;
    page = page + "</ul></body></html>";

    res.send(page);

  })
});



app.get('*', (request, response) => {
  // send response with some data (a string)


  // change search query with first character in upper case and the rest of the query in lower case
  const req = request.path.charAt(1).toUpperCase() + request.path.slice(2).toLowerCase();


  jsonfile.readFile('pokedex.json', (err, obj) => {


    // get the whole list of pokemon
  	const pokemon = obj.pokemon;


    // noSuchThing determines whether the search query is a valid pokemon name
  	let noSuchThing = true;


    // function to loop through pokemon list
  	pokemon.forEach(el => {
  		if (el.name === req) {
  			noSuchThing = false;
  			let ulContent = "";
  			for (detail in el) {
          if (detail === "img") {
            listItem = "<li>" + detail + " : " + "<img src=" + el[detail] + "></li>";
          } else {
            listItem = "<li>" + detail + " : " + el[detail] + "</li>";
          }
  				ulContent += listItem;
  			}
  			response.send("<html><body><h1>" + req + "</h1><ul>" + ulContent + "</ul></body></html>");
  		}
  	});


    // response when request.path is empty or when pokemon name is not valid
  	if (req === "") {
  		let ulContent = "";
		pokemon.forEach(el => {
			let listItem = "<li>" + el.name + "</li>";
			ulContent += listItem; 
		});
		response.send("<html><body><h1>Welcome to the online Pokedex!</h1><ul>" + ulContent + "</ul></body></html>");
  	} else if (noSuchThing === true) {
  		response.status(404).send("<html><body><p>Could not find information about " + req +" - Is that a new pokemon? Gotta catch em' all!</p></body></html>")
  	}
  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
