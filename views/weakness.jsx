const React = require('react')

class Weakness extends React.Component {
    render() {
        let pokemonHTML = this.props.pokemon.map((item)=>{
            let pokeURL = "/pokemon/" + item.toLowerCase()
            return <li><a href={pokeURL}>{item}</a></li>
        })
        return (
            <html>
                <body>
                  <div>
                    <h1>Weakness: {this.props.weaknessType}</h1>
                    <p>{pokemonHTML}</p>
                  </div>
                </body>
            </html>

            )
    }
}


module.exports = Weakness;