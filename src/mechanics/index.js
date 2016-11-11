import unleash from "./unleash"
import calculateWinner from './calculateWinner'
import searchDefined from './searchDefined'
import searchConflicts from './searchConflicts'
import {clone} from './utils'
export { calculateWinner };



/*
return{
    isDefine: true,
    squares: squares
} else {
    isDefine: false,
    variants: [squares, ..., squares],
    confrontation: {
        number: int,
        variants: [symbol, ..., symbol]
    }
 */
export function searchParadox(squares) {

    let defined = searchDefined(squares);
    if(defined) return {
        isDefine: true,
        squares: unleash(squares,defined.numbers,defined.symbols)
        };
    let conflicts = searchConflicts(squares);
    if(!conflicts) return null;
    console.log("-----searchConflicts----" + conflicts);
    let {numbers, define} = conflicts;
    return{
        isDefine: false,
        variants: [
            unleash(squares,numbers,clone(define)),
            unleash(squares,numbers,clone(define).reverse())
        ],
        confrontation: {
            number: numbers[0],
            variants: define
        }
    };
}




