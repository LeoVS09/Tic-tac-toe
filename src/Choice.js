import React, {Component} from 'react';
import './styles/Choice.css';

class Choice extends Component{
    render(){
        return (
            <div className="choice_wrapper">
                <h3>choose</h3>
                <div className="choice_variants">
                    <div className="variant" 
                         onClick={() => this.props.onClick(this.props.paradox.variants[0])}>
                        {this.props.paradox.confrontation.variants[0].symbol}
                    </div>
                    <div className="variant" 
                         onClick={() => this.props.onClick(this.props.paradox.variants[1])}>
                        {this.props.paradox.confrontation.variants[1].symbol}
                    </div>
                </div>
            </div>
        );
    }
}

export default Choice;