// Array para armazenar as tarefas
var tasks = [];

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskList = document.getElementById('taskList');

  var task = taskInput.value;
  if (task !== '') {
    tasks.push(task); // Adicionar a tarefa ao array
    taskInput.value = ''; // Limpar o campo de entrada

    // Atualizar a lista de tarefas
    taskList.innerHTML += '<li>' + task + '</li>';
  }
}