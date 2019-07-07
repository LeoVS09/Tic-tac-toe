import {cloneSquare, isEqualSymbols, searchSecondSymbol} from "./utils";
import {GameMap, MapSymbol} from "./typings";

export interface Conflict {
    index: number
    symbol: MapSymbol
}

export default function unleash(map: GameMap, squareIndexes: Array<number>, define: Array<MapSymbol>){
    console.log('unleash', map, squareIndexes, define)
    const clonedMap: GameMap = map.map(square => {
        if(!Array.isArray(square))
            return square

        return cloneSquare(square)
    })


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
