import React, {Component} from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            stepNumber: 1,
            history: [{
                squares: Array(9).fill(Array(9).fill(null))
            }],
            xIsNext: true,
            startStep: false
        };
    }
    handleClick(i){

        let history = this.state.history.slice(0,this.state.stepNumber)
                          .map(item => ({
                              squares: item.squares.map(arr => arr.slice())
                          }));
        let current = history[history.length - 1];
        let squares = current.squares.slice();
        if(calculateWinner(squares) || !Array.isArray(squares[i])) return;
        let free = this.lastFree(squares[i]);

        if(free === -1) return;
        squares[i][free] = {
            symbol: this.state.xIsNext ? 'X': 'O',
            step: this.state.stepNumber
        };
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
            startStep: startStep
        });
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
            status = `next player: ${this.state.xIsNext ? "X" : "O"}`;
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
                    <h1>Tic-tac-toe game</h1>
                    <h2 className="game_status">{status}</h2>
                </header>
                <div className="game_board">
                    <Board
                        squares={current.squares}
                        winner={winner ? winner.line : null}
                        onClick={(i)=> this.handleClick(i)}
                    />
                </div>
                <div className="game_info">
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (!Array.isArray(squares[a]) && squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                symbol: squares[a],
                line: [a,b,c]
            }
        }
    }
    return null;
}

export default Game;