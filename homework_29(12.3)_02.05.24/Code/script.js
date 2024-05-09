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

function Task({title, description}) {
    this.title = title;
    this.description = description;
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
        const liContentTitle = createEl({type: 'div', content: this.tasks[i].title});
        const liContentDescription = createEl({type: 'div', content: this.tasks[i].description});
        const button = createEl({
            type: 'button',
            content: 'Delete',
            attributes: {class: "btn btn-outline-secondary"}
        });

        button.dataset.btnDel = "button-del-task";
        li.dataset.taskId = i.toString();

        li.append(liContentTitle);
        li.append(liContentDescription);
        li.append(button);

        listFragment.append(li);
    }

    list.append(listFragment);
    parentForList.append(list);
}

let tasks = [
    {
        title: "Wake up",
        description: "at 7:00",
    },
    {
        title: "Brush teeth",
        description: "with floss",
    },
    {
        title: "Work",
        description: "hard",
    },
];

let preparedTasks = tasks.map((elem) => {
    return new Task(elem);
});

let toDoList = new ToDoList(preparedTasks);

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
                toDoList.printAtHtml(parentListContainer);
            }
        }

        if (event.target.dataset.btnDel) {
            const taskId = event.target.parentNode.dataset.taskId;

            toDoList.deleteTask(taskId);
            toDoList.printAtHtml(parentListContainer);
        }
    }
});