import {createReducer} from 'redux-starter-kit'
import * as actions from '../actions'

export interface CounterState {
    counter: number
}

const state: CounterState = {
    counter: 0
}

const counterReducer = createReducer(state, {
    [actions.increment.type]: (state, {payload}) => {
        state.counter += payload || 1
    },

    [actions.decrement.type]: (state, {payload}) => {
        state.counter -= payload || 1
    }
})

export default counterReducer
