import {isEqual,haveTwoVariants,searchSecond} from './utils'


//return{ 
// numbers: [indexes of conflicts squares],
// define: [define symbols]
//}

export default function searchConflicts(squares) {
    
    for(let i = 0; i < squares.length && squares[i]; i++)
        if(haveTwoVariants(squares[i]))
            for(let symbol of squares[i]) if(symbol) {
                let second = next(squares, searchSecond(squares, i, symbol), symbol, i);
                if (second) 
                    return {
                        numbers: [i,searchSecond(squares,i,second)],
                        define: [symbol,second]
                    }
            }
}

function next(squares, current, first, begin) {
    if(!haveTwoVariants(squares[current])) return false;
    if(current == begin) return true;
    for(let symbol of squares[current]) if(symbol)
        if(!isEqual(symbol,first)) {
            let result = next(squares, searchSecond(squares, current, symbol), symbol, begin);
            if (result) 
                if(result.symbol) return result;
            else return symbol;
        }
}

function paradoxes(first,second) {
    let paradoxs = [];
    for(let i = 0; i < first.symbols.length; i++)
        second.symbols.forEach(symbol =>
        isEqual(first.symbols[i],symbol) && paradoxs.push(i));
    if(paradoxs.length < 2) return null;

    if(paradoxs.length == 2) {
        let variant = paradoxs.map(i => first.symbols[i]);
        return [variant, variant.reverse()];
    }
    return null;
}

