import {cloneSquare, isEqualSymbols, searchSecondSymbol} from "./utils";
import {GameMap, MapSymbol} from "./typings";

export interface Conflict {
    index: number
    symbol: MapSymbol
}

export default function unleash(map: GameMap, squareIndexes: Array<number>, define: Array<MapSymbol>){
    const clonedMap: GameMap = map.map(square => {
        if(!Array.isArray(square))
            return square

        return cloneSquare(square)
    })

    let conflicts: Array<Conflict> = [];
    do{
        conflicts = [];
        for (const index of squareIndexes) {
            const square = clonedMap[index]

            if (!Array.isArray(square))
                continue

            const symbol = findSymbolNotInList(square, define)
            if(symbol)
                conflicts.push({
                    index,
                    symbol
                });
        }

        for (const {index, symbol} of conflicts) {
            const second = searchSecondSymbol(clonedMap, index, symbol);

            if(second === -1)
                continue

            squareIndexes.push(second);
            define.push(symbol);
        }

    } while (conflicts.length !== 0);

    let k = 0;
    for(let i of squareIndexes)
        clonedMap[i] = define[k++];

    return clonedMap;
}

function findSymbolNotInList(square: Array<MapSymbol | null>, list: Array<MapSymbol>) {

    for(const squareSymbol of square){
        if(!squareSymbol)
            break

        if(!list.some(symbol => isEqualSymbols(squareSymbol, symbol)))
            return squareSymbol
    }

    return null;
}
