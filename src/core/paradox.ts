import {GameMap, MapSymbol} from "./typings";
import {searchDefined} from "./defined";
import unleash from "./unleash";
import searchConflicts from "./conflicts";
import {cloneSquare} from "./utils";

export interface DefinedParadox {
    isDefined: true
    nextMap: GameMap
}

export interface UndefinedParadox {
    variants: Array<GameMap>
    confrontation: {
        index: number
        variants: Array<MapSymbol>
    }
}

export function searchDefinedParadox(map: GameMap): GameMap | null {
    const defined = searchDefined(map)
    if(!defined)
        return null

    const {indexes, symbols} = defined
    return unleash(map, indexes, symbols)
}

export function searchUndefinedParadox(map: GameMap): UndefinedParadox | null {
    const conflicts = searchConflicts(map);
    if(!conflicts)
        return null;

    const {indexes, symbols} = conflicts;

    const variants = [
        unleash(map, indexes, cloneSquare(symbols)),
        unleash(map, indexes, cloneSquare(symbols).reverse())
    ]

    return {
        variants,
        confrontation: {
            index: indexes[0],
            variants: symbols
        }
    };
}


