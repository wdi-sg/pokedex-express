import React, {Component} from 'react';

export default class Home extends Component {
    render(){
        let { pokemon } = this.props;
        let allPokemon = pokemon.map((item) =>{
            let path = "/pokemon/" + item.name;
            return <li><a href={path}>{item.name}</a></li>
        })
        return(
            <html>
                <body>
                    <h1>Welcome to the online Pokdex!</h1>
                    <ul>
                        {allPokemon}
                    </ul>
                </body>
            </html>
        )
    }
}