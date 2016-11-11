export default function calculateWinner(squares) {
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