import {GameMap, MapSymbol} from "./typings";
import {haveSeveralVariants, isEqualSymbols} from "./utils";

export interface DefinedSymbols {
    indexes: Array<number>,
    symbols: Array<MapSymbol>
}

// Search symbols which can be defined based on paradoxes
export function searchDefined(map: GameMap): DefinedSymbols | null {
    for(let i = 0; i < map.length; i++) {
        let equivalent = searchEquivalentsInSquare(map[i]);
        if (equivalent)
            return {
                indexes: [i],
                symbols: [equivalent]
            };
    }

    for(let i = 0; i < map.length; i++) {
        if (!haveSeveralVariants(map[i]))
            continue

        for (let k = i + 1; k < map.length; k++) {

            const first = map[i]
            const second = map[k]
            if(!Array.isArray(first) || !Array.isArray(second))
                continue

            const equivalents = searchEquivalentSymbols(first, second);

            if (equivalents)
                return {
                    indexes: [i, k],
                    symbols: equivalents
                }

        }
    }

    return null
}


function searchEquivalentsInSquare(square: Array<MapSymbol | null> | MapSymbol) {
    if(!Array.isArray(square))
        return null;

    for(let i = 0; i < square.length; i++) {
        if(!square[i])
            break

        for(let k = i + 1; k < square.length; k++) {
            if(!square[k])
                break

            if (
                square[i]!.symbol === square[k]!.symbol &&
                square[i]!.step === square[k]!.step
            )
                return square[i]

        }
    }

    return null;
}

function searchEquivalentSymbols(first: Array<MapSymbol | null>, second: Array<MapSymbol | null>): Array<MapSymbol> | null {
    let variants: Array<MapSymbol> = [];

    for(const firstSymbol of first){
        if(!firstSymbol)
            break

        for(const secondSymbol of second)
            if(secondSymbol && isEqualSymbols(firstSymbol, secondSymbol))
                variants.push(firstSymbol)
    }

    if(variants.length < 2)
        return null;

    if(variants.length === 2) {
        if (variants[0].symbol === variants[1].symbol)
            return variants;
    }

    return null
}
