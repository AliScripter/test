'use strict';

let $ = document;
let inputEl = $.querySelector('input');
let ulElem = $.querySelector('.todos');

function addNewTodo(newTodoValue) {
  let newTodoLi = $.createElement('li');
  newTodoLi.className =
    'list-group-item d-flex justify-content-between align-items-center';
  let newSpan = $.createElement('span');
  newSpan.innerHTML = newTodoValue;

  let newTodoTrash = $.createElement('i');
  newTodoTrash.className = 'fa fa-trash-o delete';

  newTodoTrash.addEventListener('click', function (event) {
    event.target.parentElement.remove();
    saveTodosToLocalStorage();
  });

  newTodoLi.append(newSpan, newTodoTrash);

  ulElem.append(newTodoLi);
  saveTodosToLocalStorage();
}

function saveTodosToLocalStorage() {
  let todos = [];
  ulElem.querySelectorAll('li').forEach(li => {
    todos.push(li.querySelector('span').innerHTML);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos.forEach(todo => {
      addNewTodo(todo);
    });
  }
}

loadTodosFromLocalStorage();

inputEl.addEventListener('keydown', function (event) {
  let newTodoValue = event.target.value.trim();

  if (event.keyCode === 13) {
    if (newTodoValue) {
      inputEl.value = '';
      addNewTodo(newTodoValue);
    }
  }
});
