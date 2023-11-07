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
    addTaskToList(task.text, task.completed);
  });
}

if (savedTasksCompleted) {
  tasksCompleted = JSON.parse(savedTasksCompleted);
  tasksCompleted.forEach(function(tasksCompleted) {
    addTaskToListCompleted(tasksCompleted.text, tasksCompleted.completed);
  });
}

function addTask() {
  const taskInput = document.querySelector("#taskInput");
  let task = capitalizeFirstLetter(taskInput.value);
  let itemExistente = false;

  tasks.forEach(ItemTask => {
    if (ItemTask.text.toUpperCase() == task.toUpperCase()) {
      alert("Item já existente!");
      itemExistente = true;
    }
  });

  if (task !== "" && !itemExistente) {
    let newTask = { text: task, completed: false };
    tasks.push(newTask);
    taskInput.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToList(newTask.text, newTask.completed);
  }
}

const taskInput = document.querySelector("#taskInput");
  taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTaskToList(task, completed) {
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(task));
  checkbox.type = "checkbox";
  checkbox.checked = completed; 

  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (checkbox.checked) {
    checkbox.parentNode.style.textDecoration = "line-through";
  }

  checkbox.addEventListener("change", function() {
    const index = tasks.findIndex(function(item) {
      return item.text === task;
    });
    
    if (index !== -1) {
      tasks[index].completed = this.checked; 
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    if (this.checked) {
      this.parentNode.style.textDecoration = "line-through";

      tasksCompleted.push(tasks[index]);
      addTaskToListCompleted(tasks[index].text, tasks[index].completed);

      tasks.splice(index, 1);
      taskList.removeChild(taskList.childNodes[index]);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  listItem.appendChild(label);
  taskList.appendChild(listItem);
}

function addTaskToListCompleted(task, completed) {
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(task));
  checkbox.type = "checkbox";
  checkbox.checked = completed; 

  if (checkbox.checked) {
    checkbox.parentNode.style.textDecoration = "line-through";
  }

  localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));

  checkbox.addEventListener("click", (element) => {
    let newTask = { text: checkbox.parentNode.textContent, completed: false };
    tasks.push(newTask);
    addTaskToList(checkbox.parentNode.textContent, checkbox.checked);

    taskListCompleted.removeChild(element.target.parentNode.parentNode);
    
    for(let i = 0; i < tasksCompleted.length; i++) {
      if (checkbox.parentNode.textContent == tasksCompleted[i].text) {
        tasksCompleted.splice(i, 1);
      }
    }

    localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
  });

  listItem.appendChild(label);
  taskListCompleted.appendChild(listItem);
}

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
