const textFocus = document.querySelector("#text-focus");
const textShortRest = document.querySelector("#text-short-rest");
const textLongRest = document.querySelector("#text-long-rest");

const timer = document.querySelector("#timer");
const startPausePomodoroBtn = document.querySelector("#start-pause-pomodoro-btn");

const homeBtn = document.querySelector(".home-btn");
const listBtn = document.querySelector(".list-btn");
const settingsBtn = document.querySelector(".settings-btn");

homeBtn.addEventListener("click", () => {
    location.href = "../index.html";
});

listBtn.addEventListener("click", () => {
    location.href = "./to-do-list.html";
});

settingsBtn.addEventListener("click", () => {
    location.href = "./settings.html";
});

startPausePomodoroBtn.addEventListener("click", () => {
    if (startPausePomodoroBtn.innerHTML == "Começar") {
        startTimer();
        startPausePomodoroBtn.innerHTML = "Pausar";
    } else if (startPausePomodoroBtn.innerHTML == "Pausar") {
        pauseTimer();
        startPausePomodoroBtn.innerHTML = "Começar";
    }
});

const shortRestTime = 300; // 5 min
const longRestTime = 900; // 15 min
const focusTime = 1500; // 25 min

let loop = 1;
let timeSeconds = focusTime;
let interval;

function startTimer() {
    interval = setInterval(countdown, 1000); // 1 seg
    startPausePomodoroBtn.innerHTML = "Pausar";
}

function pauseTimer() {
    clearInterval(interval);
    startPausePomodoroBtn.innerHTML = "Começar";
}

function countdown() {
    if (timeSeconds <= 0) {
        reset();
    }

    timeSeconds--;
    ShowTimer();
}

function reset() {
    clearInterval(interval);
    startPausePomodoroBtn.innerHTML = "Começar";
    loop++;

    if (textFocus.classList[2] == "selected" && loop <= 7) {
        recordFocusTime(25);
        deleteClass();
        textShortRest.classList.add("selected");

        timeSeconds = shortRestTime;
        return;
    } else if (textShortRest.classList[2] == "selected" && loop <= 7) {
        deleteClass();
        textFocus.classList.add("selected");
        
        timeSeconds = focusTime;
        return;
    } else if (textLongRest.classList[2] == "selected" && loop <= 7) {
        deleteClass();
        textFocus.classList.add("selected");
        
        timeSeconds = focusTime;
        return;
    } else if (loop >= 7) {
        recordFocusTime(25);
        deleteClass();
        textLongRest.classList.add("selected");

        timeSeconds = longRestTime;
        loop = 1;
        return;
    }
}

function ShowTimer() {
    const date = new Date(timeSeconds * 1000);
    const formattedTime = date.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${formattedTime}`;
}

function deleteClass() {
    textFocus.classList.remove("selected");
    textShortRest.classList.remove("selected");
    textLongRest.classList.remove("selected");
}

function recordFocusTime(time) {
    const date = getDate();
    let emptyList = true;

    let timeFocus = [];
    const savedTimeFocus = localStorage.getItem("timeFocus");

    if (savedTimeFocus) {
        timeFocus = JSON.parse(savedTimeFocus);
    }

    const leghtTimeFocus = timeFocus.length - 1;

    if (timeFocus[leghtTimeFocus] != undefined && timeFocus[leghtTimeFocus].date === date) {
        timeFocus[leghtTimeFocus].time = Number(timeFocus[leghtTimeFocus].time) + time;
    } else {
        timeFocus.push({"time":time, "date":date});
    }

    if (leghtTimeFocus >= 6) {
        timeFocus.shift();
    }

    localStorage.setItem("timeFocus", JSON.stringify(timeFocus));
}

function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (`${day}/${month}/${year}`);
}
