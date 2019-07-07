import {DefinedSymbols} from "./defined";
import {haveSeveralVariants, isEqualSymbols, searchSecondSymbol} from "./utils";
import {GameMap, MapSymbol} from "./typings";

// Search symbols which have conflicts to another symbols
export default function searchConflicts(map: GameMap): DefinedSymbols | null {

    for(let i = 0; i < map.length; i++){
        const square = map[i]
        if(!square)
            break

        if(!Array.isArray(square))
            continue

        if(!haveSeveralVariants(square))
            continue

        for(const symbol of square){
            if(!symbol)
                continue

            const index = searchSecondSymbol(map, i, symbol)
            const second = nextConflict(map, index, symbol, i) as false | MapSymbol;

            if (second) {
                const secondIndex = searchSecondSymbol(map, i, second)
                return {
                    indexes: [i, secondIndex],
                    symbols: [symbol, second]
                }
            }
        }
    }

    return null
}

function nextConflict(map: GameMap, current: number, first: MapSymbol, begin: number): boolean | MapSymbol {
    const square = map[current]
    if(!Array.isArray(square))
        return false

    if(!haveSeveralVariants(square))
        return false;

    if(current === begin)
        return true;

    for(const symbol of square) {
        if (!symbol)
            continue

        if (isEqualSymbols(symbol, first))
            continue

        const index = searchSecondSymbol(map, current, symbol)
        const result = nextConflict(map, index, symbol, begin);

        if (result)
            return typeof result === 'boolean' ? symbol : result
    }

    return false
}

