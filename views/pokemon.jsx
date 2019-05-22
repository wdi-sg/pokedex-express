var React = require('react');

class Pokemon extends React.Component {
  render() {

const actionAttribute = `/pokemon/${this.props.pokeInfo}/?_method=PUT`


return(
<html>


<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
<title>Pokeman</title>
</head>


<body>

    <form method="POST" action={actionAttribute}>

        <label for="id">Pokemon ID (1 to 151):</label>
            <input type = "number" name = "pokemon_id" value = {this.props.pokeInfo.id}/>
            <br/>

        <label for="num">Pokemon Number (001 to 151):</label>
            <input type = "text" name = "pokemon_num" value = {this.props.pokeInfo.num}/>
            <br/>

        <label for="name">Name:</label>
<input type = "text" name = "pokemon_name" value= {this.props.pokeInfo.name}/>
            <br/>

        <label for="pokemon_img">Picture:</label>
<input type = "image" name = "pokemon_img" src= {this.props.pokeInfo.img}/>
            <br/>

        <label for="pokemon_height">Height:</label>
<input type = "text" name = "pokemon_height" value = {this.props.pokeInfo.height}/>
            <br/>

        <label for="pokemon_weight">Weight:</label>
<input type = "text" name = "pokemon_weight" value = {this.props.pokeInfo.weight}/>
            <br/>

        <label for="pokemon_candy">Candy:</label>
<input type = "text" name = "pokemon_candy" value = {this.props.pokeInfo.candy}/>
            <br/>

        <label for="pokemon_candy_count">Candy count:</label>
<input type = "text" name = "pokemon_candy_count" value = {this.props.pokeInfo.candy_count}/>
            <br/>

        <label for="pokemon_egg">Egg:</label>
<input type = "text" name = "pokemon_egg" value = {this.props.pokeInfo.egg}/>
            <br/>

        <label for="pokemon_avg_spawn">Average spawn:</label>
<input type = "text" name = "pokemon_avg_spawn" value = {this.props.pokeInfo.avg_spawns}/>
            <br/>

        <label for="pokemon_spawn_time">Average spawn time:</label>
<input type = "text" name = "pokemon_spawn_time" value = {this.props.pokeInfo.spawn_time}/>
            <br/>

        <input type="submit" value="Submit"/>
    </form>




</body>
</html>
    )
  }
}


module.exports = Pokemon;