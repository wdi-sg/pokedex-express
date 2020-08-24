var React = require('react');

export default class Root extends React.Component {
  render() {

    let {poke} = this.props;
    let links = `List of pokemon in pokedex`
    let pokeList = poke.map(item=>{
        return <li><a href={`${item}`}>{item}</a></li>
    });
    return (
        <html>
        <body>
      <div>
        <h1>{links}</h1>
        <ul>{pokeList}</ul>
      </div>
      </body>
      </html>
    );
  }
}

