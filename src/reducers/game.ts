import {createReducer} from 'redux-starter-kit'
import * as actions from '../actions'
import {GameMap, GamerSymbol, MapSymbol} from "../core/typings";
import {lastFree} from "../core/utils";
import {searchDefinedParadox} from "../core/paradox";

export interface GameState {
    map: GameMap
    step: number
    // If step start then user can define two parallel existing symbols in two places
    isStepStart: boolean
    nextSymbol: GamerSymbol
}

const state: GameState = {
    map: Array<Array<MapSymbol|null>>(9).fill(Array(9).fill(null)),
    step: 1,
    nextSymbol: GamerSymbol.X,
    isStepStart: true
}

const gameReducer = createReducer(state, {
    // User trying set symbol on map
    [actions.setSymbol.type]: (state, {payload: index}) => {
        const square = state.map[index]

        // If square where user try set symbol not defined
        if(!Array.isArray(square))
            return;

        const freeIndex = lastFree(square)
        if(freeIndex === -1)
            return;

        square[freeIndex] = {
            symbol: state.nextSymbol,
            step: state.step
        }

        // Find paradox and set new game map if can
        const nextMap = searchDefinedParadox(state.map)
        if(nextMap)
            state.map = nextMap

        state.isStepStart = !state.isStepStart

        if(!state.isStepStart)
            return;

        state.nextSymbol = state.nextSymbol === GamerSymbol.X ?
            GamerSymbol.O :
            GamerSymbol.X

        state.step += 1
    },

    // User choose which reality will be exist
    [actions.makeChoice.type]: (state, {payload: map}) => {
        if(map.some((item: any) => !item))
            return

        state.map = map
    }
})

export default gameReducer
