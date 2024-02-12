const pomodoroBtn = document.querySelector(".pomodoro-btn");
const todoListBtn = document.querySelector(".todo-list-btn");
const settingsBtn = document.querySelector(".settings-btn");

const quantiltyPendingTasks = document.querySelector(".quantilty-pending-tasks-today");
const graphicTimeFocus = document.querySelector("#graphic-time-focus");
const textMotivational = document.querySelector(".text-motivational");

const rebootMotivationalBtn = document.querySelector(".reboot-motivational-btn");

const date = new Date();
const dateToday = (date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate());

let timeFocus = [];
let tasks = [];
let tasksToday = [];

// LocalStorage

const savedTimeFocus = localStorage.getItem("timeFocus");
const savedTasks = localStorage.getItem("tasks");

if (savedTimeFocus) {
    timeFocus = JSON.parse(savedTimeFocus);
}

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(function(task) {  
        if (task.date <= dateToday) {
            tasksToday.push(task);
        }
    });
}


todoListBtn.addEventListener("click", () => {
    location.href = "./pages/to-do-list.html";
});

pomodoroBtn.addEventListener("click", () => {
    location.href = "./pages/pomodoro.html";
});

settingsBtn.addEventListener("click", () => {
    location.href = "./pages/settings.html";
})

rebootMotivationalBtn.addEventListener("click", () => {
    printPhraseMotivational();
})

// Focus Chart in the last 7 days

const graphicFocus = new Chart(graphicTimeFocus, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Minutos de foco',
            data: [],
            borderWidth: 1
        }]
    },
});

addGraphicFocus();

function addGraphicFocus() {
    timeFocus.forEach(function(time) {
        const date = time.date;
        const timeOfFocus = time.time;

        graphicFocus.data.labels.push(date);
        graphicFocus.data.datasets.forEach((datasets) => {
            datasets.data.push(timeOfFocus);
        });
        graphicFocus.update();
    });
}

// Pending tasks for today

printQuantityTasksPending();

function printQuantityTasksPending() {
    const father = quantiltyPendingTasks.parentNode;
    const quantiltyTasksToday = tasksToday.length;
    
    if (quantiltyTasksToday <= 0) {
        father.textContent = "Todas as tarefas estão concluidas \u{1F44D}";
    } else if (quantiltyTasksToday >= 1) {
        quantiltyPendingTasks.textContent = `0${quantiltyTasksToday}`
    } else if (quantiltyTasksToday >= 10) {
        quantiltyPendingTasks.textContent = quantiltyTasksToday;
    }
}

// Print phrase motivational

printPhraseMotivational();

function printPhraseMotivational() {
    const listPhraseMotivational = [
        '"Não deixe para amanhã o que pode ser feito agora!"',
        '"Eu posso te levar a lugares que você nem imagina!" -Disciplina',
        '"Disciplina + Foco + Ação = sucesso"',
        '"Seja melhor um pouco melhor a cada dia!"',
        '"Fazer um pouco hoje é melhor do que não fazer nada!"'
    ];

    const numMax = listPhraseMotivational.length;
    const num = Math.floor(Math.random() * numMax);

    if (textMotivational.textContent === listPhraseMotivational[num]) {
        callPrintPhraseMotivational();
        return;
    } else {
        textMotivational.textContent = listPhraseMotivational[num];
    }
}

function callPrintPhraseMotivational() {
    printPhraseMotivational();
}
