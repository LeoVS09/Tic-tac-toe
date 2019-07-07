import React from "react";
import {UndefinedParadox} from "../core/paradox";
import {GameMap} from "../core/typings";
import './Choice.scss'

export interface ChoiceProps {
    paradox: UndefinedParadox
    onChoice: (map: GameMap) => void
}

export default function Choice({paradox, onChoice}: ChoiceProps) {
    const {variants, confrontation} = paradox
    return (
        <div className='choice'>
            <h3 className='choice__header'>Choose what wil be exist</h3>
            <div className='choice__variants'>
                {variants.map((variant, index) =>
                    <div
                        className='choice__variant'
                        onClick={() => onChoice(variant)}
                        key={index}
                    >
                        {confrontation.variants[index].symbol}
                        <sub>{confrontation.variants[index].step}</sub>
                    </div>
                )}

            </div>
        </div>
    )
}
