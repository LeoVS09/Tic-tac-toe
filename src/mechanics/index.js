import unleash from "./unleash"
import calculateWinner from './calculateWinner'
import searchDefined from './searchDefined'

export { calculateWinner };

export function searchParadox(squares) {

    
    let defined = searchDefined(squares);
    if(defined) return defined;

    let variants = [];
    for(let square of squares) 
        if(square && Array.isArray(square)) 
            if(haveTwoVariants(square))
                variants.push(toVariant(square, squares.indexOf(square)));
    
    if(variants.length > 1)
        for(let i = 0; i < variants.length; i++)
            for(let k = i+1; k < variants.length; k++){
                let paradoxs = paradoxes(variants[i],variants[k]);
                if(paradoxs) {
                    let numbers = [variants[i].number, variants[k].number];
                    if(paradoxs.variant)
                        return ({
                            isOneSquare: false,
                            isDefinitely: true,
                            ...unleash(squares,numbers,paradoxs.variant)
                        });
                    
                    let result = paradoxs.map(paradox => unleash(squares,numbers,paradox));
                    return ({
                        isOneSquare: false,
                        isDefinitely: false,
                        numbers: result[0].numbers,
                        confrontations: result.map(item => item.variant)
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
            return[
                [first.symbols[paradoxs[0]],first.symbols[paradoxs[1]]],
                [first.symbols[paradoxs[1]],first.symbols[paradoxs[0]]]
            ]
        }else{
            //TODO: add if more variants
        }
    }else null;
}


