import React, {Component} from 'react';
import Board from './Board';
import Choice from './Choice.js';
import './styles/Game.css';
import {calculateWinner,searchParadox} from './mechanics';
class Game extends Component {
    constructor(){
        super();
        this.state = {
            stepNumber: 1,
            history: [{
                squares: Array(9).fill(Array(9).fill(null))
            }],
            xIsNext: true,
            startStep: false,
            isChoicing: false,
            paradox : null
        };
    }
    handleClick(i){

        let history = this.clone(this.state.history);
        let current = history[history.length - 1];
        let squares = current.squares.slice();
        if(calculateWinner(squares) ||
            !Array.isArray(squares[i]) ||
            this.state.isChoicing) return;
        
        let free = this.lastFree(squares[i]);
        if(free === -1) return;
        squares[i][free] = {
            symbol: this.state.xIsNext ? 'X': 'O',
            step: this.state.stepNumber
        };

        let paradox = searchParadox(squares);
        if(paradox !== null)
            if(paradox.isDefine) {
                squares = paradox.squares;
                paradox = null;
            }

        const startStep = !this.state.startStep;
        if(!startStep){
            history = history.concat([{
                squares:squares
            }]);
        }else history[this.state.stepNumber - 1] = {squares:squares};
        this.setState({
            stepNumber: history.length,
            history: history,
            xIsNext: (startStep ? this.state.xIsNext : !this.state.xIsNext),
            startStep: startStep,
            isChoicing: paradox ? true : false,
            paradox: paradox
        });
    }
    choice(squares){
        let history = this.clone(this.state.history);
        history[this.state.stepNumber - 1] = {squares:squares};
        this.setState({
            history: history,
            isChoicing: false,
            paradox: null
        });
    }
    clone(history){
        return history.slice(0,this.state.stepNumber)
                .map(item => ({
                    squares: item.squares.map(element => {
                        if(Array.isArray(element)) return element.slice();
                        return element})
                }));
    }
    lastFree(square) {
        for (let i = 0; i < square.length; i++)
            if (square[i] === null) return i;
        return -1;
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber-1];
        const winner = calculateWinner(current.squares);

        let status;
        if(winner)
            status = 'Winner: ' + winner.symbol;
        else
            status = `NEXT: ${this.state.xIsNext ? "X" : "O"}`;
        const moves = history.map((step,move) =>{
            const desc = move ?
            "Move #" + move:
                "Game start";
            return(
                <li key={move}>
                    <a className="move" href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        return (
            <div className="game">
                <header className="game_header">
                    <h1><span className="quant">Quantum</span> tic-tac-toe<sup><small>v0.4.7</small></sup></h1>
                    <h2 className="game_status">{status}</h2>
                </header>
                <div className="game_board">
                    <Board
                        squares={current.squares}
                        winner={winner ? winner.line : null}
                        onClick={(i)=> this.handleClick(i)}
                        paradox={this.state.paradox}
                    />
                </div>
                {this.state.paradox &&
                    <div className="game_choice">
                        <Choice paradox={this.state.paradox}
                                onClick={(squares) => this.choice(squares)}
                        />
                    </div>
                 }
                <div className="game_info">
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================




export default Game;