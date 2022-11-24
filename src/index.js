const form = document.querySelector('.todo-app__create-new');
const ul = document.querySelector('.todo-app__task-list');

console.log(ul);

function addTask(e) {
    e.preventDefault();

    const task = createTask(this.description.value);
    ul.appendChild(createLi(task));

    this.reset();
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

    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.className = 'task-item__delete';
    deleteButton.title = 'Удалить задачу';
    const deleteTask = () => {
        deleteButton.removeEventListener('click', deleteTask);
        li.remove();
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
