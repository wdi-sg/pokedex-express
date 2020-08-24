const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + "/views");
app.set('view engine', 'jsx');

app.get('/pokedex/:some-name', (req, res) => {
  jsonfile.readFile('pokedex.json', (err, obj) => {
    const data ={ 
      name: obj.pokemon[req.params.some-name].name,
      weight: obj.pokemon[req.params.some-name].weight

    }
    res.render('pokedex',data)
  })
})




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
