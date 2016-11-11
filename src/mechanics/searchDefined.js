import {isEqual,haveTwoVariants,polymorph} from './utils'


export default function searchDefined(squares) {
    for(let square of squares) {
        let equivalent = searchEquivalents(square);
        if (equivalent)
            return {
                numbers: [squares.indexOf(square)],
                symbols: [equivalent]
            };
    }
    for(let i = 0; i < squares.length; i++)
        if(haveTwoVariants(squares[i]))
            for (let k = i + 1; k < squares.length; k++) {
                let equivalents = searchEquivalents(squares[i], squares[k]);
                if (equivalents)
                    return {
                        numbers: [i, k],
                        symbols: equivalents
                    }

            }

        
}

const searchEquivalents = polymorph(
function(square){
    if(!Array.isArray(square)) return null;

    for(let i = 0; i < square.length && square[i]; i++)
        for(let k = i+1; k < square.length && square[k]; k++)
            if(square[i].symbol == square[k].symbol && square[i].step == square[k].step)
                return {
                    number: i,
                    ...square[i]
                };

    return null;
},
    
function(first,second) {
    let paradoxs = [];
    for(let i = 0; i < first.length && first[i]; i++)
        second.forEach(symbol =>
        symbol && isEqual(first[i],symbol) && paradoxs.push(i));
    if(paradoxs.length < 2) return null;

    if(paradoxs.length == 2) {
        let variant = paradoxs.map(i => first[i]);
        if (variant[0].symbol === variant[1].symbol)
            return variant;
    }
    return null;
});


