function createEl({type = "div", content, attributes}) {
    const $el = document.createElement(type);

    if (content)
        $el.textContent = content;

    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {

            if (key !== "style" && typeof value !== "object")
                return $el.setAttribute(key, value);

            Object.entries(value).forEach(([styleKey, styleValue]) => {
                $el.style[styleKey] = styleValue;
            });
        });
    }

    return $el;
}

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
            attributes: {class: "list-group-item description"}
        });
        const liDoneCheck = createEl({
            type: 'input',
            content: '',
            attributes: {type: 'checkbox', class: 'done-checkbox'}
        });
        const liContentTitle = createEl({
            type: 'div',
            content: this.tasks[i].title,
            attributes: {class: 'task-text'}
        });
        const liContentDescription = createEl({
            type: 'div',
            content: this.tasks[i].description,
            attributes: {class: 'task-text'}
        });
        const button = createEl({
            type: 'button',
            content: 'Delete',
            attributes: {class: "btn btn-outline-secondary"}
        });

        if (this.tasks[i].state === 'true') {
            liDoneCheck.checked = true;
            liContentTitle.classList.add('done');
            liContentDescription.classList.add('done');
        } else {
            liDoneCheck.checked = false;
            liContentTitle.classList.remove('done');
            liContentDescription.classList.remove('done');
        }

        button.dataset.btnDel = "button-del-task";
        li.dataset.taskId = i.toString();

        li.append(liDoneCheck);
        li.append(liContentTitle);
        li.append(liContentDescription);
        li.append(button);

        listFragment.append(li);
    }

    list.append(listFragment);
    parentForList.append(list);
}

function prepareArrFromLocalStorage(key) {
    if (localStorage.key) {
        let tasksArr = JSON.parse(localStorage.getItem(key));

        return tasksArr.tasks.map((elem) => {
            return new Task(elem);
        });
    }
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
});

window.addEventListener('storage', () => {
    toDoList.tasks = prepareArrFromLocalStorage(keyToDoListLocalStorage);
    toDoList.printAtHtml(parentListContainer);
});