function addTask() {
  const inputTask = document.querySelector('#texto-tarefa');
  const todoItem = document.createElement('li');
  todoItem.className = 'todolist__item';
  todoItem.innerText = inputTask.value;
  const todoList = document.querySelector('#lista-tarefas');
  todoList.appendChild(todoItem);
  inputTask.value = '';
}

function init() {
  const btnAddTask = document.querySelector('#criar-tarefa');
  btnAddTask.addEventListener('click', addTask);
}

init();
