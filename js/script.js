// Array para armazenar as tarefas
var tasks = [];

// Recuperar as tarefas do Local Storage, se existirem
var savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  // Atualizar a lista de tarefas com as tarefas recuperadas
  tasks.forEach(function(task) {
    addTaskToList(task.text, task.completed); // Passa também o status de conclusão
  });
}

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var task = taskInput.value;

  if (task !== '') {
    var newTask = { text: task, completed: false }; // Adiciona o status de conclusão
    tasks.push(newTask); // Adicionar a tarefa ao array
    taskInput.value = ''; // Limpar o campo de entrada

    // Salvar as tarefas atualizadas no Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Adicionar a nova tarefa à lista de tarefas
    addTaskToList(newTask.text, newTask.completed);
  }
}

function addTaskToList(task, completed) {
  var taskList = document.getElementById('taskList');

  // Criar um elemento <li> para a tarefa
  var listItem = document.createElement('li');

  // Criar um elemento <label> com o checkbox e o texto da tarefa
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed; // Define o estado de conclusão com base no valor passado
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(task));

  // Adicionar um evento de escuta para detectar o clique na checkbox
  checkbox.addEventListener('change', function() {
    var index = tasks.findIndex(function(item) {
      return item.text === task;
    });

    if (index !== -1) {
      tasks[index].completed = this.checked; // Atualiza o status de conclusão no array de tarefas
      // Salvar as tarefas atualizadas no Local Storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    if (this.checked) {
      this.parentNode.style.textDecoration = 'line-through';
    } else {
      this.parentNode.style.textDecoration = 'none';
    }
  });

  listItem.appendChild(label); // Adicionar a label ao item da lista
  taskList.appendChild(listItem); // Adicionar o item à lista de tarefas
}

function deleteCompletedTasks() {
  var taskList = document.getElementById('taskList');
  var completedTasks = taskList.querySelectorAll('li label[style="text-decoration: line-through;"]');

  completedTasks.forEach(function(task) {
    var taskText = task.textContent;
    var index = tasks.findIndex(function(item) {
      return item.text === taskText;
    });

    if (index !== -1) {
      tasks.splice(index, 1); // Remover a tarefa do array
    }

    taskList.removeChild(task.parentNode); // Remover o item da lista de tarefas
  });

  // Salvar as tarefas atualizadas no Local Storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

