function clearMessages() {
  document.querySelector('.messages__title').innerHTML = '';
}

function setMessages(message) {
  document.querySelector('.messages__title').innerHTML = `${message}`;
}

function selectItem(event) {
  const evt = event.target;
  const itemList = document.getElementsByClassName('todolist__item');
  for (let i = 0; i < itemList.length; i += 1) {
    if (itemList[i].classList.contains('item-list-bg')) {
      itemList[i].classList.remove('item-list-bg');
    }
  }
  evt.classList.add('item-list-bg');
  clearMessages();
}

function dblClickItem(event) {
  const evt = event.target;
  if (evt.classList.contains('completed')) {
    evt.classList.remove('completed');
    clearMessages();
    setMessages('Tarefa marcada como não concluída!');
  } else {
    evt.classList.add('completed');
    clearMessages();
    setMessages('Tarefa marcada como concluída!');
  }
  clearMessages();
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
  clearMessages();
  setMessages('Tarefa adicionada com sucesso!');
}
const btnAddTask = document.querySelector('#criar-tarefa');
btnAddTask.addEventListener('click', addTask);

function clearAll() {
  const todoItemList = document.querySelector('#lista-tarefas');
  while (todoItemList.lastElementChild) {
    todoItemList.removeChild(todoItemList.lastElementChild);
  }
  const theList = JSON.parse(localStorage.getItem('list'));
  if ((theList !== null && theList.length > 0)) {
    localStorage.removeItem('list');
  }
  clearMessages();
  setMessages('Tarefas apagadas com sucesso!');
}
const btnClearAll = document.querySelector('#apaga-tudo');
btnClearAll.addEventListener('click', clearAll);

function clearDone() {
  const todoItemList = document.querySelectorAll('.todolist__item');
  for (let i = 0; i < todoItemList.length; i += 1) {
    if (todoItemList[i].classList.contains('completed')) {
      todoItemList[i].remove();
    }
  }
  clearMessages();
  setMessages('Tarefas realizadas apagadas com sucesso!');
}
const btnClearDone = document.querySelector('#remover-finalizados');
btnClearDone.addEventListener('click', clearDone);

function saveList() {
  const list = [];
  const todoItemList = document.querySelectorAll('.todolist__item');
  for (let i = 0; i < todoItemList.length; i += 1) {
    list.push({
      text: todoItemList[i].innerText,
      class: todoItemList[i].className,
    });
  }
  localStorage.setItem('list', JSON.stringify(list));
  clearMessages();
  setMessages('Lista de tarefas salva com sucesso!');
}
const btnSaveList = document.querySelector('#salvar-tarefas');
btnSaveList.addEventListener('click', saveList);

function watchList() {
  const todoItemSelect = document.getElementsByClassName('todolist__item');
  for (let i = 0; i < todoItemSelect.length; i += 1) {
    todoItemSelect[i].addEventListener('click', selectItem);
    todoItemSelect[i].addEventListener('dblclick', dblClickItem);
  }
}

function showList() {
  const theList = JSON.parse(localStorage.getItem('list'));
  // console.log(theList);
  if (theList !== null && theList.length > 0) {
    const listLength = theList.length;
    const todoList = document.getElementById('lista-tarefas');
    for (let i = 0; i < listLength; i += 1) {
      const todoItem = document.createElement('li');
      todoItem.className = theList[i].class;
      todoItem.innerText = theList[i].text;
      todoList.appendChild(todoItem);
    }
    clearMessages();
    watchList();
  }
}

showList();

function moveUp() {
  const itemList = document.getElementsByClassName('todolist__item');
  for (let i = 0; i < itemList.length; i += 1) {
    if (itemList[i].style.backgroundColor === 'rgb(128, 128, 128)') {
      const thisElement = itemList[i];
      const aboveElement = itemList[i].previousElementSibling;
      const theParent = itemList[i].parentNode;
      if (aboveElement) {
        theParent.insertBefore(thisElement, aboveElement);
      }
    }
  }
  clearMessages();
}
const btnMoveUp = document.querySelector('#mover-cima');
btnMoveUp.addEventListener('click', moveUp);

function moveDown() {
  const itemList = document.getElementsByClassName('todolist__item');
  for (let i = 0; i < itemList.length; i += 1) {
    if (itemList[i].style.backgroundColor === 'rgb(128, 128, 128)') {
      const thisElement = itemList[i];
      const belowElement = itemList[i].nextElementSibling;
      const theParent = itemList[i].parentNode;
      if (belowElement) {
        theParent.insertBefore(belowElement, thisElement);
      }
    }
  }
  clearMessages();
}
const btnMoveDown = document.querySelector('#mover-baixo');
btnMoveDown.addEventListener('click', moveDown);
