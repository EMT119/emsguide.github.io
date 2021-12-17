let beat = new Audio("./metronome.flac");
let delay = 30;
let display = document.getElementById("seconds");
let timer = null;
let timerStatus = false;

document.getElementById("back").addEventListener("click", () => {
    window.location = "../index.html";
});

document.getElementById("up").addEventListener("click", () => {
    delay = delay + 1;
    display.innerHTML = delay;
    clearInterval(timer);
    if (timerStatus == true) {
        startMetronome(delay);
    }
});

document.getElementById("down").addEventListener("click", () => {
    delay = delay - 1;
    display.innerHTML = delay;
    clearInterval(timer);
    if (timerStatus == true) {
        startMetronome(delay);
    }
});

document.getElementById("control").addEventListener("click", (e) => {
    if (timerStatus == false) {
        timerStatus = true;
        startMetronome(delay);
        e.target.textContent = "Stop";
    } else {
        timerStatus = false;
        clearInterval(timer);
        e.target.textContent = "Start";
    }
});

function startMetronome(delay) {
    timer = setInterval(() => {
        beat.play();
        console.log("beat");
    }, (60/delay)*1000);
}