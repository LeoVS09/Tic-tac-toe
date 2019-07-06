import React from "react";
import { Link } from "react-router-dom";

export interface TopBarProps {
    routes: Array<{to: string, label: string}>
}

export default function ({routes}: TopBarProps) {
    return <nav>
        <ul>
            {routes.map(({to, label}) => (
                <li key={to}>
                    <Link to={to}>{label}</Link>
                </li>
            ))}
        </ul>
    </nav>
}
