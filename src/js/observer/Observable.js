/**
 *
 * Observable - это сущность, на изменения которой мы будем "подписываться".
 *
 * Другими словами, это сущность, за изменениями которой можно "наблюдать" и как-то на них реагировать.
 */
export class Observable {
    /**
     * Наблюдатели.
     */
    #observers;

    constructor() {
        this.#observers = [];
    }

    /**
     *
     * Подписать переданный Observer на изменения конкретного типа данного Observable.
     *
     * @param type {string} Тип изменения Observable, на который мы подписываемся.
     * @param observer {Observer} - Observer, который подписываем.
     */
    subscribe(type, observer) {
        if (!this._isTypeValid(type)) {
            throw new Error("Unsupported action type");
        }

        if (!observer) {
            throw new Error("Invalid argument exception");
        }

        this.#addObserver(type, observer);
    }

    /**
     *
     * Отписать переданный Observer от изменений конкретного типа данного Observable.
     * @param type {string} - Тип изменения Observable, от которого мы отписываемся.
     * @param observer {Observer} - Observer, который отписываем.
     */
    unsubscribe(type, observer) {
        if (!this._isTypeValid(type)) {
            throw new Error("Unsupported action type");
        }

        if (!observer) {
            throw new Error("Invalid argument exception");
        }

        this.#removeObserver(type, observer);
    }

    /**
     *
     * Проверить, корректный ли передан тип изменения.
     * @param type {string}
     * @private
     * @return {boolean}
     */
    _isTypeValid(type) {
        throw new Error("Not implemented" + " " + type);
    }

    /**
     *
     * Уведомить все подписанные Observer'ы об изменении данного Observable.
     * @param type {string} Тип случившегося изменения Observable.
     * @private
     */
    _signal(type) {
        if (!(type in this.#observers)) {
            return;
        }

        this.#observers[type].forEach(obs => obs.update(type));
    }

    /**
     *
     * @param type {string}
     * @param observer {Observer}
     */
    #removeObserver(type, observer) {
        if (!(type in this.#observers)) {
            return;
        }

        // Оставляем по данному типу все Observer'ы, кроме переданного.
        this.#observers[type] = this.#observers[type].filter(obs => obs !== observer);
    }

    /**
     *
     * @param type {string}
     * @param observer {Observer}
     */
    #addObserver(type, observer) {
        if (!(type in this.#observers)) {
            this.#observers[type] = []; // Инициализируем массив Observer'ов по данному типу.
        }

        this.#observers[type].push(observer);
    }
}
