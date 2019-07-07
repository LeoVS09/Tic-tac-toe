export enum GamerSymbol {
    X = 'X',
    O = 'O'
}

// Symbol which have been set in map on defined step
export interface MapSymbol {
    symbol: GamerSymbol
    step: number
}
// Map defined 9 squares which can contain one defined symbol
// or multiple parallel existing symbols
export type GameMap = Array<Array<MapSymbol | null> | MapSymbol>
