var React = require('react');

class Weaknesses extends React.Component {
  render() {
    const pokemonWeak = this.props.weakness ;
    const pokemons = this.props.pokemons ;
    let pokemonList = pokemons.map( pokemon=> {
      return <li>{pokemon}</li>
    });
    let message = `The following pokemons have weakness for ${pokemonWeak}`;

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

module.exports = Weaknesses;