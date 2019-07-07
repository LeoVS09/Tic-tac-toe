import {GameMap, MapSymbol} from "./typings";

export function lastFree(squares: Array<MapSymbol | null> ) {
    for (let i = 0; i < squares.length; i++)
        if (squares[i] === null)
            return i;

    return -1;
}

export function searchSecondSymbol(map: GameMap, index: number, first: MapSymbol): number {
    for(let i = 0; i < map.length; i++) {
        const square = map[i]
        if(i === index || !Array.isArray(square))
            continue

        for(let symbol of square)
            if(symbol && isEqualSymbols(symbol,first))
                return i;

    }

    return -1
}

export function haveSeveralVariants(square: Array<MapSymbol | null> | MapSymbol): boolean {
    if(!Array.isArray(square))
        return false;

    for (let i = 0; i < 2 && i < square.length; i++)
        if (!square[i])
            return false;

    return true;
}

export const isEqualSymbols = (first: MapSymbol,second: MapSymbol) =>
    first.symbol === second.symbol &&
    first.step === second.step;

export function cloneSquare<T>(square: Array<T>): Array<T> {
    return square.map(item => item && {...item})
}
