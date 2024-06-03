"use strict";

function Task({title, description, state = false}) {
    this.title = title;
    this.description = description;
    this.state = state;
}

function ToDoList(tasksArray) {
    this.tasks = [];
    if (Array.isArray(tasksArray) && tasksArray.every((elem) => (elem instanceof Task))) {
        this.tasks = tasksArray;
    }
}

ToDoList.prototype.addTask = function (newTask) {
    if (newTask instanceof Task) {
        this.tasks.push(newTask);
    }
}

ToDoList.prototype.deleteTask = function (index) {
    this.tasks.splice(index, 1);
}

ToDoList.prototype.printAtHtml = function (parent) {
    const parentForList = document.querySelector(parent);

    if (parentForList.querySelector('ol'))
        parentForList.querySelector('ol').remove();

    const list = createEl({
        type: 'ol',
        content: "",
        attributes: {class: "list-group list-group-numbered"}
    });

    let listFragment = document.createDocumentFragment();

    for (let i = 0; i < this.tasks.length; i++) {

        const li = createEl({
            type: 'li',
            content: '',
            attributes: {class: "list-group-item d-flex justify-content-between align-items-center"}
        });
        const liDoneCheck = createEl({
            type: 'input',
            content: '',
            attributes: {type: 'checkbox', class: 'done-checkbox col-md-auto'}
        });
        const liContentTitle = createEl({
            type: 'div',
            content: this.tasks[i].title,
            attributes: {class: 'task-text col-6'}
        });

        liContentTitle.dataset.bsToggle = 'modal';
        liContentTitle.dataset.bsTarget = '#exampleModal';
        const button = createEl({
            type: 'button',
            content: 'Delete',
            attributes: {class: "btn btn-outline-secondary col-md-auto"}
        });

        if (this.tasks[i].state === 'true') {
            liDoneCheck.checked = true;
            liContentTitle.classList.add('done');
        } else {
            liDoneCheck.checked = false;
            liContentTitle.classList.remove('done');
        }

        button.dataset.btnDel = "button-del-task col";
        li.dataset.taskId = i.toString();

        li.append(liDoneCheck);
        li.append(liContentTitle);
        li.append(button);

        listFragment.append(li);
    }

    list.append(listFragment);
    parentForList.append(list);
}

function prepareArrFromLocalStorage(keyArrName) {
    if (localStorage.key(keyArrName)) {
        let tasksArr = JSON.parse(localStorage.getItem(keyArrName));

        return tasksArr.tasks.map((elem) => {
            return new Task(elem);
        });
    } else
        return [];
}

const keyToDoListLocalStorage = 'todolist';

let tasksArr = prepareArrFromLocalStorage(keyToDoListLocalStorage);
let toDoList = new ToDoList(tasksArr);

const parentListContainer = '[data-list-container]';

toDoList.printAtHtml(parentListContainer);

const parentContainer = document.querySelector('[data-todo-container]');

parentContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {

        if (event.target.dataset.btnAdd) {
            const newTaskTitle = event.target.parentNode.querySelector('#title').value;

            if (newTaskTitle) {
                const newTaskDescription = event.target.parentNode.querySelector('#description').value;
                const task = new Task({title: newTaskTitle, description: newTaskDescription});

                toDoList.addTask(task);
                localStorage.setItem(keyToDoListLocalStorage, JSON.stringify(toDoList));
                toDoList.printAtHtml(parentListContainer);
            }
        }

        if (event.target.dataset.btnDel) {
            const taskId = event.target.parentNode.dataset.taskId;

            toDoList.deleteTask(taskId);
            localStorage.setItem(keyToDoListLocalStorage, JSON.stringify(toDoList));
            toDoList.printAtHtml(parentListContainer);
        }
    }

    if (event.target.type === 'checkbox') {
        const taskId = event.target.parentNode.dataset.taskId;
        const taskText = event.target.parentElement.querySelectorAll('.task-text');

        if (event.target.checked) {
            taskText.forEach((elem) => elem.classList.add('done'));
            toDoList.tasks[taskId].state = 'true';
        }

        if (!event.target.checked) {
            taskText.forEach((elem) => elem.classList.remove('done'));
            toDoList.tasks[taskId].state = 'false';
        }

        localStorage.setItem(keyToDoListLocalStorage, JSON.stringify(toDoList));
    }

    if (event.target.className === 'task-text col-6' || event.target.className === 'task-text col-6 done') {

        const modalTitle = document.querySelector('.modal-title');
        const modalContent = document.querySelector('.modal-body');

        const taskId = event.target.parentNode.dataset.taskId;

        modalTitle.textContent = toDoList.tasks[taskId].title;
        modalContent.textContent = toDoList.tasks[taskId].description;
    }

});

window.addEventListener('storage', () => {
    toDoList.tasks = prepareArrFromLocalStorage(keyToDoListLocalStorage);
    toDoList.printAtHtml(parentListContainer);
});