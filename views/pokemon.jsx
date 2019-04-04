var React = require('react');

class Pokemon extends React.Component {
  render() {

return(
<html>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
<head><title>Pokeman</title></head>


<body>
    <p>
{this.props.pokeInfo.name}

        <form>
        <label>
        Name: <input type="text" name="name"/>
        </label>
        <input type="submit" value="Submit"/>
        </form>

    </p>


</body>
</html>
    )
  }
}


module.exports = Pokemon;