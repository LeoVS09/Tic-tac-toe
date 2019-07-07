import React from "react";
import { Link } from "react-router-dom";

// TODO: write rules and add styles

export default function Help(){
    return <div className='help'>
        <h1>Game rules</h1>
        <ul>
            <li><Link to='https://www.wikiwand.com/en/Quantum_tic-tac-toe'>Rules</Link></li>
            <li><Link to='https://habrahabr.ru/post/276329/'>Правила на русском</Link></li>
        </ul>
    </div>
}
