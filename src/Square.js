import React, {Component} from 'react';
import './Square.css';


class Square extends Component{
    constructor(){
        super();
        this.state = {
            particles: Array(9).fill(null),

        }
    }
    render(){
        let value_class = "square_value" + (this.props.winner ? " win_square" : "");
        return (
            <div className="square" onClick={() => this.props.onClick()}>
                <p className={value_class}>{this.props.value}</p>
            </div>
        );
    }
}

export default Square;