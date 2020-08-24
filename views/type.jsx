var React = require('react');

class Type extends React.Component {
  render() {
    const pokemonType = this.props.type ;
    const pokemons = this.props.pokemons ;
    let pokemonList = pokemons.map( pokemon=> {
      return <li>{pokemon}</li>
    });
    let message = `The following pokemons fall under your search category ${pokemonType}`;

    return (
      <html>
        <body>
          <div>
            <h1>Welcome to the online Pokedex!</h1>
            <h2>{message}</h2>
            <ul>{pokemonList}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Type;