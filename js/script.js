// Array para armazenar as tarefas
var tasks = [];

// Recuperar as tarefas do Local Storage, se existirem
var savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  // Atualizar a lista de tarefas com as tarefas recuperadas
  tasks.forEach(function(task) {
    addTaskToList(task);
  });
}

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var task = taskInput.value;

  if (task !== '') {
    tasks.push(task); // Adicionar a tarefa ao array
    taskInput.value = ''; // Limpar o campo de entrada

    // Salvar as tarefas atualizadas no Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Adicionar a nova tarefa à lista de tarefas
    addTaskToList(task);
  }
}

function addTaskToList(task) {
  var taskList = document.getElementById('taskList');

  // Criar um elemento <li> para a tarefa
  var listItem = document.createElement('li');

  // Criar um elemento <label> com o checkbox e o texto da tarefa
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(task));

  // Adicionar um evento de escuta para detectar o clique na checkbox
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      this.parentNode.style.textDecoration = 'line-through';
    } else {
      this.parentNode.style.textDecoration = 'none';
    }
  });

  listItem.appendChild(label); // Adicionar a label ao item da lista
  taskList.appendChild(listItem); // Adicionar o item à lista de tarefas
}
