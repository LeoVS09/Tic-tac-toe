import React from "react";
import { Link } from "react-router-dom";
import * as routes from '../routes'
import './TopBar.scss'

export default function TopBar () {
    return (
        <header className='top-bar'>
            <Link to={routes.home} className='top-bar__header'>
                <h1><span className="top-bar__quant">Quantum</span> tic-tac-toe<sup><small>v0.5.2</small></sup></h1>
            </Link>
            <div className='top-bar__menu'>
                <Link to={routes.help} >
                    <span>Rules</span>
                </Link>
            </div>
        </header>
    )
}
