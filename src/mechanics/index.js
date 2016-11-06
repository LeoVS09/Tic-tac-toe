function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && !Array.isArray(squares[a]) &&
            squares[a].symbol === squares[b].symbol &&
            squares[a].symbol === squares[c].symbol)
            return {
                symbol: squares[a].symbol,
                line: [a,b,c]
            };
    }
    return null;
}

function searchParadox(squares) {
    let variants = [];
    for(let square of squares) if(square && Array.isArray(square)) {
        let equivalent = searchEquivalents(square);
        if (equivalent)
            return {
                isOneSquare: true,
                number: squares.indexOf(square),
                equivalent: equivalent
            };

        if(haveTwoVariants(square))
            variants.push(toVariant(square, squares.indexOf(square)));

    }
    if(variants.length > 1)
        for(let i = 0; i < variants.length; i++)
            for(let k = i+1; k < variants.length; k++){
                let paradoxs = paradoxes(variants[i],variants[k]);
                if(paradoxs) {
                    let numbers = [variants[i].number, variants[k].number];
                    if(paradoxs.variant) {
                        let result = unleash(squares,numbers,paradoxs.variant);
                        return ({
                            isOneSquare: false,
                            isDefinitely: true,
                            numbers: result.numbers,
                            variant: result.variant
                        });
                    }
                    return ({
                        isOneSquare: false,
                        isDefinitely: false,
                        numbers: numbers,
                        confrontations: [paradoxs.firstVariant, paradoxs.secondVariant]
                    });
                }
            }
    return null;
}

function haveTwoVariants(square) {
    if(!Array.isArray(square)) return false;
    for (let i = 0; i < 2 && i < square.length; i++)
        if (square[i] === null || square[i] === undefined) return false;
    return true;
}

function toVariant(square,i) {
    let symbols = [];
    for(let symbol of square) if(symbol)
        symbols.push(symbol);
    else break;
    return{
        number: i,
        symbols:symbols
    };
}

function paradoxes(first,second) {

    let paradoxs = [];
    for(let i = 0; i < first.symbols.length; i++)
        for(let k = 0; k < second.symbols.length; k++)
            if (first.symbols[i].symbol === second.symbols[k].symbol &&
                first.symbols[i].step === second.symbols[k].step) paradoxs.push(i);

    if(paradoxs.length >= 2){
        if(paradoxs.length == 2){
            if(first.symbols[paradoxs[0]].symbol === first.symbols[paradoxs[1]].symbol)
                return({
                  variant: [first.symbols[paradoxs[0]],first.symbols[paradoxs[1]]]
                });
            return{
                firstVariant: [first.symbols[paradoxs[0]],first.symbols[paradoxs[1]]],
                secondVariant: [first.symbols[paradoxs[1]],first.symbols[paradoxs[0]]]
            }
        }else{
            //TODO: add if more variants
        }
    }else null;
}

function unleash(squares,numbers,define){
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
    return (notInDefine(square,define) ? true : false);
}
function notInDefine(square,define) {
    square = square.map((item) => (item ?{
        symbol: item.symbol,
        step: item.step
    } : null));
    define = define.map((item) => (item ?{
        symbol: item.symbol,
        step: item.step
    } : null));

    for(let i = 0; i < square.length && square[i]; i++)
        for(let k = 0; k < define.length && square[i]; k++)
            if(square[i].symbol == define[k].symbol && square[i].step == define[k].step)
                square[i] = null;
    for(let symbol of square) if(symbol) return symbol;
    return null;
}
function searchSecond(squares, number, first) {
    for(let i = 0; i < squares.length; i++)
        if(i != number)
            for(let k = 0; k < squares[i].length && squares[i][k]; k++)
                if(squares[i][k].symbol == first.symbol && squares[i][k].step == first.step) return i;
        
}
function searchEquivalents(square){
    for(let i = 0; i < square.length && square[i]; i++)
        for(let k = i+1; k < square.length && square[k]; k++)
            if(square[i].symbol == square[k].symbol && square[i].step == square[k].step)
                return {
                    number: i,
                    symbol: square[i].symbol,
                    step: square[i].step
                };

    return null;
}

export {calculateWinner, searchParadox};