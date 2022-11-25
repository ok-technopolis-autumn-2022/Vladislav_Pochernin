const tasks = new Map();
const isDone = new Map();

const form = document.querySelector('.todo-app__create-new');
const ul = document.querySelector('.todo-app__task-list');
const allButton = document.getElementById('all')
const activeButton = document.getElementById('active')
const completedButton = document.getElementById('completed')
const selectAllButton = document.querySelector('.todo-app__select-all')
const clearCompletedButton = document.querySelector('.actions-bar__clear-completed')
const counterLabel = document.querySelector('.actions-bar__active-counter')

function addTask(e) {
    e.preventDefault();

    const taskInfo = createTaskInfo(this.description.value);
    const task = createLi(taskInfo);

    tasks.set(task.id, task);
    isDone.set(task.id, false);

    showTasks()

    this.reset();
}

function createLi(task) {
    const li = document.createElement('li');

    li.id = task.id;
    li.className = 'todo-app__task-item task-item';

    const input = document.createElement('input');
    input.id = task.id + 1;
    input.type = 'checkbox';
    input.className = 'task-item__status';
    input.ariaLabel = 'Отметить задачу';

    const label = document.createElement('label');
    label.className = 'task-item__status-replica';
    label.htmlFor = task.id + 1;

    const span = document.createElement('span');
    span.className = 'task-item__text';
    span.textContent = task.desc;
    const toggleDone = () => {
        span.classList.toggle('done');
        if (span.classList.contains('done')) {
            isDone.set(li.id, true);
        } else {
            isDone.set(li.id, false);
        }
        updateCounter();
    };
    label.addEventListener('click', toggleDone);

    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.className = 'task-item__delete';
    deleteButton.title = 'Удалить задачу';
    const deleteTask = () => {
        deleteButton.removeEventListener('click', deleteTask);
        li.remove();
        tasks.delete(li.id);
        isDone.delete(li.id);
    };
    deleteButton.addEventListener('click', deleteTask);

    li.append(input, label, span, deleteButton);

    return li;
}

function createTaskInfo(desc) {
    return {
        id: Date.now(),
        desc: desc
    }
}

function showTasks() {
    ul.innerHTML = '';

    tasks.forEach((value, key) => {
        if (allButton.checked) {
            ul.appendChild(value);
        } else if (activeButton.checked && isDone.get(key) === false) {
            ul.appendChild(value);
        } else if (completedButton.checked && isDone.get(key) === true) {
            ul.appendChild(value);
        }
    });

    updateCounter();
}

function updateCounter() {
    let counter = 0;
    ul.childNodes.forEach(li => {
        if (isDone.get(li.id) === false) {
            counter++;
        }
    })
    counterLabel.textContent = counter.toString() + ' items left';
}

function selectAll() {
    ul.childNodes.forEach(li => {
        const span = li.querySelector('.task-item__text');
        const checkbox = li.querySelector('.task-item__status')
        if (isDone.get(li.id) === false) {
            if (span.classList.toggle('done')) {
                isDone.set(li.id, true);
                checkbox.checked = true;
            }
        }
    });
    updateCounter();
}

function clearCompleted() {
    ul.childNodes.forEach(li => {
        if (isDone.get(li.id) === true) {
            // Удаление всех listener'ов c кнопки.
            button = li.querySelector('.task-item__delete');
            buttonClone = button.cloneNode(true);
            button.parentNode.replaceChild(buttonClone, button);

            tasks.delete(li.id);
            isDone.delete(li.id)
        }
    });
    showTasks();
}

form.addEventListener('submit', addTask)
allButton.addEventListener('click', showTasks);
activeButton.addEventListener('click', showTasks);
completedButton.addEventListener('click', showTasks);
selectAllButton.addEventListener('click', selectAll);
clearCompletedButton.addEventListener('click', clearCompleted);
