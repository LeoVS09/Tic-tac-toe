import React from "react";
import {GameMap} from "../core/typings";
import {Winner} from "../core/winners";
import {UndefinedParadox} from "../core/paradox";
import Square from './Square'
import './Board.scss'

export interface BoardProps {
    map: GameMap
    winners: Array<Winner>
    paradox: UndefinedParadox | null
    onClick: (i: number) => void
}

const rows = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

export default function Board({map, winners, paradox, onClick}: BoardProps) {

    const isWinner = (i: number) => {
        for(const {indexes} of winners)
            if(indexes.some(index => index === i))
                return true

        return false
    }

    const isSpotlight = (i: number) => {
        if(!paradox)
            return false

        return paradox.confrontation.index === i
    }

    return (
        <div className='board'>
            {rows.map((row, i) =>
                <div className='board__row' key={i}>
                    {row.map(index => (
                        <Square
                            key={index}
                            value={map[index]}
                            isWinner={isWinner(index)}
                            spotlight={isSpotlight(index)}
                            onClick={() => onClick(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
