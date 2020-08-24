const React = require('react')

class Home extends React.Component {
    render() {
        const pageStyle = {
            padding: "10px",
            fontFamily: "arial"
        }

        let pokemonList = this.props.pokemon
        let pokemonHTML = pokemonList.map((item) => {
            let pokePath = "/pokemon/" + item.name.toLowerCase();
            return <li><a href={pokePath}>{item.name}</a></li>
         })



        return (
            <html>
                <body>
                  <div style={pageStyle}>
                    <h1>{this.props.responseText}</h1>
                    <ul>
                        {pokemonHTML}
                    </ul>
                  </div>

                </body>
            </html>

            )
    }
}


module.exports = Home;