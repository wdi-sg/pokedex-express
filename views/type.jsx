import React, {Component} from 'react';

export default class Type extends Component {
    render(){
        let { type, array } = this.props;
        let list =  array.map((item)=><li>{item.name}</li>)
        return(
            <html>
                <body>
                    <h1>Whole list for {type} pokemon!</h1>
                    <ul>
                        {list}
                    </ul>
                </body>
            </html>
        )
    }
}