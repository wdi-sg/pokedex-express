import React, {Component} from 'react';

export default class Weaknesses extends Component {
    render(){
        let { weaknesses, array } = this.props;
        let list =  array.map((item)=><li>{item.name}</li>)
        return(
            <html>
                <body>
                    <h1>Whole list for {weaknesses} pokemon!</h1>
                    <ul>
                        {list}
                    </ul>
                </body>
            </html>
        )
    }
}