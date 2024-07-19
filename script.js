console.log("Welcome to Tic Tac Toe");

let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        if (boxtext[a].innerText !== "" &&
            boxtext[a].innerText === boxtext[b].innerText &&
            boxtext[a].innerText === boxtext[c].innerText) {
            document.querySelector('.info').innerText = boxtext[a].innerText + " Won";
            isgameover = true;
            // Optionally reset image or other elements on win
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            break; // Exit the loop early since we found a win
        }
    }

    // Check for a tie
    let boardFull = true;
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === '') {
            boardFull = false;
            break;
        }
    }
    if (boardFull && !isgameover) {
        document.querySelector('.info').innerText = "It's a Tie!";
        isgameover = true;
        // Optionally reset image or other elements on tie
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "400px";
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            checkWin();
            if (!isgameover) {
                turn = changeTurn(); // Update turn after changing
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
let resetButton = document.getElementById('resizeTo'); // Assuming 'resizeTo' is the ID of your reset button
resetButton.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    // Reset any other elements if needed, e.g., reset image size
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0"; // Reset image width to 0 or hide it
});
