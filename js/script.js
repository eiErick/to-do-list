import { Task } from "./Task.js";
import { setLocalStorage } from "./setLocalStorage.js";
import { notify } from "./notification.js";

const main = document.querySelector("#container");
const header = document.querySelector("#header");

const pomodoroBtn = document.querySelector(".pomodoro-btn");
const homeBtn = document.querySelector(".home-btn");

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
  if (arrow.attributes["src"].textContent == "../img/arrow-up.svg") {
    arrow.setAttribute("src", "../img/arrow-dn.svg");
    taskListCompleted.style.display = "none"
  } else if (arrow.attributes["src"].textContent == "../img/arrow-dn.svg") {
    arrow.setAttribute("src", "../img/arrow-up.svg");
    taskListCompleted.style.display = "block"
  }
})

pomodoroBtn.addEventListener("click", () => {
  location.href = "./pomodoro.html";
});

homeBtn.addEventListener("click", () => {
  location.href = "../index.html"
})

resizeWindow();

export let tasks = [];
export let tasksCompleted = [];

const savedTasks = localStorage.getItem("tasks");
const savedTasksCompleted = localStorage.getItem("tasksCompleted");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(function(task) {

    let newTask = new Task(task.name);

    if (task.date <= dateToday) {
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
      alert(`O item, ${ItemTask.name}, já existente!`);
      itemExistente = true;
    }
  });

  if (task == "") {
    alert("O nome da tarefa não pode estar vazio!");
  }

  if (task !== "" && !itemExistente) {
    const date = inputDate.value;
    let newTask = new Task(task, date);
    tasks.push(newTask);
    taskInput.value = "";

    setLocalStorage(tasks);

    if (newTask.date <= dateToday) {
      taskListToday.style.display = "block";
      newTask.print(newTask.name, taskListToday, newTask.date);
      return;
    }
    
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
  const clickedEditTaskName = (element.target.classList[2] == "edit-task-name");

  if (clickedCheckbox && !clickedEditTaskName) {
    let taskName = element.target.parentNode.childNodes[1].textContent;

    const listName = element.target.parentNode.parentNode.parentNode.attributes.id.textContent;

    let task = new Task(taskName);
      
    const checked = (element.target.checked);
    if (checked) {
      tasksCompleted.push(task);
      task.print(taskName, taskListCompleted);
      
      const List = document.querySelector("#"+listName);
      List.removeChild(element.target.parentNode.parentNode);
      
      for (let i = 0; i < tasks.length; i++) {
        if (taskName == tasks[i].name) {
          tasks.splice(i, 1);
        }
      }
    }

    const unchecked = (!element.target.checked);
    if (unchecked) {
      tasks.push(task);
      task.print(taskName, taskList);
      
      const list = document.querySelector("#"+listName);
      list.removeChild(element.target.parentNode.parentNode);

      for (let i = 0; i < tasksCompleted.length; i++) {
        if (taskName == tasksCompleted[i].name) {
          tasksCompleted.splice(i, 1);
        }
      }  
    }

    PrintQuantityCompletedTasks();
    setLocalStorage(tasks, tasksCompleted);
  }
});

document.addEventListener("click", (element) => {
  const clickedTrash = (element.target.classList[0] == "trash");
  
  if (clickedTrash) {
    const taskName = element.target.parentNode.childNodes[1].textContent;
    const listName = element.target.parentNode.parentNode.parentNode.attributes.id.textContent;

    deleteTask(taskName, listName);
  }
});

document.addEventListener("click", (element) => {
  const clickedEditTaskName = element.target.classList[0] == "edit-task-name";
  const clickedCheckbox = (element.target.parentNode.childNodes[0]);
  
  if (clickedEditTaskName) {
    const taskName = element.target.parentNode.childNodes[0].childNodes[1].textContent;
    const taskDate = element.target.parentNode.childNodes[1].textContent;

    const box = document.createElement("div");
    const text = document.createElement("p");
    const inputTextName = document.createElement("input");
    const inputDate = document.createElement("input");
    const divButtons = document.createElement("div");
    const btnCancel = document.createElement("button");
    const btnComfirm = document.createElement("button");

    box.classList.add("change-box-name-tasks");

    text.innerHTML = "Edição de Tarefa";
    btnCancel.innerHTML = "Cancelar";
    btnComfirm.innerHTML = "Comfirmar";

    inputDate.type = "date";

    inputTextName.value = taskName;
    inputDate.value = taskDate.trim();

    divButtons.appendChild(btnCancel);
    divButtons.appendChild(btnComfirm);

    box.appendChild(text);
    box.appendChild(inputTextName);
    box.appendChild(inputDate);
    box.appendChild(divButtons);
    document.body.appendChild(box);

    btnComfirm.addEventListener("click", () => {
      const listName = element.target.parentNode.parentNode.attributes.id.textContent;

      deleteTask(taskName, listName);
      let task = capitalizeFirstLetter(inputTextName.value);
      let itemExistente = false;
    
      tasks.forEach(ItemTask => {
        if (ItemTask.name.toUpperCase() == task.toUpperCase()) {
          alert(`O item, ${ItemTask.name}, já existente!`);
          itemExistente = true;
        }
      });
    
      if (task == "") {
        alert("O nome da tarefa não pode estar vazio!");
      }
    
      if (task !== "" && !itemExistente) {
        const date = inputDate.value;
        let newTask = new Task(task, date);
        tasks.push(newTask);
        inputTextName.value = "";
    
        setLocalStorage(tasks);
    
        if (newTask.date <= dateToday) {
          taskListToday.style.display = "block";
          newTask.print(newTask.name, taskListToday, newTask.date);
          return;
        }
        
        newTask.print(newTask.name, taskList, newTask.date);
        toggleClassAddBlur();
        box.remove();
      }
    });

    btnCancel.addEventListener("click", () => {
      toggleClassAddBlur();
      box.remove();
    });

    toggleClassAddBlur();
  }

  clickedCheckbox.checked = false;
});

function deleteTask(taskName, listName) {
  const list = document.querySelector("#"+listName);

  list.childNodes.forEach(element => {
    if (element.childNodes[0].childNodes[1].textContent == taskName) {
      element.remove();
    }
  });
  
  for (let i = 0; i < tasksCompleted.length; i++) {
    if (taskName == tasksCompleted[i].name) {
      tasksCompleted.splice(i, 1);
    }
  }
  
  for (let i = 0; i < tasks.length; i++) {
    if (taskName == tasks[i].name) {
      tasks.splice(i, 1);
    }
  }

  PrintQuantityCompletedTasks();
  setLocalStorage(tasks, tasksCompleted);
}

function resizeWindow() {
  const widthWindow = window.innerWidth;
  
  if (widthWindow <= 700) {
    const taskInput = document.querySelector("#taskInput");

    btnAddTask.innerHTML = "+";
    taskInput.attributes[2].textContent = "Tarefa";
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
    quantityCompletedTasks.parentNode.childNodes[2].childNodes[0].textContent = "Tarefas Concluídas";
  }
}

function toggleClassAddBlur() {
  main.classList.toggle("blur");
  header.classList.toggle("blur");
}

callNotify();

function callNotify() {
  let notificationsItems = [];
  
  taskListToday.childNodes.forEach(element => {
    notificationsItems.push(element.childNodes[0].childNodes[1].textContent);
  });

  notify(notificationsItems);
}
