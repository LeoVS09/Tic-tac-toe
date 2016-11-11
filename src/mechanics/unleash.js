export default function unleash(squares,numbers,define){
    console.log("numbers: " + numbers);
    numbers = numbers.slice();
    define = define.map((item) => (item ?{
        symbol: item.symbol,
        step: item.step
    } : null));
    let conflicts = [];
    while(true) {
        for (let number of numbers)
            if (haveAnotherVariants(squares[number], define)) conflicts.push(number);
        if(conflicts.length == 0) break;

        for (let conflict of conflicts) {
            let notIn = notInDefine(squares[conflict], define);
            let second = searchSecond(squares, conflict, notIn);
            numbers.push(second);
            define.push(notIn);
        }
        conflicts = [];
    }
    return ({
        numbers: numbers,
        variant: define
    });
}
function haveAnotherVariants(square,define){
    return !!notInDefine(square,define);
}

const clone = arr =>
    arr.map(item => item && {...item});

function notInDefine(square,define) {
    square = clone(square);
    define = clone(define);

    for(let i = 0; i < square.length && square[i]; i++)
        for(let k = 0; k < define.length && square[i]; k++)
            if(square[i].symbol == define[k].symbol && square[i].step == define[k].step)
                square[i] = null;

    for(let symbol of square) if(symbol) return symbol;
    return null;
}

function searchSecond(squares, number, first) {
    console.log("first: " + first);
    for(let i = 0; i < squares.length; i++)
        if(i != number)
            for(let k = 0; k < squares[i].length && squares[i][k]; k++)
                if(squares[i][k].symbol == first.symbol && squares[i][k].step == first.step) return i;

}