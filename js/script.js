import { Task } from "./Task.js";

const taskListToday = document.querySelector("#taskListToday");
const taskList = document.querySelector("#taskList");
const taskListCompleted = document.querySelector("#taskListCompleted");

const inputDate = document.querySelector("#taskDate");
const btnAddTask = document.querySelector(".btn-add-task");

const arrow = document.querySelector(".arrow");
const quantityCompletedTasks = document.querySelector(".quantity-completed-tasks");

btnAddTask.addEventListener("click", addTask);

const date = new Date();
const dateToday = (date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate());

arrow.addEventListener("click", () => {
  if (arrow.attributes["src"].textContent == "img/arrow-up.svg") {
    arrow.setAttribute("src", "img/arrow-dn.svg");
    taskListCompleted.style.display = "none"
  } else if (arrow.attributes["src"].textContent == "img/arrow-dn.svg") {
    arrow.setAttribute("src", "img/arrow-up.svg");
    taskListCompleted.style.display = "block"
  }
})

resizeWindow();

let tasks = [];
let tasksCompleted = [];

const savedTasks = localStorage.getItem("tasks");
const savedTasksCompleted = localStorage.getItem("tasksCompleted");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(function(task) {

    let newTask = new Task(task.name);

    if (task.date == dateToday) {
      taskListToday.style.display = "block";
      newTask.print(task.name, taskListToday, task.date);
      return;
    }

    newTask.print(task.name, taskList, task.date);
  });
}

if (savedTasksCompleted) {
  tasksCompleted = JSON.parse(savedTasksCompleted);
  tasksCompleted.forEach(function(tasksCompleted) {
    let newTask = new Task(tasksCompleted.name);
    newTask.print(tasksCompleted.name, taskListCompleted, tasksCompleted.date);
  });

  PrintQuantityCompletedTasks()
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
    const date = inputDate.value;
    let newTask = new Task(task, date);
    tasks.push(newTask);
    taskInput.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    newTask.print(newTask.name, taskList, newTask.date);
  }
}

const taskInput = document.querySelector("#taskInput");

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
  
document.addEventListener("click", (element) => {
  const clickedCheckbox = (element.target.classList[0] == "checkbox");

  if(clickedCheckbox) {
    let taskName = element.target.parentNode.childNodes[1].textContent;
    let taskDate = element.target.parentNode.childNodes[2].textContent;
    const listName = element.target.parentNode.parentNode.parentNode.attributes.id.textContent;

    let task = new Task(taskName, taskDate);
      
    const checked = (element.target.checked);
    if (checked) {
      tasksCompleted.push(task);
      task.print(taskName, taskListCompleted, taskDate);
      
      const List = document.querySelector("#"+listName);
      List.removeChild(element.target.parentNode.parentNode);
      
      for(let i = 0; i < tasks.length; i++) {
        if (taskName == tasks[i].name) {
          tasks.splice(i, 1);
        }
      }
    }

    const unchecked = (!element.target.checked);
    if (unchecked) {
      tasks.push(task);
      task.print(taskName, taskList, taskDate);
      
      const list = document.querySelector("#"+listName);
      list.removeChild(element.target.parentNode.parentNode);

      for(let i = 0; i < tasksCompleted.length; i++) {
        if (taskName == tasksCompleted[i].name) {
          tasksCompleted.splice(i, 1);
        }
      }  
    }

    PrintQuantityCompletedTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
  }
});

document.addEventListener("click", (element) => {
  const clickedTrash = (element.target.classList[0] == "trash");
  
  if (clickedTrash) {
    const taskName = element.target.parentNode.childNodes[1].textContent;
    const listName = element.target.parentNode.parentNode.parentNode.attributes.id.textContent;

    const list = document.querySelector("#"+listName);
    list.removeChild(element.target.parentNode.parentNode);
    
    for(let i = 0; i < tasksCompleted.length; i++) {
      if (taskName == tasksCompleted[i].name) {
        tasksCompleted.splice(i, 1);
      }
    }
    
    for(let i = 0; i < tasks.length; i++) {
      if (taskName == tasks[i].name) {
        tasks.splice(i, 1);
      }
    }

    PrintQuantityCompletedTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
  }
});

// function deleteCompletedTasks() {
//   tasksCompleted = [];
//   taskListCompleted.innerHTML = "";
//   localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
//   PrintQuantityCompletedTasks();
  
//   if (arrow.attributes["src"].textContent == "img/arrow-up.svg") {
//     arrow.setAttribute("src", "img/arrow-dn.svg");
//     taskListCompleted.style.display = "none";
//   }
// }

function resizeWindow() {
  const widthWindow = window.innerWidth;
  
  if (widthWindow <= 500) {
    const taskInput = document.querySelector("#taskInput");

    btnAddTask.innerHTML = "+";
    taskInput.attributes[2].textContent = "Tarefa"
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PrintQuantityCompletedTasks() {
  quantityCompletedTasks.innerHTML = tasksCompleted.length;

  if (tasksCompleted.length == 1) {
    quantityCompletedTasks.parentNode.childNodes[2].childNodes[0].textContent = "Tarefa Concluída";
  } else {
    quantityCompletedTasks.parentNode.childNodes[2].childNodes[0].textContent = "Tarefas Concluídas"
  }
}