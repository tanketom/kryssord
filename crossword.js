const solution = [
    ["C", "A", "T", "S", "A", "T", "S"],
    ["A", "P", "P", "L", "E", "S", "A"],
    ["T", "A", "B", "L", "E", "T", "S"],
    ["S", "A", "T", "U", "R", "D", "A"],
    ["A", "P", "P", "L", "E", "S", "A"],
    ["T", "A", "B", "L", "E", "T", "S"],
    ["S", "A", "T", "U", "R", "D", "A"]
];

const blackSquares = [
    [0, 1], [1, 3], [2, 5], [3, 0], [3, 6], [4, 2], [5, 4], [6, 1]
];

const crossword = document.getElementById('crossword');
const startTime = new Date();

for (let i = 0; i < 7; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        if (blackSquares.some(([x, y]) => x === i && y === j)) {
            cell.classList.add('black');
        } else {
            const input = document.createElement('input');
            input.setAttribute('maxlength', '1');
            cell.appendChild(input);
        }
        row.appendChild(cell);
    }
    crossword.appendChild(row);
}

function checkSolution() {
    let correct = true;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (!blackSquares.some(([x, y]) => x === i && y === j)) {
                const input = crossword.rows[i].cells[j].firstChild;
                if (input.value.toUpperCase() !== solution[i][j]) {
                    correct = false;
                    break;
                }
            }
        }
    }

    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    if (correct) {
        document.getElementById('message').innerText = `Congratulations! You solved the puzzle in ${timeTaken} seconds.`;
    } else {
        document.getElementById('message').innerText = 'Some answers are incorrect. Keep trying!';
    }
}
