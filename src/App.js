import {Observer} from "./observer/Observer";
import {Task} from "./Task";
import {OBSERVER_TYPE, Store} from "./Store";

/**
 * Наше приложение, которое следит за изменениями данных.
 */
export class App extends Observer {
    /**
     * Корневой элемент верстки.
     *
     * @type{HTMLElement}
     */
    #root;
    /**
     * Данные приложения.
     *
     * @type{Store}
     */
    #store;

    form;
    ul;
    allButton;
    activeButton;
    completedButton;
    counterLabel;
    selectAllButton;
    clearCompletedButton;


    constructor(root, store) {
        super();

        this.#root = root;
        this.#store = store;

        // Достаем элементы из верстки.
        this.form = this.#root.querySelector('.todo-app__create-new');
        this.ul = this.#root.querySelector('.todo-app__task-list');
        this.allButton = document.getElementById('all');
        this.activeButton = document.getElementById('active');
        this.completedButton = document.getElementById('completed');
        this.counterLabel = document.querySelector('.actions-bar__active-counter')
        this.selectAllButton = document.querySelector('.todo-app__select-all')
        this.clearCompletedButton = document.querySelector('.actions-bar__clear-completed')

        // Добавляем обработчики событий.
        this.form.addEventListener('submit', this.addTask);
        this.ul.addEventListener('click', this.taskPartClick);
        this.allButton.addEventListener('click', this.render);
        this.activeButton.addEventListener('click', this.render);
        this.completedButton.addEventListener('click', this.render);
        this.selectAllButton.addEventListener('click', this.selectAll);
        this.clearCompletedButton.addEventListener('click', this.clearCompleted);

        // Подписываемся на соответствующие изменения данных.
        store.subscribe(OBSERVER_TYPE.TASK_ADDED, this);
        store.subscribe(OBSERVER_TYPE.TASK_REMOVED, this);
        store.subscribe(OBSERVER_TYPE.TASK_CHANGED_STATUS, this);
    }

    /**
     * Обработка нажатия на часть таски (изменение статуса или удаление).
     *
     * @param e
     */
    taskPartClick = (e) => {
        const target = e.target;
        const li = target.parentNode;

        if (target.className === 'task-item__delete') {
            this.#store.delete(Number.parseInt(li.id));
        } else if (target.className === 'task-item__status-replica') {
            const span = li.querySelector('.task-item__text');
            span.classList.toggle('done');
            this.#store.changeStatus(Number.parseInt(li.id));
        }
    }

    /**
     * Добавить таску в приложение.
     * @param e
     */
    addTask = (e) => {
        e.preventDefault();

        const id = Date.now();
        const desc = e.target.description.value;
        const isDone = false;

        const task = new Task(id, desc, isDone);
        this.#store.put(task);

        e.target.reset();
    }

    /**
     * Пометить все показываемые таски выполненными.
     */
    selectAll = () => {
        const currentActiveTasksIds = [];
        this.ul.childNodes.forEach(li => {
            if (this.#store.isTaskDone(Number.parseInt(li.id)) === false) {
                currentActiveTasksIds.push(Number.parseInt(li.id));
            }
        });
        this.#store.selectAll(currentActiveTasksIds);
    }

    /**
     * Удалить все выполненные задачи (которые сейчас показываются).
     */
    clearCompleted = () => {
        const currentDoneTasksIds = []
        this.ul.childNodes.forEach(li => {
            if (this.#store.isTaskDone(Number.parseInt(li.id)) === true) {
                currentDoneTasksIds.push(Number.parseInt(li.id));
            }
        });
        this.#store.clearCompleted(currentDoneTasksIds);
    }

    /**
     * Отрендерить приложение, опираясь на данные.
     */
    render = () => {
        this.ul.innerHTML = '';

        this.#store.getTasks().forEach((value, key) => {
            if (this.allButton.checked) {
                this.ul.appendChild(value.createLi());
            } else if (this.activeButton.checked && value.isDone === false) {
                this.ul.appendChild(value.createLi());
            } else if (this.completedButton.checked && value.isDone === true) {
                this.ul.appendChild(value.createLi());
            }
        });

        this.updateCounter();
    }

    /**
     * Обновить состояние счетчика.
     */
    updateCounter = () => {
        let counter = 0;
        this.ul.childNodes.forEach(li => {
            if (this.#store.isTaskDone(Number.parseInt(li.id)) === false) {
                counter++;
            }
        });
        this.counterLabel.textContent = counter.toString() + ' items left';
    }

    /**
     * Отреагировать на изменение данных.
     * @param type {string}
     */
    update(type) {
        if (type === OBSERVER_TYPE.TASK_ADDED) {
            this.render();
        } else if (type === OBSERVER_TYPE.TASK_REMOVED) {
            this.render();
        } else if (type === OBSERVER_TYPE.TASK_CHANGED_STATUS) {
            this.render();
        }
    }
}
