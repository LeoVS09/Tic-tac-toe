import React from "react";
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {GameMap, GamerSymbol} from "../core/typings";
import {calculateWinners, Winner} from "../core/winners";
import {AppState} from "../reducers";
import * as actions from "../actions";
import {searchUndefinedParadox, UndefinedParadox} from "../core/paradox";
import Board from "../components/Board";
import Choice from "../components/Choice";
import './Game.scss'

export interface GameProps {
    map: GameMap
    nextSymbol: GamerSymbol
    winners: Array<Winner>
    setSymbol: (i: number) => void
    makeChoice: (map: GameMap) => void
    paradox: UndefinedParadox | null
}


class Game extends React.Component<GameProps> {

    handleNextStep = (i: number) => {
        const {map, winners, paradox, setSymbol} = this.props

        // Prevent next step when have winners or paradox
        if(winners.length || paradox)
            return

        // Prevent step to defined item
        if(!Array.isArray(map[i]))
            return;

        setSymbol(i)
    }

    handleChoice = (map: GameMap) => {
        this.props.makeChoice(map)
    }

    render(){
        const {map, winners, nextSymbol, paradox} = this.props
        let headerText = `Next: ${nextSymbol}`

        if(winners.length === 1)
            headerText = `Winner: ${winners[0].symbol}`

        if(winners.length > 1)
            headerText = 'In some reality you win'

        return (
            <main className='game'>
                <h2 className='game__header'>{headerText}</h2>
                <div className='game__board'>
                    <Board
                        map={map}
                        winners={winners}
                        paradox={paradox}
                        onClick={this.handleNextStep}
                    />
                </div>
                {paradox &&
                    <div className='game__choice'>
                        <Choice
                            paradox={paradox}
                            onChoice={this.handleChoice}
                        />
                    </div>
                }
            </main>
        )
    }
}

const mapStateToProps = ({game: {map, nextSymbol}}: AppState) => ({
    map,
    nextSymbol,
    winners: calculateWinners(map),
    // If map contain undefined paradox, then user must choose which version of map will be exist
    paradox: searchUndefinedParadox(map)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSymbol: (n: number) => dispatch(actions.setSymbol(n)),
    makeChoice: (map: GameMap) => dispatch(actions.makeChoice(map))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)
