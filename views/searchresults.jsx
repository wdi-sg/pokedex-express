const React = require('react')

class SearchResults extends React.Component {
    render() {
        let pokemonHTML = this.props.returnedRes.map((item)=>{
            let pokeURL = "/pokemon/" + item.name.toLowerCase()
            return <li><a href={pokeURL}>{item.name}</a></li>
        })
        return (
            <html>
                <body>
                  <div>
                    <h1>Pokemon with {this.props.searchParameter} {this.props.compare} than {this.props.amountReq}</h1>
                    <ul>{pokemonHTML}</ul>
                  </div>
                </body>
            </html>

            )
    }
}


module.exports = SearchResults;