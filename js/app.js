let gameSeq = [];
let userSeq = [];

let btns = ["red", "orange", "green", "blue"];
let start = false;
let level = 0;

let h3 = document.querySelector("h3");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!start) {
        console.log("Game Started");
        start = true;
        levelUp();
    }
});

// Flash effect on button
function btnFlash(btn) {
    btn.classList.add("flash");
    btn.classList.add("pressed");

    setTimeout(function () {
        btn.classList.remove("flash",);
    }, 200);
}

// ⬆Go to the next level
function levelUp() {
    userSeq = [];  // Clear previous sequence
    level++;
    h3.innerText = `Level ${level}`;

    // Generate random color
    let rdmIdx = Math.floor(Math.random() * btns.length);
    let rdmColor = btns[rdmIdx];
    let rdmBtn = document.querySelector(`.${rdmColor}`);

    gameSeq.push(rdmColor);
    console.log("Game Sequence:", gameSeq);

    // Flash the chosen button
    btnFlash(rdmBtn);
}

// Check user's answer
function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        // Wrong sequence
        h3.innerHTML = `❌ Game Over! Your Score: <b>${level}</b><br>Press any key to restart`;

        let body = document.querySelector("body");
        body.style.backgroundColor = "red";

        setTimeout(function () {
            body.style.backgroundColor = "white";
        }, 150);

        gameReset();
    }
}

// button click by user
function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User Clicked:", userSeq);

    checkAns(userSeq.length - 1);
}

// Attach click listeners to all boxes
let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game 
function gameReset() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
