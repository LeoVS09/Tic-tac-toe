export default function searchDefined(squares) {
    for(let square of squares) {
        let equivalent = searchEquivalents(square);
        if (equivalent)
            return {
                isOneSquare: true,
                number: squares.indexOf(square),
                equivalent: equivalent
            };
    }
    return null;
}

function searchEquivalents(square){
    if(!Array.isArray(square)) return null;

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