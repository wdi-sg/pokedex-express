const React = require('react')

class Type extends React.Component {
    render() {
        let pokemonHTML = this.props.pokemon.map((item)=>{
            let pokeURL = "/pokemon/" + item.toLowerCase()
            return <li><a href={pokeURL}>{item}</a></li>
        })
        return (
            <html>
                <body>
                  <div>
                    <h1>{this.props.pokemonType}</h1>
                    <ul>{pokemonHTML}</ul>
                  </div>
                </body>
            </html>

            )
    }
}


module.exports = Type;