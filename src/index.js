import {Store} from "./Store";
import {App} from "./App";

const root = document.querySelector('.todo-app');
const store = new Store();
const app = new App(root, store);
