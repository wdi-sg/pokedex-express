var React = require('react');

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Welcome to the online Pokedex!</h1>
            <h2>{somename}</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;