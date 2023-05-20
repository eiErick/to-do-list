// Array para armazenar as tarefas
var tasks = [];

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskList = document.getElementById('taskList');

  var task = taskInput.value;
  
  if (task !== '') {
    tasks.push(task); // Adicionar a tarefa ao array
    taskInput.value = ''; // Limpar o campo de entrada

    // Criar um elemento <li> para a tarefa
    var listItem = document.createElement('li');

    // Criar um elemento <label> com o checkbox e o texto da tarefa
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(task));

    listItem.appendChild(label); // Adicionar a label ao item da lista
    taskList.appendChild(listItem); // Adicionar o item à lista de tarefas
  }
}