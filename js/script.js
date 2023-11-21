import { Task } from "./Task.js";

const taskList = document.querySelector("#taskList");
const taskListCompleted = document.querySelector("#taskListCompleted");

const btnAddTask = document.querySelector(".btn-add-task");
const btnDeleteTask = document.querySelector(".btn-delete-task");

const arrow = document.querySelector(".arrow");

btnAddTask.addEventListener("click", addTask);
btnDeleteTask.addEventListener("click", deleteCompletedTasks);

arrow.addEventListener("click", () => {
  if (arrow.attributes["src"].textContent == "img/arrow-up.svg") {
    arrow.setAttribute("src", "img/arrow-dn.svg");
    taskListCompleted.style.display = "none";
  } else if (arrow.attributes["src"].textContent == "img/arrow-dn.svg") {
    arrow.setAttribute("src", "img/arrow-up.svg");
    taskListCompleted.style.display = "block";
  }
})

let tasks = [];
let tasksCompleted = [];

const savedTasks = localStorage.getItem("tasks");
const savedTasksCompleted = localStorage.getItem("tasksCompleted");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(function(task) {
    let newTask = new Task(task.name);
    newTask.print(task.name, taskList);
  });
}

if (savedTasksCompleted) {
  tasksCompleted = JSON.parse(savedTasksCompleted);
  tasksCompleted.forEach(function(tasksCompleted) {
    let newTask = new Task(tasksCompleted.name);
    newTask.print(tasksCompleted.name, taskListCompleted);
  });
}

function addTask() {
  const taskInput = document.querySelector("#taskInput");
  let task = capitalizeFirstLetter(taskInput.value);
  let itemExistente = false;

  tasks.forEach(ItemTask => {
    if (ItemTask.name.toUpperCase() == task.toUpperCase()) {
      alert("Item já existente!");
      itemExistente = true;
    }
  });

  if (task !== "" && !itemExistente) {
    let newTask = new Task(task);
    tasks.push(newTask);
    taskInput.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    newTask.print(newTask.name, taskList)
  }
}

const taskInput = document.querySelector("#taskInput");
  taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

const checkboxs = document.querySelectorAll(".checkbox");

checkboxs.forEach(checkbox => {
  checkbox.addEventListener("click", (element) => {
    let task = new Task(checkbox.parentNode.textContent);

    if (checkbox.checked == true) {
      tasksCompleted.push(task);
      task.print(checkbox.parentNode.textContent, taskListCompleted);
      taskList.removeChild(element.target.parentNode.parentNode);

      for(let i = 0; i < tasks.length; i++) {
        if (checkbox.parentNode.textContent == tasks[i].name) {
          tasks.splice(i, 1);
        }
      }
    }

    if (checkbox.checked == false) {
      task.push(task);
      task.print(checkbox.parentNode.textContent, taskListCompleted);
      taskListCompleted.removeChild(element.target.parentNode.parentNode);

      for(let i = 0; i < tasksCompleted.length; i++) {
        if (checkbox.parentNode.textContent == tasksCompleted[i].name) {
          tasksCompleted.splice(i, 1);
        }
      }  
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
  });
});

function deleteCompletedTasks() {
  tasksCompleted = [];
  taskListCompleted.innerHTML = "";
  localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));

  if (arrow.attributes["src"].textContent == "img/arrow-up.svg") {
    arrow.setAttribute("src", "img/arrow-dn.svg");
    taskListCompleted.style.display = "none";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}