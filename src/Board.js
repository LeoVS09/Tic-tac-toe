import React, {Component} from 'react';
import Square from './Square'
import './Board.css';



class Board extends Component {

    renderRow(indexes){
        return (
            <div className="board-row" key={indexes[0]}>{
                indexes.map((item) => {
                    return this.renderSquare(item);
                })
            }</div>
        );
    }
    renderSquare(i) {
        let winner = false;
        if(this.props.winner){
            for(let k = 0; k < this.props.winner.length; k++)
                if(this.props.winner[k] == i) {
                    winner = true;
                    break;
                }
        }
        return <Square key={i} particles={this.props.squares[i]} winner={winner} onClick={() => this.props.onClick(i)}/>;
    }
    render() {
        let rows = [
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ];
        return (
            <div className="board">
                {rows.map((indexes) => this.renderRow(indexes))}
            </div>
        );
    }
}

export default Board;