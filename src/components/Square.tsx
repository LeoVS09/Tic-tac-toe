import React from "react";
import {MapSymbol} from "../core/typings";
import './Square.scss'

export interface SquareProps {
    value: Array<MapSymbol | null> | MapSymbol
    isWinner: boolean
    spotlight: boolean
    onClick: () => void
}

export default function Square({value, isWinner, spotlight, onClick}: SquareProps) {

    // eslint-disable-next-line
    const winnerClass = isWinner && 'square_winner' || ''

    // eslint-disable-next-line
    const spotlightClass = spotlight && 'square_spotlight' || ''

    return (
        <div
            className={`square ${winnerClass} ${spotlightClass}`}
            onClick={onClick}
        >
            {
                // Check is this defined value
                !Array.isArray(value) ?

                    // Display defined value
                    <p>{value.symbol}</p> :

                    // Display multiple parallel existing values
                    <SquareTable values={value}/>
            }
        </div>
    )
}

export interface SquareTableProps {
    values: Array<MapSymbol | null>
}

function SquareTable({values}: SquareTableProps) {
    const rows = [
        values.slice(0, 3),
        values.slice(3, 6),
        values.slice(6, 9)
    ]
    return (
        <table>
            <tbody>
                {rows.map((rowValues, i) =>
                    <SquareRow values={rowValues} key={i} />
                )}
            </tbody>
        </table>
    )
}

export interface SquareRowProps {
    values: Array<MapSymbol | null>
}

function SquareRow ({values}: SquareRowProps){
    if(!values.filter(v => !!v).length)
        return null

    return (
        <tr>{
            values.map((item, i) => {
                if (!item)
                    return null

                const {symbol, step} = item

                return <td key={i}>{symbol}<sub>{step}</sub></td>
            })
        }</tr>
    )
}
