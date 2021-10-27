function selectItem(event) {
  const evt = event.target;
  if (evt.className !== 'todolist__item completed') {
    const itemList = document.getElementsByClassName('todolist__item');
    for (let i = 0; i < itemList.length; i += 1) {
      itemList[i].style.cssText = '';
    }
    evt.style.cssText += 'background-color: rgb(128, 128, 128);';
  }
}

function dblClickItem(event) {
  const evt = event.target;
  if (evt.classList.contains('completed')) {
    evt.classList.remove('completed');
  } else {
    evt.classList.add('completed');
  }
}

const inputTask = document.querySelector('#texto-tarefa');

function addTask() {
  const todoList = document.getElementById('lista-tarefas');
  const todoItem = document.createElement('li');
  todoItem.className = 'todolist__item';
  todoItem.innerText = inputTask.value;
  todoList.appendChild(todoItem);
  inputTask.value = '';
  const todoItemSelect = document.getElementsByClassName('todolist__item');
  for (let i = 0; i < todoItemSelect.length; i += 1) {
    todoItemSelect[i].addEventListener('click', selectItem);
    todoItemSelect[i].addEventListener('dblclick', dblClickItem);
  }
}
const btnAddTask = document.querySelector('#criar-tarefa');
btnAddTask.addEventListener('click', addTask);

function clearAll() {
  const todoItemSelect = document.querySelector('#lista-tarefas');
  while (todoItemSelect.lastElementChild) {
    todoItemSelect.removeChild(todoItemSelect.lastElementChild);
  }
}
const btnClearAll = document.querySelector('#apaga-tudo');
btnClearAll.addEventListener('click', clearAll);

function clearDone() {
  const todoItemSelect = document.querySelectorAll('.todolist__item');
  for (let i = 0; i < todoItemSelect.length; i += 1) {
    if (todoItemSelect[i].classList.contains('completed')) {
      todoItemSelect[i].remove();
    }
  }
}
const btnClearDone = document.querySelector('#remover-finalizados');
btnClearDone.addEventListener('click', clearDone);
