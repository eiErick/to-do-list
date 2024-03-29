/* eslint-disable no-undef */
const pomodoroBtn = document.querySelector(".pomodoro-btn");
const todoListBtn = document.querySelector(".todo-list-btn");
const settingsBtn = document.querySelector(".settings-btn");

const quantiltyPendingTasks = document.querySelector(".quantilty-pending-tasks-today");
const graphicTimeFocus = document.querySelector("#graphic-time-focus");
const textMotivational = document.querySelector(".text-motivational");

const rebootMotivationalBtn = document.querySelector(".reboot-motivational-btn");
const rebootMotivationalImg = document.querySelector(".reboot-img");

const date = new Date();
const dateToday = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

let timeFocus = [];
let tasks = [];
const tasksToday = [];

// LocalStorage

const savedTimeFocus = localStorage.getItem("timeFocus");
const savedTasks = localStorage.getItem("tasks");

if (savedTimeFocus) {
	timeFocus = JSON.parse(savedTimeFocus);
}

if (savedTasks) {
	tasks = JSON.parse(savedTasks);
	tasks.forEach((task) => {
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
});

let currentAngle = false;

rebootMotivationalBtn.addEventListener("click", () => {
	currentAngle -= 360;
	rebootMotivationalImg.style.transform = `rotate(${currentAngle}deg)`;
	printPhraseMotivational();
});

// Focus Chart in the last 7 days

const graphicFocus = new Chart(graphicTimeFocus, {
	type: "line",
	data: {
		labels: [],
		datasets: [{
			label: "Minutos de foco",
			data: [],
			borderWidth: 1,
		}],
	},
});

function addGraphicFocus() {
	timeFocus.forEach((time) => {
		const { date } = time;
		const timeOfFocus = time.time;

		graphicFocus.data.labels.push(date);
		graphicFocus.data.datasets.forEach((datasets) => {
			datasets.data.push(timeOfFocus);
		});
		graphicFocus.update();
	});
}

addGraphicFocus();

// Pending tasks for today

function printQuantityTasksPending() {
	const father = quantiltyPendingTasks.parentNode;
	const quantiltyTasksToday = tasksToday.length;

	if (quantiltyTasksToday <= 0) {
		father.textContent = "Todas as tarefas estão concluidas \u{1F44D}";
	} else if (quantiltyTasksToday >= 1) {
		quantiltyPendingTasks.textContent = `0${quantiltyTasksToday}`;
	} else if (quantiltyTasksToday >= 10) {
		quantiltyPendingTasks.textContent = quantiltyTasksToday;
	}
}

printQuantityTasksPending();

// Print phrase motivational

function printPhraseMotivational() {
	const listPhraseMotivational = [
		"Não deixe para amanhã o que pode ser feito agora!",
		"Eu posso te levar a lugares que você nem imagina! -Disciplina",
		"Disciplina + Foco + Ação = sucesso",
		"Seja melhor um pouco melhor a cada dia!",
		"Fazer um pouco hoje é melhor do que não fazer nada!",
	];

	const numMax = listPhraseMotivational.length;
	const num = Math.floor(Math.random() * numMax);

	if (textMotivational.textContent === listPhraseMotivational[num]) {
		callPrintPhraseMotivational();
	} else {
		textMotivational.textContent = listPhraseMotivational[num];
	}
}

function callPrintPhraseMotivational() {
	printPhraseMotivational();
}

printPhraseMotivational();
