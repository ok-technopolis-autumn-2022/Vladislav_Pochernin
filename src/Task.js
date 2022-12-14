/**
 * Таска.
 */
export class Task {
    id;
    desc;
    isDone;


    constructor(id, desc, isDone) {
        this.id = id;
        this.desc = desc;
        this.isDone = isDone;
    }

    /**
     * Создать элемент списка задач из таски.
     * @return {HTMLLIElement}
     */
    createLi() {
        const li = document.createElement('li');
        li.id = this.id;
        li.className = 'todo-app__task-item task-item';

        const input = document.createElement('input');
        input.id = this.id + 1;
        input.type = 'checkbox';
        input.className = 'task-item__status';
        input.ariaLabel = 'Отметить задачу';

        const label = document.createElement('label');
        label.className = 'task-item__status-replica';
        label.htmlFor = this.id + 1;

        const span = document.createElement('span');
        span.className = 'task-item__text';
        span.textContent = this.desc;

        const deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.className = 'task-item__delete';
        deleteButton.title = 'Удалить задачу';

        li.append(input, label, span, deleteButton);

        return li;
    }
}
