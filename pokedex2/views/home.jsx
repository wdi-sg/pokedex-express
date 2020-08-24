var React = require('react');

class Home extends React.Component {
  render() {

    let {name, weight , spawn} = this.props;
    let message = `Say hi to ${name}!`;
    let message2 = `His is currently weighing at ${weight}!`
    let message3 = `He is spawning at ${spawn }per day`

    return (
        <html>
        <body>
      <div>
        <h1>This is, { name }!</h1>
        <h1>{ message2 }</h1>
        <h2>{message3}</h2>
      </div>
      </body>
      </html>
    );
  }
}

module.exports = Home;