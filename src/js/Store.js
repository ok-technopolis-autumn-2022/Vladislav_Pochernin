import {Observable} from "/observer/Observable";

/**
 * Возможные типы изменений
 *
 * @type {{}}
 */
export const OBSERVER_TYPE = {
    TASK_ADDED: 'TASK_ADDED',
    TASK_REMOVED: 'TASK_REMOVED',
    TASK_CHANGED_STATUS: 'TASK_CHANGED_STATUS'
}

/**
 * Хранилище наших тасок.
 */
export class Store extends Observable {
    /**
     * Таски.
     *
     * @type {object}
     */
    #tasks;

    constructor() {
        super();
        this.#tasks = new Map();
    }

    /**
     * Добавить таску.
     *
     * @param task {Task}
     */
    put(task) {
        this.#tasks.set(task.id, task);

        this._signal(OBSERVER_TYPE.TASK_ADDED);
    }

    /**
     * Удалить таску.
     *
     * @param id{number}
     */
    delete(id) {
        this.#tasks.delete(id);

        this._signal(OBSERVER_TYPE.TASK_REMOVED);
    }

    /**
     * Изменить статус таски.
     *
     * @param id{number}
     */
    changeStatus(id) {
        const task = this.#tasks.get(id);
        task.isDone = !task.isDone;
        this.#tasks.set(id, task);

        this._signal(OBSERVER_TYPE.TASK_CHANGED_STATUS);
    }

    /**
     * Пометить все переданные таски выполненными.
     *
     * @param ids
     */
    selectAll(ids) {
        ids.forEach(id => {
            const task = this.#tasks.get(id);
            task.isDone = !task.isDone;
            this.#tasks.set(id, task);
        });

        this._signal(OBSERVER_TYPE.TASK_CHANGED_STATUS);
    }

    /**
     * Удалить все переданные таски.
     *
     * @param ids
     */
    clearCompleted(ids) {
        ids.forEach(id => {
            this.#tasks.delete(id);
        })

        this._signal(OBSERVER_TYPE.TASK_REMOVED);
    }

    /**
     * Получить список хранящихся тасок.
     *
     * @return {Object}
     */
    getTasks() {
        return this.#tasks;
    }

    /**
     * Сделана ли таска.
     *
     * @param id
     */
    isTaskDone(id) {
        return this.#tasks.get(Number.parseInt(id)).isDone;
    }

    _isTypeValid(type) {
        return Object.values(OBSERVER_TYPE).includes(type);
    }
}
