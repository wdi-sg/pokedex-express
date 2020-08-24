var React = require('react');

export default class Spawn extends React.Component {
  render() {

    let {pokeArr} = this.props;

    let spawnList = pokeArr.map(item=>{
        return <li>{item.name}</li>
    });
    return (
        <html>
        <body>
      <div>
        <h1>Pokemon with higher spawn chances</h1>
        <ul>{spawnList}</ul>
      </div>
      </body>
      </html>
    );
  }
}

