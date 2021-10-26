const inputTask = document.querySelector('#texto-tarefa');
const btnAddTask = document.querySelector('#criar-tarefa');
const todoList = document.getElementById('lista-tarefas');

function selectItem(event) {
  // const itemId = event.target.id;
  const itemList = document.querySelectorAll('.todolist__item');
  for (let i = 0; i < itemList.length; i += 1) {
    itemList[i].style.backgroundColor = '';
  }
  const evt = event.target;
  evt.style.backgroundColor = 'rgb(128, 128, 128)';
}

function addTask() {
  const lastItem = todoList.lastChild;
  const todoItem = document.createElement('li');
  todoItem.className = 'todolist__item';
  if (Number.isNaN(lastItem.id)) {
    todoItem.id = 1;
  } else {
    todoItem.id = Number(lastItem.id) + 1;
  }
  todoItem.innerText = inputTask.value;
  todoList.appendChild(todoItem);
  inputTask.value = '';
  const todoItemSelect = document.querySelectorAll('.todolist__item');
  for (let i = 0; i < todoItemSelect.length; i += 1) {
    todoItemSelect[i].addEventListener('click', selectItem);
  }
}
btnAddTask.addEventListener('click', addTask);
