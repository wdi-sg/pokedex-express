var React = require('react');

export default class Next extends React.Component {
  render() {

const {pokeArr} = this.props

let  pokeList = pokeArr.map(item=>{
    return <li>{item}</li>
})

    return (
      <html>
        <body>
          <div>
            <h1></h1>
            <h2></h2>
            <ul>{pokeList}</ul>
          </div>
        </body>
      </html>
    );
  }
}