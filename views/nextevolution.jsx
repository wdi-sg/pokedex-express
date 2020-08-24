var React = require('react');

class Next extends React.Component {
  render() {
    const pokemonNext = this.props.nextEvolve ;
    const pokemons = this.props.pokemons ;
    let pokemonList = pokemons.map( pokemon=> {
      return <li>{pokemon}</li>
    });
    let message = `The following pokemons will evolve to  ${pokemonNext}`;

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

module.exports = Next;