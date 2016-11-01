import React, {Component} from 'react';
import './Square.css';


class Square extends Component{
    constructor(){
        super();
        this.state = {
            particles: Array(9).fill(null)
        }
    }
    render(){
        return (
            <div className="square" onClick={() => this.props.onClick()}>
                <p className="square_value">{this.props.value}</p>
            </div>
        );
    }
}

export default Square;