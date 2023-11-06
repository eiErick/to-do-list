const btnAddTask = document.querySelector(".btn-add-task");
const btnDeleteTask = document.querySelector(".btn-delete-task");

btnAddTask.addEventListener("click", addTask);
btnDeleteTask.addEventListener("click", deleteCompletedTasks);

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  tasks.forEach(function(task) {
    addTaskToList(task.text, task.completed);
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
  const taskList = document.getElementById("taskList");
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(task));
  checkbox.type = "checkbox";
  checkbox.checked = completed; 

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
    } else {
      this.parentNode.style.textDecoration = "none";
    }
  });

  listItem.appendChild(label);
  taskList.appendChild(listItem);
}

function deleteCompletedTasks() {
  const taskList = document.getElementById("taskList");
  const completedTasks = taskList.querySelectorAll("li label[style='text-decoration: line-through;']");

  completedTasks.forEach(function(task) {
    const taskText = task.textContent;
    const index = tasks.findIndex(function(item) {
      return item.text === taskText;
    });

    if (index !== -1) {
      tasks.splice(index, 1);
    }

    taskList.removeChild(task.parentNode); 
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
