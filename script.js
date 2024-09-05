let startTime, updatedTime, difference;
let interval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startPause() {
    if (!isRunning) {
        startTime = startTime ? new Date() - difference : new Date();
        interval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(interval);
        difference = new Date() - startTime;
        startPauseBtn.textContent = "Start";
        isRunning = false;
    }
}

function reset() {
    clearInterval(interval);
    startTime = null;
    difference = 0;
    isRunning = false;
    startPauseBtn.textContent = "Start";
    display.textContent = "00:00:00.00";
    laps.innerHTML = "";
    lapCounter = 1;
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

function updateDisplay() {
    updatedTime = new Date();
    difference = updatedTime - startTime;
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}
