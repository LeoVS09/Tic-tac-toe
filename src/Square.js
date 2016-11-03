import React, {Component} from 'react';
import './Square.css';


class Square extends Component{
    row(arr){
        if(!arr) return null;
        return(
            <tr>{
                arr.map((item) => {
                    let result;
                    if(item !== null) return <td>{item.symbol}<sub>{item.step}</sub></td>;
                    return <td>{item}</td>
                })
            }</tr>
        )
    }
    lastFree(square) {
        for (let i = 0; i < square.length; i++)
            if (square[i] === null) return i+1;
        return square.length;
    }
    table(arr) {
        let free = this.lastFree(arr);
        let rows = [];
        if(free < 3)
            rows.push(arr.slice(0,free));
        else{
            rows.push(arr.slice(0,3));
            if(free < 6)
                rows.push(arr.slice(3,free));
            else{
                rows.push(arr.slice(3,6));
                rows.push(arr.slice(6,free));
            }
        }

        return(
            <table>
                {this.row(rows[0])}
                {this.row(rows[1])}
                {this.row(rows[2])}
            </table>
        )
    }
    render(){
        let value_class = "square_value" + (this.props.winner ? " win_square" : "");
        return (
            <div className="square" onClick={() => this.props.onClick()}>
                {this.table(this.props.particles)}
            </div>
        );
    }
}

export default Square;