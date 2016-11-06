import React, {Component} from 'react';
import './Square.css';

function Row(props){
    if(!props.arr) return null;
    return(
        <tr>{
            props.arr.map((item,i) => {
                let result;
                if(item !== null) return <td key={i}>{item.symbol}<sub>{item.step}</sub></td>;
                return <td key={i}>{item}</td>
            })
        }</tr>
    )
}
class Square extends Component{

    lastFree(square) {
        for (let i = 0; i < square.length; i++)
            if (square[i] === null) return i;
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
                <tbody>
                    <Row key="0" arr={rows[0]} />
                    <Row key="1" arr={rows[1]} />
                    <Row key="2" arr={rows[2]} />
                </tbody>
            </table>
        )
    }
    renderValue(value,winner){
        if(value === null) return null;
        if(winner) return <p className="win_square"> {value.symbol}</p>;
        return <p> {value.symbol}</p>;
    }
    render(){
        let value_class = "square_value" + (this.props.winner ? " win_square" : "");
        let square_class = "square" + (this.props.spotlight ? " square_spotlight" : "");
        return (
            <div className={square_class} onClick={() => this.props.onClick()} onMouseDown={() => false}>
                {Array.isArray(this.props.value) ? this.table(this.props.value) : 
                    this.renderValue(this.props.value,this.props.winner)}
            </div>
        );
    }
}

export default Square;