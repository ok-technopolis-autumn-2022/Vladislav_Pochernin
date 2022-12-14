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

        // Добавляем обработчики событий.
        this.form.addEventListener('submit', this.addTask);

        // Подписываемся на соответствующие изменения данных.
        store.subscribe(OBSERVER_TYPE.TASK_ADDED, this);
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
     * Отобразить таски в приложении.
     */
    showTasks = () => {
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
    }

    /**
     * Обновить состояние счетчика.
     */
    updateCounter = () => {
        let counter = 0;
        this.ul.childNodes.forEach(li => {
            if (this.#store.isTaskDone(li.id) === false) {
                counter++;
            }
        });
        this.counterLabel.textContent = counter.toString() + ' items left';
    }

    /**
     * Отреагировать на изменение данных.
     * @param type {string}
     * @param params
     */
    update(type, params) {
        if (type === OBSERVER_TYPE.TASK_ADDED) {
            this.showTasks();
            this.updateCounter();
        }
    }
}
