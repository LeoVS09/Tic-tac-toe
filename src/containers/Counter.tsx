import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {AppState} from '../reducers'

export interface CounterProps {
    value: number
    increment: (n: number) => void
    decrement: (n: number) => void
}

function counter({value, increment, decrement}: CounterProps) {
    return (
        <div>
            <h3>Counter value: {value}</h3>
            <button onClick={() => increment(1)}>add</button>
            <button onClick={() => decrement(2)}>subtract 2</button>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    value: state.counter.counter
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: (n: number) => dispatch(actions.increment(n)),
    decrement: (n: number) => dispatch(actions.decrement(n))
})

const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(counter)

export default Counter
