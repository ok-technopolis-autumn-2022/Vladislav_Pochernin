/**
 *
 * Observer будет как-то реагировать на изменения, на которые он подписался.
 *
 * Другими словами, это то, что "наблюдает" за изменениями.
 */
export class Observer {


    /**
     *
     * Обновить подписанный Observer после изменения в Observable.
     *
     * @param type {string} тип изменения Observable.
     */
    update(type) {
        throw Error("Not implemented");
    }
}
