import {GameMap, GamerSymbol, MapSymbol} from "./typings";

// Hack, describe lines which can use to calculate winner
// Each number is reference to index of map square
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

export interface Winner {
    indexes: Array<number>
    symbol: GamerSymbol
}

export function calculateWinners(map: GameMap): Array<Winner> {
    return lines
        .map(line => {
            const [a, b, c] = line
            return {
                indexes: line,
                values: [map[a], map[b], map[c]]
            }
        })
        .filter(({values: [a, b, c]}) =>
            !Array.isArray(a) && !Array.isArray(b) && !Array.isArray(c) &&
            a.symbol === b.symbol && b.symbol === c.symbol
        )
        .map(({indexes, values}) => {
            const [{symbol}] = values as Array<MapSymbol>
            return {
                indexes,
                symbol
            }
        })
}
