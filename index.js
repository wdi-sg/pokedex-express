const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
var file = "pokedex.json";

app.get("/pokemon/:pname", (request, response) => {
 	let a = request.params.pname;
  	jsonfile.readFile(file, (err, obj) => {
	 	//response.send("The weight of " + a +" is " + obj.pokemon[0].weight)
	 	for (i=0;i<2;i++) {
	 	 	if (obj.pokemon[i].name==a) {
	 	 		response.send("The weight of " + obj.pokemon[i].name+" is " + obj.pokemon[i].weight);
	 	 	}
	 	}
	 });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
