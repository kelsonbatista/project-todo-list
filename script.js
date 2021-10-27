const inputTask = document.querySelector('#texto-tarefa');
const btnAddTask = document.querySelector('#criar-tarefa');

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
btnAddTask.addEventListener('click', addTask);
