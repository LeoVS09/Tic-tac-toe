import game from './game'
import {configureStore} from 'redux-starter-kit'
import {GameState} from "./game";

export interface AppState {
    game: GameState
}

const reducer = {
    game
}

export const store = configureStore<AppState>({
    reducer
})
