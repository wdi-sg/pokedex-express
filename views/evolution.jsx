const React = require('react')

class Evolution extends React.Component {
    render() {
        let previousEvolutions;
        if (this.props.previous!==undefined) {
            previousEvolutions = this.props.previous.map((item)=>{
                let pokeURL = "/pokemon/" + item.name.toLowerCase()
                return <li><a href={pokeURL}>{item.name}</a></li>
            })
        } else {
            previousEvolutions = "This pokemon has no previous evolutions."
        }
        return (
            <html>
                <body>
                  <div>
                    <h1>Evolutions of {this.props.chosen}</h1>
                    {previousEvolutions}
                  </div>
                </body>
            </html>

            )
    }
}


module.exports = Evolution;