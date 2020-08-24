import React, {Component} from 'react';

export default class SpawnChance extends Component {
    render(){
        let { array } = this.props;
        let list = array.map((item) =>{
            return <li>{item.name}</li>
        })
        return(
            <html>
                <body>
                    <h1>Spawn Chance</h1>
                    <ul>
                        {list}
                    </ul>
                </body>
            </html>
        )
    }
}