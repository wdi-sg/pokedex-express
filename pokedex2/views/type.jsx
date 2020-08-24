var React = require('react');

export default class Type extends React.Component {
  render() {

    let {type,poke} = this.props;
    let typee = `List of pokemon with ${type} type`
    let pokeList = poke.map(item=>{
        return <li>{item}</li>
    });
    return (
        <html>
        <body>
      <div>
        <h1>{typee}</h1>
        <ul>{pokeList}</ul>
      </div>
      </body>
      </html>
    );
  }
}

