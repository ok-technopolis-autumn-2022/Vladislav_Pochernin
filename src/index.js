import {Store} from "./Store";
import {App} from "./App";

const root = document.querySelector('.todo-app');
const store = new Store();
const app = new App(root, store);

/*

const selectAllButton = document.querySelector('.todo-app__select-all')
const clearCompletedButton = document.querySelector('.actions-bar__clear-completed')

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
*/
