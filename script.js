/*
Código completamente refatorado.
Após tentativa de realização do item 13, o código parou de funcionar nos itens 9 e 11 inicialmente.

Alterações realizadas:

- backgroung do item colocado como classe no css - nome selected - (em vez de chamar direto no codigo)
- a classe do bg no codigo foi colocado em uma variavel devido a repeticoes
- foi retirado os listeners dos botoes de selecionar e duplo clique de dentro das funções (e onde aparecia repetido). Foi colocado externamente e o código colocado diretamente dentro dele.
- códigos de selecionar e duplo clique totalmente refatorados
- algumas variaveis trocadas de nome para melhor leitura
*/

/*
*******************************************************
MESSAGES
*******************************************************
*/
function clearMessages() {
  document.querySelector('.messages__title').innerHTML = '';
}

function setMessages(message) {
  document.querySelector('.messages__title').innerHTML = `${message}`;
}

const todoList = document.getElementById('lista-tarefas');
const todoListItem = document.getElementsByClassName('todolist__item');
const storedList = JSON.parse(localStorage.getItem('list'));
/*
*******************************************************
TASK SELECT
*******************************************************
*/
todoList.addEventListener('click', (event) => {
  for (let i = 0; i < todoListItem.length; i += 1) {
    if(!event.target.classList.contains('selected')) todoListItem[i].classList.remove('selected');
  }
  if (event.target.classList.contains('selected')) {
    event.target.classList.remove('selected');
  } else {
    event.target.classList.add('selected');
  }
  clearMessages();
});
// CLICK ANYWHERE TO UNSELECT
document.addEventListener('click', (event) => {
  console.log(event.target.classList[0]);
  if (event.target.classList[0] !== 'todolist__item' &&
      event.target.classList[0] !== 'addtask__text' &&
      event.target.classList[0] !== 'addtask__add' &&
      event.target.classList[0] !== 'btncontrols__btn' &&
      event.target.classList[0].contains('fas')
      ) {
    for (let i = 0; i < todoListItem.length; i += 1) {
      todoListItem[i].classList.remove('selected');
    }
  }
});
/*
*******************************************************
TASK DOUBLE CLICK
*******************************************************
*/
todoList.addEventListener('dblclick', (event) => {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
    clearMessages();
    setMessages('Task marked as NOT completed! Don\'t forget to save the list :)');
  } else {
    event.target.classList.add('completed');
    clearMessages();
    setMessages('Task marked as completed! Don\'t forget to save the list :)');
  }
});

/*
*******************************************************
ADD TASK
*******************************************************
*/
const inputTask = document.querySelector('#texto-tarefa');
const btnAddTask = document.querySelector('#criar-tarefa');

btnAddTask.addEventListener('click', () => {
  const text = inputTask.value;
  if ((text === '') || (/^\s+$/.test(text))) {
    clearMessages();
    setMessages('Type a task to be added');
  } else {
    const newItem = document.createElement('li');
    newItem.className = 'todolist__item';
    newItem.innerText = inputTask.value;
    todoList.appendChild(newItem);
    inputTask.value = '';
    clearMessages();
    setMessages('Task successfully added! Don\'t forget to save the list :)');
  }
});

/*
*******************************************************
CLEAR ALL TASKS
*******************************************************
*/
const btnClearAll = document.querySelector('#apaga-tudo');
btnClearAll.addEventListener('click', () => {
  if (todoList.lastElementChild) {
    while (todoList.lastElementChild) {
      todoList.removeChild(todoList.lastElementChild);
    }
    if (storedList !== null && storedList.length > 0) {
      localStorage.removeItem('list');
    }
    clearMessages();
    setMessages('Tasks successfully deleted!');
  } else {
    clearMessages();
    setMessages('There is no task on the list');
  }
});

/*
*******************************************************
CLEAR ALL TASKS DONE
*******************************************************
*/
const btnClearDone = document.querySelector('#remover-finalizados');
btnClearDone.addEventListener('click', () => {
  const completedItem = document.querySelectorAll('.completed');
  if (completedItem.length !== 0) {
    for (let i = 0; i < completedItem.length; i += 1) {
      completedItem[i].remove();
    }
    clearMessages();
    setMessages('Completed task successfully deleted! Don\'t forget to save the list :)');
  } else {
    clearMessages();
    setMessages('There is no completed task. To mark as completed, double click on it.');
  }
});

/*
*******************************************************
SAVE LIST
*******************************************************
*/
const btnSaveList = document.querySelector('#salvar-tarefas');
btnSaveList.addEventListener('click', () => {
  const list = [];
  for (let i = 0; i < todoListItem.length; i += 1) {
    list.push({
      text: todoListItem[i].innerText,
      class: todoListItem[i].className,
    });
  }
  localStorage.setItem('list', JSON.stringify(list));
  clearMessages();
  setMessages('Task list successfully saved!');
});

/*
*******************************************************
RETRIEVE AND SHOW SAVED LIST
*******************************************************
*/
if (storedList !== null && storedList.length > 0) {
  for (let i = 0; i < storedList.length; i += 1) {
    const newItem = document.createElement('li');
    newItem.className = storedList[i].class;
    newItem.innerText = storedList[i].text;
    newItem.classList.remove('selected');
    todoList.appendChild(newItem);
  }
  clearMessages();
}

/*
*******************************************************
REMOVE SELECTED TASK
*******************************************************
*/
const btnRemove = document.querySelector('#remover-selecionado');
btnRemove.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selected');
  if (selectedItem.length !== 0) {
    for (let i = 0; i < selectedItem.length; i += 1) {
      const selectedClass = selectedItem[i].classList.contains('selected');
      if (selectedClass) {
        selectedItem[i].remove();
      }
    }
    clearMessages();
    setMessages('Task successfully deleted! Don\'t forget to save the list :)');
  } else {
    clearMessages();
    setMessages('Please select a task to delete it');
  }
});

/*
*******************************************************
TASK MOVE UP
*******************************************************
*/
const btnMoveUp = document.querySelector('#mover-cima');
btnMoveUp.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selected');
  if (selectedItem.length !== 0) {
    for (let i = 0; i < selectedItem.length; i += 1) {
      const selectedClass = selectedItem[i].classList.contains('selected');
      const previousElement = selectedItem[i].previousElementSibling;
      if (selectedClass && selectedItem[i].previousElementSibling) {
        selectedItem[i].parentNode.insertBefore(selectedItem[i], previousElement);
      }
    }
    clearMessages();
    setMessages('Task moved up! Don\'t forget to save the list :)');
  } else {
    clearMessages();
    setMessages('Please select a task to move it up');
  }
});

/*
*******************************************************
TASK MOVE DOWN
*******************************************************
*/
const btnMoveDown = document.querySelector('#mover-baixo');
// em uma thread do slack , a Fernanda (instrutora) disse para inverter os elementos em 'insertbefore' para obter o efeito desejado
btnMoveDown.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selected');
  if (selectedItem.length !== 0) {
    for (let i = 0; i < selectedItem.length; i += 1) {
      const selectedClass = selectedItem[i].classList.contains('selected');
      const nextElement = selectedItem[i].nextElementSibling;
      if (selectedClass && selectedItem[i].nextElementSibling) {
        selectedItem[i].parentNode.insertBefore(nextElement, selectedItem[i]);
      }
    }
    clearMessages();
    setMessages('Task moved down! Don\'t forget to save the list :)');
  } else {
    clearMessages();
    setMessages('Please select a task to move it down');
  }
});
