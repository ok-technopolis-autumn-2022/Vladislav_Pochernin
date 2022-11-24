const tasks = new Map();
const isDone = new Map();

const form = document.querySelector('.todo-app__create-new');
const ul = document.querySelector('.todo-app__task-list');
const all = document.getElementById('all')
const active = document.getElementById('active')
const completed = document.getElementById('completed')
const selectAllButton = document.querySelector('.todo-app__select-all')
const clearCompletedButton = document.querySelector('.actions-bar__clear-completed')

function addTask(e) {
    e.preventDefault();

    const taskInfo = createTask(this.description.value);

    const task = createLi(taskInfo);
    tasks.set(task.id, task);
    isDone.set(task.id, false);
    showTasks()

    this.reset();
}

function showTasks() {
    ul.innerHTML = '';

    tasks.forEach((value, key) => {
        if (all.checked) {
            ul.appendChild(value);
        } else if (active.checked && isDone.get(key) === false) {
            ul.appendChild(value);
        } else if (completed.checked && isDone.get(key) === true) {
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
    document.querySelector('.actions-bar__active-counter').textContent = counter.toString() + ' items left';
}

/**
 *
 * @param task {{id: string | number, desc: string}}
 * @returns {string}
 */
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

function createTask(desc) {
    return {
        id: Date.now(),
        desc: desc
    }
}

form.addEventListener('submit', addTask)

function checkAllTask() {
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
            tasks.delete(li.id);
            isDone.delete(li.id)
        }
    });
    showTasks();
}

clearCompletedButton.addEventListener('click', clearCompleted);

selectAllButton.addEventListener('click', checkAllTask);

all.addEventListener('click', showTasks);
active.addEventListener('click', showTasks);
completed.addEventListener('click', showTasks);
