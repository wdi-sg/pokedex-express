var React = require('react');

class Pokemon extends React.Component {
  render() {
    const somename = this.props.name;
    const someweight = this.props.weight
    let message = `Were you looking for ${somename}? The pokemon is ${someweight}`;
    if(this.props.name === undefined){
        message = this.props;
    }

    return (
      <html>
        <body>
          <div>
            <h1>Welcome to the online Pokedex!</h1>
            <h2>{message}</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;