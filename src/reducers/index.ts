import counter, {CounterState} from './counter'
import {configureStore} from 'redux-starter-kit'

export interface AppState {
    counter: CounterState
}

const reducer = {
    counter
}

export const store = configureStore({
    reducer
})
