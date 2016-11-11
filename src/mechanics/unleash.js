
import {isEqual,clone,searchSecond} from './utils'

//return squares
export default function unleash(squares,numbers,define){
    squares = squares.map(a => a && clone(a));
    numbers = numbers.slice();
    define = clone(define);
    let conflicts;
    do{
        console.log(numbers);

        conflicts = [];
        for (let number of numbers)
            if (haveAnotherVariants(squares[number], define))
                conflicts.push(number);
        console.log("conflicts: " + conflicts);
        for (let conflict of conflicts) {
            console.log("conflict: " + conflict);
            let notIn = notInDefine(squares[conflict], define);
            console.log("conflict: " + conflict + " not in: " + notIn.step);
            let second = searchSecond(squares, conflict, notIn);
            console.log(second);
            numbers.push(second);
            define.push(notIn);
        }
    }while (conflicts.length != 0);
    console.log("end while");
    let k = 0;
    for(let i of numbers)
        squares[i] = define[k++];
    return squares;
}

const  haveAnotherVariants = (square,define) =>
     !!notInDefine(square,define);

function notInDefine(square,define) {
    console.log((square ? square.map(a => a && a.symbol): square) + " " + define.map(a => a.symbol));
    square = clone(square);
    define = clone(define);

    for(let i = 0; i < square.length && square[i]; i++)
        for(let k = 0; k < define.length && square[i]; k++)
            if(isEqual(square[i],define[k]))
                square[i] = null;

    for(let symbol of square) 
        if(symbol) return symbol;
    return null;
}

