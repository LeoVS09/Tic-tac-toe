export function searchSecond(squares, number, first) {
    for(let i = 0; i < squares.length; i++)
        if(i != number)
            for(let symbol of squares[i])
                if(symbol && isEqual(symbol,first)) return i;
}

export function haveTwoVariants(square) {
    if(!Array.isArray(square)) return false;
    for (let i = 0; i < 2 && i < square.length; i++)
        if (square[i] === null || square[i] === undefined) return false;
    return true;
}

export const isEqual = (first,second) => 
    first.symbol == second.symbol && first.step == second.step;

export function polymorph() {
    var len2func = [];
    for(var i=0; i<arguments.length; i++)
        if(typeof(arguments[i]) == "function")
            len2func[arguments[i].length] = arguments[i];
    return function() {
        return len2func[arguments.length].apply(this, arguments);
    }
}

export const clone = arr => arr.map(item => item && {...item});